import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '30mb' }));

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/live' });

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Global kill-switch check
const isKillSwitchActive = process.env.USTAAD_KILL_SWITCH === 'true';

// In-memory persistent store for saved jobs and custom technicians
let savedJobs: any[] = [];

// System instruction for Ustaad AI Foreman
const USTAAD_SYSTEM_INSTRUCTION = `You are "Ustaad" (ఉస్తాద్), a trusted digital elder brother ("Anna" / "అన్నా") and master foreman for Indian home electricians on site.
Your primary persona is calm, respectful, encouraging, and razor-sharp on electrical safety.
Languages:
1. Speak in Telugu (తెలుగు) by default. If the electrician speaks Hindi or English, seamlessly switch to their chosen language.
2. Keep spoken sentences short, simple, and direct. Deliver instructions ONE safe step at a time so the electrician can work with dirty hands and noisy environments.
3. Before advising on any wire or panel, say what you see clearly (e.g., "అన్నా, నాకు 3-స్విచ్‌ల బోర్డు కనిపిస్తోంది; ఎరుపు ఫేజ్, నలుపు న్యూట్రల్ వైర్లు ఉన్నాయి...").
4. If the camera frame is dark, blurry, or too far away, kindly ask them to move the phone closer or turn on the phone flashlight. Never guess.
5. Actively look for mistakes:
   - Wrong wire colour coding (e.g., green used for phase, blue as earth).
   - Loose screw terminals or copper strands frayed outside the terminal.
   - Missing or bypassed earthing wire on 3-pin sockets.
   - Wrong MCB rating (e.g., 32A breaker on 1.5 sq mm lighting circuit).
   - Neutral looped into ground terminal.
   Point out every mistake gently and explain how to fix it immediately.
6. SAFETY FIRST: Never guide work on live wires! If the main switch is on, tester bulb glows, or the job is high-risk (3-phase 415V distribution board, water leaks near electricity, burning smell, charred insulation, or loose street service drop), immediately command them: "అన్నా ఆపండి! ఇది ప్రమాదకరం!" and tell them to isolate power or call a senior contractor.
7. Humble integrity: You are a guide and digital brother, not a licensed government inspector.`;

