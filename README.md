[readme_md.md](https://github.com/user-attachments/files/34435327/readme_md.md)
# Ustaad (ఉస్తాద్ / उस्ताद)
> **AI-Powered Discovery, Diagnostic, & Business Growth Platform for Informal Vocational Technicians**

[![Buildathon Edition](https://img.shields.io/badge/Startup%20Buildathon-India%202026-orange.svg)](https://startupbuildathon.in)
[![Google AI Edge](https://img.shields.io/badge/Powered%20By-Google%20AI%20%26%20LiteRT-4285F4.svg)](https://ai.google.dev/)
[![Offline First](https://img.shields.io/badge/Architecture-100%25%20Offline--First-10B981.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Overview

**Ustaad** is a next-generation agentic platform designed to bridge the digital gap for over **150+ million informal skilled workers** (electricians, plumbers, HVAC technicians, mechanics) across India. 

While conventional aggregator platforms treat workers as replaceable commodity labor, **Ustaad empowers tradespeople to run their own intelligent digital micro-enterprises**. Combining **Google AI Studio / Gemini Live API** for real-time multilingual diagnostics and **Google AI Edge / LiteRT** for 100% on-device offline operation, Ustaad enables technicians to:
1. **Get Discovered:** Receive direct localized customer leads without predatory platform commissions.
2. **Diagnose & Repair:** Access a real-time, hands-free AI field foreman in native languages (Telugu, Hindi, English) with visual safety guardrails.
3. **Build Verifiable Reputation:** Automatically generate an immutable, verified **Skill Passport** to unlock micro-financing and enterprise contracts.

---

## 🚀 Key Features

### 🛠️ 1. Intelligent Job Discovery & Customer Management
* **Voice-First Request Dispatch:** Local customers can describe problems in native dialects. Ustaad matches jobs to nearby technicians based on domain skill vectors.
* **Smart Estimation & Invoicing:** Generates itemized, transparent repair quotes and bill summaries in real time via voice prompts.
* **Customer History & CRM:** Keeps track of customer locations, past repair notes, and warranty logs automatically.

### 🧠 2. Real-Time AI Field Foreman (Two-Brain Architecture)
* **Brain 1 (Multimodal Live Guidance):** Uses camera vision and bidirectional audio to guide technicians through complex repairs (e.g., HVAC refrigerant leaks, motor rewinding, circuit board diagnostics).
* **Brain 2 (Automated Skill Ledger):** Post-repair, Gemini extracts structured JSON logs from the diagnostic stream to create a verified job record with before-and-after visual proof.
* **Instant Safety Overrides:** Built-in computer vision algorithms detect open 415V lines, ungrounded breakers, or hazardous gas leaks and issue immediate safety halts.

### 📡 3. 100% Offline-First (Google AI Edge / LiteRT)
* **Zero Connectivity Blackout Protection:** Operates in underground electrical vaults or remote job sites with 0% cellular signal using locally embedded **Gemma** open-weights models.
* **Background Sync Queue:** Automatically syncs completed job passports and financial ledgers to Cloud Firestore when connection is restored.

---

## 🏗️ Technical Architecture

```
                                  +---------------------------------------+
                                  |         Ustaad Mobile App             |
                                  +---------------------------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
         [Online Mode: Google Cloud]                               [Offline Mode: AI Edge]
                         |                                                         |
          +--------------v--------------+                           +--------------v--------------+
          |  Gemini Live API (Speech)   |                           |    Google LiteRT Runtime    |
          |  Gemini 1.5 Pro (JSON DB)   |                           |  On-Device Gemma Model      |
          +--------------+--------------+                           +--------------+--------------+
                         |                                                         |
                         +----------------------------+----------------------------+
                                                      |
                                        +-------------v-------------+
                                        |  Local SQLite / Firestore |
                                        +-------------+-------------+
                                                      |
                                        +-------------v-------------+
                                        | Verified Skill Passport   |
                                        +---------------------------+
```

---

## 🛠️ Google AI Stack Integration

| Google Tool / Technology | Role in Ustaad Platform |
| :--- | :--- |
| **Google AI Studio** | Rapid ideation, prompt engineering, and safety guardrail testing for regional language voice feeds. |
| **Google Antigravity** | Agent-first developer environment for scaffolded multi-file architecture and automated testing. |
| **Google Agent Skills** | Modular domain knowledge packages (`SKILL.md`) for specialized plumbing, electrical, and HVAC procedures. |
| **Google LiteRT & Gemma** | On-device high-performance inference engine for 100% offline diagnostic execution. |
| **Gemini Models** | High-reasoning multimodal engine driving live audio-visual diagnosis and structured JSON ledger generation. |

---

## 💻 Installation & Quickstart

### Prerequisites
* **Node.js**: v18.x or higher
* **Android Studio** (for mobile APK builds with AICore/LiteRT bindings)
* **Google Gemini API Key** (Get key from [Google AI Studio](https://aistudio.google.com/))

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/ustaad-ai-platform.git
   cd ustaad-ai-platform
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_ai_studio_api_key
   NEXT_PUBLIC_OFFLINE_MODE_FALLBACK=true
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to view the application interface.

---

## 📱 Regional Language Support

Ustaad is built natively for India's diverse workforce:
* **Telugu (తెలుగు)** — Full speech & visual reasoning support
* **Hindi (हिंदी)** — Full speech & visual reasoning support
* **English (Indian Accent)** — Full speech & visual reasoning support

---

## 📄 License & Attribution

This project is open-sourced under the **MIT License**. Built for the **Startup Buildathon India 2026**.

---

<p center>
  Made with ❤️ in Hyderabad for India's Skilled Vocational Workers.
</p>
