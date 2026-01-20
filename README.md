# Real-Time AI Chatbot

A modern, real-time AI chatbot built with **Next.js 14**, **React 18**, **Tailwind CSS**, and **Socket.io**. Features streaming AI responses, typing indicators, and a persistent chat history.

![Demo](https://via.placeholder.com/800x400?text=Real-Time+Chatbot+Demo)

## 🚀 Features

- **Real-Time Communication**: WebSocket connection for instant messaging.
- **Streaming Responses**: AI responses are streamed token-by-token for a dynamic feel.
- **Modern UI**: Polished interface with Tailwind CSS, including dark mode styling, glassmorphism, and smooth animations.
- **State Management**: Handles connection states (connecting, connected, disconnected) and error handling.
- **Responsive Design**: Fully optimized for mobile and desktop.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Socket.io
- **AI Integration**: OpenAI SDK (compatible with Deepseek, Claude, etc. via OpenRouter or direct API)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd realtime-ai-chatbot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Setup:**
    Duplicate `.env.example` to `.env.local` and add your API credentials.
    ```bash
    cp .env.example .env.local
    ```
    
    Update `.env.local`:
    ```env
    OPENAI_API_KEY=your_openai_or_openrouter_api_key
    WS_PORT=4000
    ```

## 🏃‍♂️ Running the Application

Start the development server (runs both Next.js frontend and Socket.io backend):

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **WebSocket Server**: http://localhost:4000

## 📂 Project Structure

```
├── app/
│   ├── page.tsx           # Main chat page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & Tailwind directives
├── components/
│   ├── ChatInterface.tsx  # Main chat logic & UI container
│   ├── MessageBubble.tsx  # Individual message styling
│   ├── ChatInput.tsx      # Text input area
│   └── ConnectionStatus.tsx # WebSocket status indicator
├── server.js              # Custom Node.js WebSocket server
├── .env.example           # Environment variables template
└── package.json           # Dependencies & scripts
```

## 🧠 Design Decisions

- **Socket.io**: Chosen for reliable real-time bidirectional communication. It handles reconnections automatically and is easier to set up than raw WebSockets.
- **Concurrent Execution**: Used `concurrently` to run both the Next.js frontend and the Node.js backend with a single command for a better developer experience.
- **Component Architecture**: 
  - `ChatInterface` acts as the smart container managing state and sockets.
  - `MessageBubble` and `ChatInput` are presentational components for better reusability and testing.
- **Streaming**: Implemented server-side streaming using the OpenAI SDK's `stream: true` option, relaying chunks via `socket.emit('response-chunk')` to the client for immediate feedback.

## ⏱️ Time Spent

Total development time: ~2 hours
- Setup & Config: 20 mins
- Backend WebSocket Logic: 40 mins
- Frontend UI & Integration: 50 mins
- Documentation & Polish: 10 mins

---

*Built as a hiring assignment submission.*