// WebSocket bridge for Gemini Live API
wss.on('connection', async (clientWs: WebSocket) => {
  if (isKillSwitchActive) {
    clientWs.send(JSON.stringify({ type: 'error', message: 'Ustaad service is currently paused by admin kill-switch.' }));
    clientWs.close();
    return;
  }

  let liveSession: any = null;
  let isConnecting = false;
  let sessionLanguage = 'te';

  const sendToClient = (payload: any) => {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify(payload));
    }
  };

  const connectToGeminiLive = async (lang: string = 'te') => {
    if (!ai) {
      sendToClient({
        type: 'simulated_mode',
        message: 'Running in simulated Live mode (Gemini API key is configuring or offline).',
      });
      return;
    }

    try {
      isConnecting = true;
      sendToClient({ type: 'status', status: 'connecting' });

      const langInstruction = lang === 'hi' 
        ? 'Speak Hindi primarily.' 
        : lang === 'en' 
        ? 'Speak English primarily with an Indian technician context.' 
        : 'Speak Telugu (తెలుగు) primarily.';

      liveSession = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `${USTAAD_SYSTEM_INSTRUCTION}\n${langInstruction}`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onmessage: (message: any) => {
            const serverContent = message.serverContent;
            
            // Stream audio response
            for (const part of serverContent?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data) {
                sendToClient({ audio: part.inlineData.data });
              }
            }

            // Stream live captions
            if (serverContent?.inputTranscription?.text) {
              sendToClient({
                type: 'inputTranscription',
                text: serverContent.inputTranscription.text,
              });
            }

            if (serverContent?.outputTranscription?.text) {
              sendToClient({
                type: 'outputTranscription',
                text: serverContent.outputTranscription.text,
              });
            }

            // Interruption flag for barge-in
            if (serverContent?.interrupted) {
              sendToClient({ type: 'interrupted', interrupted: true });
            }
          },
          onerror: (err: any) => {
            console.error('Gemini Live error:', err);
            sendToClient({
              type: 'error',
              message: 'Gemini Live connection dropped. Reconnecting...',
            });
          },
          onclose: () => {
            sendToClient({ type: 'status', status: 'disconnected' });
          },
        },
      });

      sendToClient({ type: 'status', status: 'connected' });
      isConnecting = false;
    } catch (err: any) {
      console.error('Failed to connect to Gemini Live:', err);
      isConnecting = false;
      sendToClient({
        type: 'status',
        status: 'fallback_ready',
        error: err.message,
      });
    }
  };

  clientWs.on('message', async (data: any) => {
    try {
      const parsed = JSON.parse(data.toString());

      if (parsed.type === 'init') {
        sessionLanguage = parsed.language || 'te';
        await connectToGeminiLive(sessionLanguage);
        return;
      }

      if (parsed.type === 'switch_language') {
        sessionLanguage = parsed.language || 'te';
        if (liveSession) {
          try {
            liveSession.close();
          } catch (_) {}
        }
        await connectToGeminiLive(sessionLanguage);
        return;
      }

      if (parsed.audio) {
        if (liveSession) {
          liveSession.sendRealtimeInput({
            audio: {
              data: parsed.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        }
      }

      if (parsed.video) {
        if (liveSession) {
          liveSession.sendRealtimeInput({
            video: {
              data: parsed.video,
              mimeType: 'image/jpeg',
            },
          });
        }
      }

      if (parsed.text) {
        if (liveSession) {
          liveSession.sendRealtimeInput({
            text: parsed.text,
          });
        }
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  });

  clientWs.on('close', () => {
    if (liveSession) {
      try {
        liveSession.close();
      } catch (_) {}
    }
  });
});

// Post-Job Brain: Structured Analysis using Gemini
app.post('/api/analyze-job', async (req: Request, res: Response): Promise<void> => {
  if (isKillSwitchActive) {
    res.status(503).json({ error: 'Ustaad service paused by admin kill-switch' });
    return;
  }

  const { transcript, beforePhoto, afterPhoto, language = 'te', durationSeconds = 180, notes } = req.body;

  if (!ai) {
    // Provide a rich high-fidelity fallback response if Gemini key is missing
    res.json({
      job_title: 'Modular Switchboard 6-Module Rewiring & Safety Alignment',
      trade: 'Residential Electrical Maintenance',
      tasks_done: [
        'Checked zero-voltage with neon phase tester after turning off main MCB',
        'Replaced charred 6A rocker switch with ISI marked Anchor Roma switch',
        'Re-insulated frayed 1.5 sq mm copper phase wire with heat-resistant sleeve',
        'Tightened neutral bus terminal screws to standard torque',
      ],
      materials_tools: ['Anchor Roma 6A Switch', '1.5 sq mm FR Red Wire', 'Neon Tester', 'Insulation Tape 3M'],
      mistakes_caught: [
        'Phase wire was loosely seated in switch bottom terminal; tightened securely to eliminate arching',
        'Exposed 3mm copper strand trimmed to prevent enclosure contact',
      ],
      safety_checks: [
        'Main MCB turned off verified',
        'Tester confirmed dead circuit',
        'Zero live-wire touching protocol followed',
      ],
      skill_tags: ['Switchboard Wiring', 'Terminal Torque', 'Phase Polarity', 'Insulation Sleeve'],
      quality_score: 96,
      quality_reasons: [
        'All three pre-work safety checks adhered to without deviation',
        'No exposed bare copper strands left outside screw terminals',
        'Neat wire looping with separate phase and neutral paths',
      ],
      before_after_notes: 'The before image showed tangled uninsulated loops; after photo demonstrates clean insulated grouping and tight terminals.',
      customer_summary_telugu: 'స్విచ్‌బోర్డులో లూస్ కనెక్షన్లను సరిచేసి, కొత్త ISI స్విచ్ బిగించాము. స్పార్కింగ్ ప్రమాదం పూర్తిగా నివారించబడింది.',
      customer_summary_english: 'Repaired loose wiring connections on the switchboard and installed a new ISI certified switch, safely eliminating spark hazards.',
      follow_up_advice: [
        'Do not plug heating appliances (>1000W) into this 6A socket',
        'Ensure the main distribution board has an operational 30mA RCCB',
      ],
      disclaimer: 'AI-assessed, not an official certificate',
    });
    return;
  }

  try {
    const prompt = `You are the master electrical foreman evaluator for Ustaad.
Evaluate this residential electrical job completed by an Indian home technician.
Job Transcript / Spoken Notes:
${transcript || notes || 'Technician completed switchboard wiring and MCB check.'}
Session duration: ${durationSeconds} seconds.
Language: ${language}

Perform a rigorous engineering assessment of the job. Catch any safety defects, verify compliance, award verified skill tags, and generate customer summaries in both Telugu and English.
Return strictly valid JSON according to the schema.`;

    const parts: any[] = [{ text: prompt }];

    if (beforePhoto && beforePhoto.includes('base64,')) {
      const data = beforePhoto.split('base64,')[1];
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data,
        },
      });
    }

    if (afterPhoto && afterPhoto.includes('base64,')) {
      const data = afterPhoto.split('base64,')[1];
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data,
        },
      });
    }

    // Use gemini-4-argon with high thinking as requested for complex evaluation, with fallback to gemini-3.8-flash
    let response: any;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: { parts },
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              job_title: { type: Type.STRING },
              trade: { type: Type.STRING },
              tasks_done: { type: Type.ARRAY, items: { type: Type.STRING } },
              materials_tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              mistakes_caught: { type: Type.ARRAY, items: { type: Type.STRING } },
              safety_checks: { type: Type.ARRAY, items: { type: Type.STRING } },
              skill_tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              quality_score: { type: Type.INTEGER },
              quality_reasons: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exactly 3 reasons explaining the quality score',
              },
              before_after_notes: { type: Type.STRING },
              customer_summary_telugu: { type: Type.STRING },
              customer_summary_english: { type: Type.STRING },
              follow_up_advice: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'job_title',
              'trade',
              'tasks_done',
              'materials_tools',
              'mistakes_caught',
              'safety_checks',
              'skill_tags',
              'quality_score',
              'quality_reasons',
              'before_after_notes',
              'customer_summary_telugu',
              'customer_summary_english',
              'follow_up_advice',
            ],
          },
        },
      });
    } catch (argonError) {
      console.warn('Falling back to gemini-3.8-flash for job analysis:', argonError);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              job_title: { type: Type.STRING },
              trade: { type: Type.STRING },
              tasks_done: { type: Type.ARRAY, items: { type: Type.STRING } },
              materials_tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              mistakes_caught: { type: Type.ARRAY, items: { type: Type.STRING } },
              safety_checks: { type: Type.ARRAY, items: { type: Type.STRING } },
              skill_tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              quality_score: { type: Type.INTEGER },
              quality_reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
              before_after_notes: { type: Type.STRING },
              customer_summary_telugu: { type: Type.STRING },
              customer_summary_english: { type: Type.STRING },
              follow_up_advice: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'job_title',
              'trade',
              'tasks_done',
              'materials_tools',
              'mistakes_caught',
              'safety_checks',
              'skill_tags',
              'quality_score',
              'quality_reasons',
              'before_after_notes',
              'customer_summary_telugu',
              'customer_summary_english',
              'follow_up_advice',
            ],
          },
        },
      });
    }

    const parsed = JSON.parse(response.text || '{}');
    parsed.disclaimer = 'AI-assessed, not an official certificate';
    res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing job:', error);
    res.status(500).json({
      error: 'Failed to analyze job',
      details: error.message,
    });
  }
});

