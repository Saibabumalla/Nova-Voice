# 🎙️ NOVA - Browser-Based Voice Assistant

**NOVA** is an intelligent, browser-based voice assistant developed using **HTML**, **CSS**, and **JavaScript**. It uses the Web Speech API for real-time speech recognition and speech synthesis, allowing users to interact with their browser using natural voice commands.

---

## 🌐 Live Demo

👉 https://novavoice.netlify.app/

---

## 📌 Project Overview

This project showcases how powerful browser-native APIs can be used to build a fully functional voice assistant without requiring any backend server. It listens to your voice, responds intelligently, and displays information in a clean, responsive UI.

---

## ✨ Features

- 🗣️ **Voice recognition** via Web Speech API  
- 🔊 **Speech synthesis** responses (talks back)  
- 📖 **Wikipedia summaries** with external link  
- 🌐 Open websites like Google with voice  
- 🔍 Google search via voice  
- ⏰ Show current time and date  
- 😂 Tell jokes and interesting facts  
- 📋 Status and transcript display  
- ⚡ Responsive UI with modern styling  
- ✅ Built-in example commands to try  

---

## 🧠 Supported Voice Commands

### 🔹 General Commands
- “What’s the time?”  
- “What’s today’s date?”  
- “Tell me a joke”  
- “Tell me a fact”

### 🔹 Open or Search
- “Open Google”  
- “Search for [your query]”  
- “Who is Albert Einstein?”  
- “What is Artificial Intelligence?”  

---

## 🧩 How It Works

1. **Speech Recognition**: Captures your voice through the Web Speech API and transcribes it to text.
2. **Command Detection**: The script analyzes the spoken text and checks it against predefined commands.
3. **Action Handling**:
   - Speaks a response using the `SpeechSynthesisUtterance` API.
   - Opens web pages for certain commands (e.g., Google, YouTube).
   - Fetches Wikipedia summaries using the MediaWiki API.
   - Retrieves fallback Google snippets using Serper.dev if needed.
4. **User Feedback**: Displays the spoken text and answer on screen with proper status updates.

---

## 🛠️ Technologies Used

- 💻 HTML5  
- 🎨 CSS3 (responsive design)  
- 🧠 JavaScript (Vanilla)  
- 🗣️ Web Speech API (Speech Recognition + Synthesis)  
- 🌐 Wikipedia API  
- 📡 Serper.dev API for fallback Google snippets

---

## 📂 Project Structure

```
nova-voice-assistant 
   ├── README.md # Project description and documentation 
   ├── style.css # Styles (colors, layout, responsiveness) 
   ├── script.js # Voice recognition and logic 
   └── index.html # Main interface and layout
```
