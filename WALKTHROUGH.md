# Project Walkthrough: Election Process Educational Assistant

## Overview
This project is an interactive educational platform designed for Indian voters. It simplifies complex election procedures into engaging, easy-to-understand modules.

## Architecture & Tech Stack
- **Frontend**: Vite + React
- **Styling**: Vanilla CSS with modern aesthetics (Glassmorphism, CSS Variables, Keyframe Animations)
- **Icons**: Lucide React for consistent visual language.
- **Animations**: Framer Motion for smooth state transitions.
- **AI**: Google Gemini API integration for real-time election guidance.

## Core Features Developed

### 1. 'Am I Eligible?' Module
- **Purpose**: Helps users determine their voting eligibility.
- **Implementation**: A state-managed checklist that provides immediate feedback and actionable next steps.

### 2. Election Timelines
- **Purpose**: Visualizes the journey of an election from notification to counting.
- **Design**: A vertical timeline with custom icons and color-coded stages.

### 3. Polling Day Guide
- **Purpose**: Walkthrough of the physical polling booth experience.
- **Interaction**: A step-by-step slider using emojis and clear text to demystify the 4-step voting process.

### 4. Interactive EVM Simulator (Enhanced)
- **Features**:
    - **NOTA Integration**: Includes the pink 'None of the Above' button as per Indian standards.
    - **Braille Accessibility**: Braille numerals included for visually impaired accessibility.
    - **Audio/Visual Feedback**: Red LED glow and high-frequency beep on vote.
    - **VVPAT Logic**: 7-second slip display for verification.

### 5. ECI AI Assistant (Multilingual & Accessible)
- **Multilingual**: Toggle between English and Hindi with dynamic system prompt updates.
- **Text-to-Speech**: Listen to bot responses using the Web Speech API.
- **Voice Input**: Ask questions using the microphone via browser speech recognition.

### 6. Gamification: Voter IQ Quiz
- **Interaction**: A 5-question interactive quiz to test knowledge of the democratic process.
- **Reward**: Celebration with confetti and a "Democracy Champion" badge for perfect scores.

## Design Philosophy
The UI follows a "Digital India" theme, utilizing the national palette balanced with modern Glassmorphism. Special attention is paid to **Inclusivity** (Braille, Multilingual, Audio) and **Engagement** (Confetti, Quizzes).

## How to Run
1. `npm install`
2. `npm run dev`
3. Access at `http://localhost:5173/`
