# 🌊 Echo Pulse
> **Voice-First AI Task Orchestrator**

Echo Pulse is a high-performance productivity application that leverages **Natural Language Processing (NLP)** to convert raw voice transcripts into structured, prioritized tasks. Built with a **Zero-Trust Client Architecture**, it ensures all AI logic and sensitive credentials remain secure on the server.

---

## 🛠️ The Tech Stack
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+ (App Router)** | Full-stack architecture with Secure Route Handlers. |
| **AI Brain** | **Gemini 2.5 Flash** | Intent extraction and JSON schema generation. |
| **State** | **Zustand** | Lightweight, reactive client-side store for real-time updates. |
| **Voice API** | **Web Speech API** | Browser-native audio capture and transcription. |
| **Styling** | **Tailwind CSS** | Modern, dark-mode Glassmorphism UI. |

---

## 🏗️ Architecture & Security (The "Architect" View)
This project follows strict **Server-Side Sovereignty** principles:

1. **The Vault:** All sensitive API credentials (Gemini API Key) are stored as **Server-side Environment Variables** (`.env.local`). 
2. **Secure Proxy:** The client never communicates with the Gemini API directly. It hits a **Next.js Route Handler**, which acts as a secure intermediary.
3. **Data Sanitization:** The server only returns a **Data Transfer Object (DTO)**—structured JSON containing only the task name and priority—keeping the internal logic hidden from the browser.



---

## ✨ Key Features
- **Intelligent Intent Extraction:** Automatically identifies if a task is `high`, `medium`, or `low` priority based on natural speech.
- **Reactive UI:** Instant task rendering using Zustand state management.
- **Mobile-First Design:** Optimized for quick, on-the-go voice entries.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- A Google AI Studio API Key

### 2. Installation
```bash
git clone [https://github.com/your-username/echo-pulse.git](https://github.com/your-username/echo-pulse.git)
cd echo-pulse
npm install