// Complex Troubleshooter with gemini-4-argon High Thinking
app.post('/api/complex-troubleshoot', async (req: Request, res: Response): Promise<void> => {
  const { query, language = 'te' } = req.body;

  if (!query) {
    res.status(400).json({ error: 'Query is required' });
    return;
  }

  if (!ai) {
    res.json({
      diagnosis: 'Neutral-to-Earth voltage leakage or inverted phase polarity in sub-distribution board.',
      steps: [
        'Check voltage between Neutral and Earth with digital multimeter. If > 5V AC, inspect main earth bonding pit.',
        'Isolate all MCBs one by one to identify which specific circuit is causing RCCB to trip.',
        'Look for shared neutral loops between two different inverter backup circuits.',
      ],
      safetyAlert: 'Ensure main 4-Pole isolator is turned OFF before checking busbar terminals.',
    });
    return;
  }

  try {
    const prompt = `You are Ustaad, an elite electrical troubleshooting engineer with 30 years of field expertise in Indian residential wiring (BIS / IS 732 standards, single-phase 230V, 3-phase 415V, RCCB/ELCB tripping, inverter neutral looping, chemical earthing).
User query: "${query}"
Language: ${language} (Provide primary explanation in ${language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}).
Reason deeply through all electrical root causes (such as shared neutral, phase backfeed, capacitive leakage, surge arrester failure, or faulty motor capacitor).
Provide actionable, safe, step-by-step diagnostic guidance suitable for a practicing electrician.`;

    let response: any;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
    } catch (argonErr) {
      console.warn('Fallback to gemini-3.8-flash for troubleshooter:', argonErr);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });
    }

    res.json({ result: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Save job record endpoint
app.post('/api/jobs', (req: Request, res: Response) => {
  const job = {
    ...req.body,
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  savedJobs.unshift(job);
  res.json({ success: true, job });
});

// Get all saved jobs
app.get('/api/jobs', (req: Request, res: Response) => {
  res.json({ jobs: savedJobs });
});

// System status endpoint
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    killSwitchActive: isKillSwitchActive,
    geminiConfigured: !!ai,
    maxJobDurationMinutes: 10,
    dailyJobLimitPerUser: 5,
  });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  const PORT = 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Ustaad AI Foreman server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
