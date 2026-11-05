[readme.md](https://github.com/user-attachments/files/34435745/readme_md.1.md)

# 🛠️ USTAAD (ఉస్తాద్ / उस्ताद)

### *Next-Generation AI Platform for Informal Vocational Technicians & Tradespeople*

## 📌 Executive Summary

**Ustaad** is an enterprise-grade agentic AI platform designed to digitize, empower, and scale India's informal vocational workforce. Traditional aggregator platforms commoditize technicians, taking high commissions while offering zero technical or safety support in the field.

**Ustaad flips this paradigm.** It operates as an **AI-powered micro-enterprise engine** on the technician's mobile device, seamlessly handling:

1. **Hyper-Local Discovery & CRM:** AI-driven job matching, voice-based customer dispatching, automated smart estimations, and invoicing.

2. **Real-Time Multilingual Field Assistance:** A hands-free visual/voice foreman operating in Telugu, Hindi, and Indian English for on-site troubleshooting.

3. **100% Offline Resilience:** On-device neural execution via Google LiteRT and Gemma open-weights models for signal-dead basements and remote locations.

4. **Verified Digital Reputation:** Automated extraction of structured work logs into immutable "Skill Passports" for micro-credit and enterprise contracting.

## 🏗️ System Architecture & Data Flow

Ustaad employs a **Dual-Engine Agentic Pattern** that bridges real-time cloud multimodal capabilities with resilient on-device edge execution.

```
+---------------------------------------------------------------------------------------------------+
|                                     USTAAD MOBILE / WEB CLIENT                                    |
|  +---------------------------+   +-------------------------------+   +-------------------------+  |
|  | Customer Discovery & CRM  |   | Multilingual Live Diagnostics |   | Offline Skill Ledger    |  |
|  +---------------------------+   +-------------------------------+   +-------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                                 |
                       +-------------------------+-------------------------+
                       |                                                   |
           [NETWORK ONLINE DETECTED]                             [OFFLINE / NO SIGNAL]
                       |                                                   |
                       v                                                   v
+---------------------------------------------+   +-------------------------------------------------+
|             GOOGLE CLOUD PLATFORM           |   |            ON-DEVICE LITERTE ENGINE             |
|                                             |   |                                                 |
|  +---------------------------------------+  |   |  +-------------------------------------------+  |
|  | Gemini Live API (Sub-300ms WebSockets)|  |   |  | Google LiteRT / AICore Runtime            |  |
|  | - Multilingual Audio Stream (TE/HI/EN)|  |   |  | - On-Device Gemma 2B / 7B Quantized Model|  |
|  | - Multi-Frame Visual Bounding Boxes   |  |   |  | - Local Computer Vision Rule Guardrails   |  |
|  +-------------------++------------------+  |   |  +---------------------+---------------------+  |
|                      ||                     |   |                        |                        |
|  +-------------------\/------------------+  |   |  +---------------------v---------------------+  |
|  | Gemini 1.5 Pro / Flash (Parser)       |  |   |  | On-Device SQLite / IndexedDB              |  |
|  | - Structured JSON Skill Extraction    |  |   |  | - Encrypted Local Storage Cache            |  |
|  +-------------------+-------------------+  |   +------------------------+------------------------+
|                      |                      |                            |
+----------------------|----------------------+                            |
                       |                                                   |
                       +-------------------------+-------------------------+
                                                 |
                                                 v
                               +-----------------------------------+
                               |     BACKGROUND SYNC WORKER        |
                               | (Syncs when network is restored)  |
                               +-----------------+-----------------+
                                                 |
                                                 v
                               +-----------------------------------+
                               |     FIRESTORE / SKILL PASSPORT    |
                               +-----------------------------------+

```

## 🔄 Sequence Diagram: Live Field Diagnostic Session

```
Technician               Ustaad Client              Google AI Studio / Live API           Firestore DB
    |                         |                                 |                             |
    |--- 1. Start Stream ---->|                                 |                             |
    |    (Camera + Speech)    |--- 2. WebSocket Audio/Video --->|                             |
    |                         |       Stream (Telugu/Hindi)     |                             |
    |                         |                                 |                             |
    |                         |<-- 3. Live Guidance Audio ------|                             |
    |                         |       + HUD Bounding Boxes      |                             |
    |                         |                                 |                             |
    |<-- 4. Audio Instructions|                                 |                             |
    |    ("Cut main breaker!")|                                 |                             |
    |                         |                                 |                             |
    |--- 5. Complete Job ---->|                                 |                             |
    |                         |--- 6. Post-Session Payload ---->|                             |
    |                         |       (Audio Transcript + Caps) |                             |
    |                         |                                 |-- 7. Extract JSON Ledger -->|
    |                         |<-- 8. Validated JSON Payload ---|                             |
    |                         |                                                               |
    |                         |====================== 9. Commit Record =======================>|

```

## 🚀 Key Functional Modules

### 1. 💼 Business Growth & Discovery Suite

* **Voice-First Request Matching:** Local customers record problem descriptions in their dialect. Ustaad converts speech to domain vectors and alerts matching technicians nearby.

* **Instant Smart Quotations:** Technicians state the required materials verbally, and Ustaad compiles a professional, itemized PDF quote instantly.

* **Customer History CRM:** Automatically archives address details, past appliance service logs, and warranty expirations per customer.

### 2. ⚡ Multilingual AI Field Foreman (Live Diagnostics)

* **Visual Fault Isolation:** Uses multimodal vision to detect burnt PCB components, refrigerant leaks, loose terminal block wires, or worn motor bearings.

* **Multilingual Interaction:** Seamlessly switches between **Telugu (తెలుగు)**, **Hindi (हिंदी)**, and **English** based on spoken input.

* **Safety First Guardrails:** Real-time visual classifiers automatically issue loud audio overrides if 415V three-phase lines or ungrounded circuit breakers are detected.

### 3. 📡 100% Offline-First Edge Architecture

* **Zero-Signal Reliability:** Runs on-device via **Google LiteRT** and optimized **Gemma** open-weights models when technicians work in basements or remote rural locations.

* **Smart Reconciliation:** Local SQLite database logs job details offline and pushes background updates to Cloud Firestore once internet connectivity returns.

## 🛠️ Google AI Stack Integration

| Technology | Implementation & Operational Role | 
| ----- | ----- | 
| **Google AI Studio** | Used for prompt system instructions, multi-turn dialogue tuning, and regional language edge-case evaluation. | 
| **Google Antigravity** | Agent-first development environment used for multi-file component scaffolding and automated end-to-end testing. | 
| **Google Agent Skills** | Domain-specific `SKILL.md` instruction files providing procedures for electrical, HVAC, and plumbing standards. | 
| **Google LiteRT & Gemma** | On-device high-performance inference engine for 100% offline diagnostic execution without cloud latency. | 
| **Gemini Models** | Multimodal reasoning engine driving low-latency audio-visual field guidance and structured JSON extraction. | 

## 📁 Repository Directory Structure

```
ustaad-ai-platform/
├── .github/                    # CI/CD Workflows & Issue Templates
├── android/                    # Android Native Wrapper (LiteRT & AICore Bindings)
├── public/                     # Static Assets, Icons, and PWA Manifest
├── src/
│   ├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── components/             # Reusable UI Components
│   │   ├── camera/             # Camera Viewfinder & HUD Overlay
│   │   ├── crm/                # Job Discovery & Smart Invoicing Components
│   │   ├── diagnostics/        # Live Audio Waveform & Transcript Feeds
│   │   └── passport/           # Digital Skill Passport Cards & Export Modules
│   ├── core/                   # Core Business & AI Logic
│   │   ├── ai/                 # Gemini Live API & LiteRT Runtime Wrappers
│   │   ├── db/                 # Local SQLite / IndexedDB Storage Schemas
│   │   └── guardrails/         # Safety Rule Overrides & Voltage Classifiers
│   └── skills/                 # Agent Skill Instruction Modules
│       ├── electrical_v2.md    # Electrical Safety & Troubleshooting Skill
│       ├── hvac_v1.md          # Compressor & Refrigerant Diagnostics Skill
│       └── plumbing_v1.md      # Pressure Systems & Pipe Fitting Skill
├── .env.example                # Template for Environment Variables
├── next.config.js              # Next.js & PWA Configuration
├── package.json                # Project Dependencies & Scripts
└── README.md                   # Repository Documentation

```

## 💻 Installation & Local Development

### Prerequisites

* **Node.js**: `v18.x` or higher

* **npm**: `v9.x` or higher

* **Google Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/)

### Quickstart Setup

1. **Clone the Repository:**

   ```
   git clone https://github.com/starrock7205-pixel/ustaad-ai-platform.git
   cd ustaad-ai-platform
   
   ```

2. **Install Dependencies:**

   ```
   npm install
   
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_ENABLE_OFFLINE_LITERTE=true
   NEXT_PUBLIC_DEFAULT_LANGUAGE=telugu
   
   ```

4. **Launch the Development Server:**

   ```
   npm run dev
   
   ```

   Navigate to `http://localhost:3000` to interact with the application.

## 👤 Author & Maintainer

* **Developer:** Star Rock

* **GitHub:** [@starrock7205-pixel](https://github.com/starrock7205-pixel)

* **Email:** [starrock7205@gmail.com](mailto:starrock7205@gmail.com)

## 📄 License & Attribution

Distributed under the **MIT License**. Created for the **Startup Buildathon India 2026**.

PUBLIC LINK :https://ai.studio/apps/00eb7abe-72a3-4bd0-bbd8-8eb22f7f7dc0
