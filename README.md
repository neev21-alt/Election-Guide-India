# 🗳️ Election Process Guide: Next-Gen Civic Tech Platform

An interactive, accessible, and gamified web application built to educate Indian citizens about the electoral process. Designed as a production-ready civic tech tool, it features deep accessibility integrations, an AI-powered assistant, and authentic voting simulations.

## 🌟 Key Features

1. **🤖 AI Election Assistant**: Powered by Gemini 1.5 Flash. Features native Web Speech API integration for Voice Input (Mic) and Text-to-Speech (Read Aloud), with English/Hindi toggling.
2. **🎰 Interactive EVM & VVPAT Simulator**: A realistic Balloting Unit simulation complete with authentic beep sounds, LED indicators, Braille dot tooltips, NOTA support, and a sliding 7-second VVPAT paper trail.
3. **🏆 Gamified Voter Quiz**: A 5-question civic knowledge quiz. Scoring 100% triggers a confetti celebration and dynamically generates a personalized "Democracy Champion" certificate using the HTML5 Canvas API for download.
4. **📍 Find My Polling Booth Locator**: A mock utility where users enter their 6-digit Pincode to generate a beautiful Mock Voter Slip detailing their polling station and ward.
5. **🪪 Polling Guide & Document Validator**: Step-by-step timeline of booth procedures. Features an interactive ID Validator to check if documents (Aadhaar, PAN, Student ID) are valid for voting.
6. **✅ Eligibility Checker**: Interactive checklist confirming voting criteria, linking to the official ECI portal.

## 💻 Tech Stack

- **Framework**: React 18 with Vite (JavaScript/JSX)
- **Styling**: Vanilla CSS utilizing CSS Variables for a "Premium Glassmorphism" UI. Color palette based on the Indian National Flag (#FF9933, #FFFFFF, #138808) with Navy Blue (#000080) for contrast.
- **Animations**: `framer-motion` for fluid page transitions and interactions.
- **Icons**: `lucide-react`
- **Gamification**: `canvas-confetti`
- **AI Integration**: `@google/generative-ai`

## 🚀 Setup Instructions

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd prompt
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **View the app**:
   Open your browser and navigate to `http://localhost:5173`.

## ⚙️ API Configuration

To use the AI Assistant:
1. Navigate to the **AI Assistant** tab.
2. Click the **Key** icon to open the settings.
3. Paste your Google Gemini API Key.
4. The assistant is now ready to answer real-time queries in English and Hindi!

---
