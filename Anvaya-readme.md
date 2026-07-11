# 🌟 Anvaya: An Inclusive Learning Portal

Anvaya is a state-of-the-art learning platform specifically engineered for **specially-abled students**, ensuring that education is accessible to everyone, regardless of physical or cognitive challenges.

---

## 🚀 Tech Stack Overview

### **Frontend & User Interface**
*   **Next.js 14 & Radix UI**: High-performance React framework coupled with WCAG 2.2 AAA certified unstyled components for building bulletproof, screen-reader-accessible interfaces.
*   **Tailwind CSS A11y**: Leveraging utility-first CSS with native support for **High Contrast** modes and **Reduced Motion** queries.
*   **Mousetrap.js**: A custom engine for 'J' & 'F' hotkey navigation, enabling 100% mouse-free site control for users with motor impairments.

### **Backend & Data Orchestration**
*   **PostgreSQL + pgvector**: A unified database for user profiles and AI-powered vector search embeddings, allowing for context-aware content retrieval.
*   **FastAPI & Flask**: Utilizing high-speed Python backends for real-time sign language processing and multimodal model inference.
*   **Unstructured.io**: Intelligent pipeline to convert complex formats (YouTube, PDFs, photos) into screen-reader-friendly accessible text.

### **AI-Driven Tools**
*   **LangGraph Agents**: Intelligent chatbot agents that perform site actions (like increasing font size or navigating pages) and guide users through the curriculum.
*   **Gemma 2**: High-speed multimodal AI for instant document summaries and content adaptation for neurodivergent learners.
*   **Sarvam.ai**: Specialized multilingual AI providing low-latency Indian language Speech-to-Text (STT) and Text-to-Speech (TTS).

### **Computer Vision & Sign Suite**
*   **MediaPipe + TensorFlow**: Real-time hand-tracking and gesture recognition for high-precision live sign language interaction.
*   **LSTM Models**: Context-aware AI that understands full sign-language sentences rather than just individual letters.
*   **Sign Language Overlay**: Automatically generates visual hand gesture videos synchronized with educational content.

### **Native Accessibility & Audio**
*   **Web Vibrations API**: Integrated haptic feedback for tactile alerts on touch devices, aiding visually impaired users.
*   **Deepgram API**: High-accuracy live captioning with speaker diarization to identify different contributors in educational videos.

---

## 🏛️ Development Standards & Compliance
- **Axe-Core Integration**: Continuous automated accessibility testing to ensure zero regression in usability.
- **Govt. Alignment**: Architected in accordance with **India’s DEPwD guidelines** and the **RPwD Act 2016**.
- **WCAG 2.2 AAA**: Targeting the highest level of international accessibility standards.

---

## 🛠️ Project Structure
```bash
├── app/                  # Next.js 14 App Router (Frontend)
├── backend/
│   ├── fastapi/          # Main API & AI Orchestration
│   ├── flask/            # Real-time CV & Sign Recognition
│   └── ai_engine/        # LangGraph Agent logic
├── database/             # PostgreSQL + pgvector migrations
├── cv_suite/             # MediaPipe & TensorFlow models
└── tests/a11y/           # axe-core accessibility tests
```

---

## 📜 License
Built for the **Inclusive Education Hackathon**. All rights reserved.
