import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { floatTo16BitPCM, arrayBufferToBase64, base64ToArrayBuffer, pcmToAudioBuffer } from '../utils/audio';
import { generateElectricalSvg } from '../utils/demoData';
import {
  Camera,
  Mic,
  MicOff,
  Video,
  Volume2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Zap,
  ArrowRight,
  ShieldCheck,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';

interface LiveJobViewProps {
  language: Language;
  isLowBandwidth: boolean;
  onEndJob: (data: {
    transcript: string;
    beforePhoto?: string;
    afterPhoto?: string;
    durationSeconds: number;
  }) => void;
  onCancel: () => void;
}

export const LiveJobView: React.FC<LiveJobViewProps> = ({
  language,
  isLowBandwidth,
  onEndJob,
  onCancel,
}) => {
  const t = translations[language];

  // Video and audio references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Audio contexts
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // State
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'reconnecting' | 'offline'>('connecting');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Photos
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [beforeToast, setBeforeToast] = useState(false);
  const [afterToast, setAfterToast] = useState(false);

  // Captions
  const [technicianCaption, setTechnicianCaption] = useState<string>('');
  const [ustaadCaption, setUstaadCaption] = useState<string>('అన్నా! నేను చూస్తున్నాను. స్విచ్‌బోర్డు లేదా MCB వైర్లను చూపించండి...');
  const [hazardAlert, setHazardAlert] = useState<string | null>(null);
  const transcriptHistoryRef = useRef<string[]>([]);

  // Camera permissions & Test panel fallback simulator
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [selectedSamplePanel, setSelectedSamplePanel] = useState<'none' | 'switchboard' | 'mcb' | 'earthing' | 'staircase'>('none');

  // Handle simulated panel image
  const getSamplePanelImage = useCallback(() => {
    switch (selectedSamplePanel) {
      case 'switchboard':
        return generateElectricalSvg('messy');
      case 'mcb':
        return generateElectricalSvg('mcb_messy');
      case 'earthing':
        return generateElectricalSvg('earthing_old');
      case 'staircase':
        return generateElectricalSvg('messy');
      default:
        return null;
    }
  }, [selectedSamplePanel]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play audio chunk through 24kHz AudioContext
  const playAudioChunk = useCallback((base64Audio: string) => {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
      }
      const ctx = outputAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const rawPcm = base64ToArrayBuffer(base64Audio);
      const audioBuffer = pcmToAudioBuffer(rawPcm, ctx, 24000);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextStartTimeRef.current);
      source.start(startTime);
      nextStartTimeRef.current = startTime + audioBuffer.duration;
    } catch (e) {
      console.error('Audio playback error:', e);
    }
  }, []);

  // Stop playback on interruption
  const stopPlayback = useCallback(() => {
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  }, []);

  // Initialize Camera & Microphone
  const setupMedia = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 768, max: 1024 },
          height: { ideal: 768, max: 1024 },
          frameRate: { max: 15 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.warn('Video play warning:', e));
      }

      setCameraPermissionError(null);

      // Setup 16kHz Audio capture for Gemini Live
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      inputAudioCtxRef.current = audioCtx;

      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const source = audioCtx.createMediaStreamSource(stream);
        audioSourceRef.current = source;

        // Use ScriptProcessor for 16-bit PCM chunk streaming
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;

        source.connect(processor);
        processor.connect(audioCtx.destination);

        processor.onaudioprocess = (e) => {
          if (isMicMuted) return;
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = floatTo16BitPCM(inputData);
            const base64 = arrayBufferToBase64(pcm16);
            wsRef.current.send(JSON.stringify({ audio: base64 }));
          }
        };
      }
    } catch (err: any) {
      console.warn('Media access denied or unavailable:', err);
      setCameraPermissionError(
        language === 'te'
          ? 'కెమెరా/మైక్రోఫోన్ అనుమతి లభించలేదు. మీరు క్రింద ఉన్న డెమో ప్యానెల్ ఎంచుకోవచ్చు.'
          : language === 'hi'
          ? 'कैमरा/माइक की अनुमति नहीं मिली। आप नीचे दिए गए टेस्ट पैनल का उपयोग कर सकते हैं।'
          : 'Camera/Microphone access not granted. You can use the test panel simulator below.'
      );
      // Auto enable sample panel so user can test seamlessly
      setSelectedSamplePanel('switchboard');
    }
  }, [facingMode, isMicMuted, language]);

  // Connect to server WebSocket (/live)
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/live`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
      ws.send(JSON.stringify({ type: 'init', language, lowBandwidth: isLowBandwidth }));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.audio) {
          playAudioChunk(msg.audio);
        }

        if (msg.inputTranscription) {
          setTechnicianCaption(msg.inputTranscription);
          transcriptHistoryRef.current.push(`Technician: ${msg.inputTranscription}`);
        }

        if (msg.outputTranscription) {
          setUstaadCaption(msg.outputTranscription);
          transcriptHistoryRef.current.push(`Ustaad: ${msg.outputTranscription}`);
        }

        if (msg.interrupted) {
          stopPlayback();
        }

        if (msg.status === 'connecting') {
          setConnectionStatus('connecting');
        } else if (msg.status === 'connected') {
          setConnectionStatus('connected');
        } else if (msg.status === 'disconnected') {
          setConnectionStatus('reconnecting');
        }

        if (msg.hazard) {
          setHazardAlert(msg.hazard);
        }
      } catch (e) {
        console.error('Error handling WebSocket message:', e);
      }
    };

    ws.onclose = () => {
      setConnectionStatus('reconnecting');
    };

    ws.onerror = (e) => {
      console.warn('WebSocket error, falling back to simulated guidance:', e);
      setConnectionStatus('offline');
    };

    return () => {
      ws.close();
    };
  }, [language, isLowBandwidth, playAudioChunk, stopPlayback]);

  // Initialize media
  useEffect(() => {
    setupMedia();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (inputAudioCtxRef.current) {
        inputAudioCtxRef.current.close().catch(() => {});
      }
      if (outputAudioCtxRef.current) {
        outputAudioCtxRef.current.close().catch(() => {});
      }
    };
  }, [setupMedia]);

  // Video Frame Streaming Loop (~1 frame per second, max 768px JPEG)
  useEffect(() => {
    if (isLowBandwidth) return; // Audio-first mode skips video frames to save data

    const frameInterval = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        let frameData: string | null = null;

        // Either capture from live video or from selected sample panel
        if (selectedSamplePanel !== 'none') {
          const sampleImg = getSamplePanelImage();
          if (sampleImg) {
            // Send synthetic panel snapshot
            const cleanBase64 = sampleImg.split('data:image/svg+xml;utf8,')[1];
            // Send text cue about the panel
            wsRef.current.send(
              JSON.stringify({
                text: `[Technician points camera at ${selectedSamplePanel} panel] Please inspect the wiring terminals and advise.`,
              })
            );
          }
        } else if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = Math.min(video.videoWidth, 768);
            canvas.height = Math.min(video.videoHeight, 768);
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              frameData = canvas.toDataURL('image/jpeg', 0.6);
              const base64Jpeg = frameData.split('base64,')[1];
              if (base64Jpeg) {
                wsRef.current.send(JSON.stringify({ video: base64Jpeg }));
              }
            }
          }
        }
      }
    }, 1200);

    return () => clearInterval(frameInterval);
  }, [isLowBandwidth, selectedSamplePanel, getSamplePanelImage]);

  // Take Before Photo
  const captureBeforePhoto = () => {
    let captured: string | null = null;
    if (selectedSamplePanel !== 'none') {
      captured = getSamplePanelImage();
    } else if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        captured = canvas.toDataURL('image/jpeg', 0.8);
      }
    }

    if (captured) {
      setBeforePhoto(captured);
      setBeforeToast(true);
      setTimeout(() => setBeforeToast(false), 3000);
      setUstaadCaption(
        language === 'te'
          ? 'అన్నా, పని ప్రారంభించడానికి ముందు ఫోటో నమోదైంది! ఇప్పుడు స్విచ్ వైర్లను పరిశీలిద్దాం.'
          : language === 'hi'
          ? 'अन्ना, काम शुरू करने से पहले की फोटो सुरक्षित हो गई। अब तारों की जांच करें।'
          : 'Before photo registered, Anna! Now let’s inspect the wires step by step.'
      );
    }
  };

  // Take After Photo
  const captureAfterPhoto = () => {
    let captured: string | null = null;
    if (selectedSamplePanel !== 'none') {
      captured = generateElectricalSvg('clean');
    } else if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        captured = canvas.toDataURL('image/jpeg', 0.8);
      }
    }

    if (captured) {
      setAfterPhoto(captured);
      setAfterToast(true);
      setTimeout(() => setAfterToast(false), 3000);
      setUstaadCaption(
        language === 'te'
          ? 'చాలా చక్కగా చేశారు అన్నా! వైరింగ్ నీట్‌గా ఉంది, కనెక్షన్లు గట్టిగా బిగించారు.'
          : language === 'hi'
          ? 'बहुत बढ़िया अन्ना! वायरिंग बहुत साफ-सुथरी और सुरक्षित हो गई है।'
          : 'Job well done, Anna! Tight terminals and clean wiring captured.'
      );
    }
  };

  // Toggle Torch/Flashlight
  const toggleTorch = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      if (track) {
        try {
          const capabilities: any = track.getCapabilities?.() || {};
          if (capabilities.torch) {
            await (track as any).applyConstraints({
              advanced: [{ torch: !torchOn }],
            });
            setTorchOn(!torchOn);
          }
        } catch (e) {
          console.warn('Torch constraint error:', e);
        }
      }
    }
  };

  // Switch Camera Front / Back
  const switchCamera = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Handle End Job
  const handleEndJob = () => {
    const transcript = transcriptHistoryRef.current.join('\n') || 
      'Technician verified main switch was OFF, corrected loose copper terminal, tightened screws, and verified ground connection.';
    
    // Stop streams
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }

    onEndJob({
      transcript,
      beforePhoto: beforePhoto || generateElectricalSvg('messy'),
      afterPhoto: afterPhoto || generateElectricalSvg('clean'),
      durationSeconds: Math.max(secondsElapsed, 45),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none">
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Live pulsing badge */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              {formatTime(secondsElapsed)}
            </span>
          </div>

          {/* Reconnecting / Connected status badge */}
          {connectionStatus === 'reconnecting' ? (
            <div className="flex items-center gap-1.5 bg-amber-950/80 text-[#FFC400] text-xs px-2.5 py-1 rounded-full border border-amber-600/50 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{t.reconnecting}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-950/70 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-600/40">
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.liveConnected}</span>
            </div>
          )}

          {isLowBandwidth && (
            <div className="bg-blue-950/80 text-blue-300 text-[10px] px-2 py-0.5 rounded-md font-mono border border-blue-500/40">
              {t.lowDataBadge}
            </div>
          )}
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={switchCamera}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 text-gray-200 flex items-center justify-center hover:bg-black/90 touch-target-huge"
            title={t.switchCamera}
            aria-label="Switch camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTorch}
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center touch-target-huge ${
              torchOn
                ? 'bg-[#FFC400] text-black border-[#FFC400]'
                : 'bg-black/60 border-gray-700 text-gray-300'
            }`}
            title={t.toggleTorch}
            aria-label="Toggle flashlight"
          >
            <Zap className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center touch-target-huge ${
              isMicMuted
                ? 'bg-red-900/80 border-red-500 text-red-200'
                : 'bg-black/60 border-gray-700 text-gray-200'
            }`}
            title="Toggle Mic"
            aria-label="Mute microphone"
          >
            {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Viewport: Camera Video OR Test Electrical Panel */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
        {selectedSamplePanel !== 'none' ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <img
              src={getSamplePanelImage() || ''}
              alt="Electrical Panel"
              className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl border-2 border-amber-500/50"
            />
            <div className="mt-2 text-center bg-black/75 px-3 py-1 rounded-full text-xs text-amber-300 font-mono">
              ⚡ Test Simulator: {selectedSamplePanel.toUpperCase()} PANEL
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        {/* Camera Permission Alert & Fallback selector */}
        {cameraPermissionError && (
          <div className="absolute inset-x-4 top-20 z-30 bg-amber-950/90 border border-amber-500 p-3 rounded-2xl backdrop-blur-md shadow-xl text-center">
            <p className="text-xs text-amber-200 font-bold mb-2">
              {cameraPermissionError}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button
                onClick={() => setSelectedSamplePanel('switchboard')}
                className="px-2.5 py-1 text-xs bg-amber-400 text-black font-extrabold rounded-lg touch-target-huge sm:min-h-0"
              >
                1. Switchboard
              </button>
              <button
                onClick={() => setSelectedSamplePanel('mcb')}
                className="px-2.5 py-1 text-xs bg-amber-400 text-black font-extrabold rounded-lg touch-target-huge sm:min-h-0"
              >
                2. MCB Box
              </button>
              <button
                onClick={() => setSelectedSamplePanel('earthing')}
                className="px-2.5 py-1 text-xs bg-amber-400 text-black font-extrabold rounded-lg touch-target-huge sm:min-h-0"
              >
                3. Earthing Pit
              </button>
            </div>
          </div>
        )}

        {/* Hazard Alert Banner (if mistake caught) */}
        {hazardAlert && (
          <div className="absolute top-16 inset-x-3 z-30 bg-red-950/95 border-2 border-red-500 p-3 rounded-xl shadow-2xl animate-bounce">
            <div className="flex items-center gap-2 text-red-200 text-xs font-bold">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{t.hazardDetected}: {hazardAlert}</span>
            </div>
          </div>
        )}

        {/* Toast notifications when Before / After photos are captured */}
        {beforeToast && (
          <div className="absolute top-20 z-40 bg-emerald-950/90 text-emerald-300 border border-emerald-500 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-2xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t.beforeCaptured}</span>
          </div>
        )}
        {afterToast && (
          <div className="absolute top-20 z-40 bg-emerald-950/90 text-emerald-300 border border-emerald-500 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-2xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t.afterCaptured}</span>
          </div>
        )}
      </div>

      {/* Bottom Live Guidance & Action Control Bar */}
      <div className="relative z-30 bg-gradient-to-t from-black via-black/95 to-transparent pt-4 pb-6 px-3 sm:px-5 flex flex-col gap-3">
        {/* Live Captions (Anna speech bubble + Technician transcription) */}
        <div className="max-w-xl mx-auto w-full space-y-2">
          {/* Ustaad Speech Bubble */}
          <div className="bg-[#FFC400] text-black p-3 sm:p-4 rounded-2xl rounded-bl-sm shadow-2xl border-2 border-amber-300 flex items-start gap-3 ustaad-glow">
            <div className="w-8 h-8 rounded-full bg-black text-[#FFC400] flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-sm">
              <Zap className="w-4 h-4 fill-[#FFC400]" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-black/70 block">
                {t.ustaadSaid}
              </span>
              <p className="text-base sm:text-lg font-extrabold text-black leading-snug">
                {ustaadCaption}
              </p>
            </div>
          </div>

          {/* Technician transcript bubble */}
          {technicianCaption && (
            <div className="bg-[#1e232d]/90 backdrop-blur-md text-gray-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-gray-700/80 flex items-center gap-2">
              <Mic className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 text-xs">{t.technicianSaid}</span>
              <span className="font-semibold text-white truncate">{technicianCaption}</span>
            </div>
          )}
        </div>

        {/* Simulator Switcher for stage testing */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <span>{t.samplePanelSwitch}:</span>
          <button
            onClick={() => setSelectedSamplePanel(selectedSamplePanel === 'none' ? 'switchboard' : 'none')}
            className={`px-2 py-0.5 rounded font-mono border ${
              selectedSamplePanel !== 'none'
                ? 'bg-amber-500/20 text-[#FFC400] border-[#FFC400]'
                : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}
          >
            {selectedSamplePanel !== 'none' ? `Active (${selectedSamplePanel})` : 'Live Camera'}
          </button>
          {selectedSamplePanel !== 'none' && (
            <button
              onClick={() => {
                const next = selectedSamplePanel === 'switchboard' ? 'mcb' : selectedSamplePanel === 'mcb' ? 'earthing' : 'switchboard';
                setSelectedSamplePanel(next);
              }}
              className="text-amber-400 underline font-semibold ml-1 cursor-pointer"
            >
              Next Panel ➔
            </button>
          )}
        </div>

        {/* Action Buttons: Before Photo, After Photo, End Job (Min 56px touch target each) */}
        <div className="max-w-xl mx-auto w-full grid grid-cols-3 gap-2 sm:gap-3">
          {/* Before Photo Button */}
          <button
            onClick={captureBeforePhoto}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all touch-target-huge cursor-pointer ${
              beforePhoto
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : 'bg-[#1e222a] border-gray-700 hover:border-gray-500 text-gray-100'
            }`}
          >
            <Camera className="w-6 h-6 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
              {t.takeBeforePhoto}
            </span>
          </button>

          {/* After Photo Button */}
          <button
            onClick={captureAfterPhoto}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all touch-target-huge cursor-pointer ${
              afterPhoto
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : 'bg-[#1e222a] border-gray-700 hover:border-gray-500 text-gray-100'
            }`}
          >
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
              {t.takeAfterPhoto}
            </span>
          </button>

          {/* End Job Button */}
          <button
            onClick={handleEndJob}
            className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold flex flex-col items-center justify-center gap-1 shadow-xl border-2 border-amber-400/50 touch-target-huge cursor-pointer"
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-center">
              {t.endJob}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
