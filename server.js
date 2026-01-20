/* eslint-disable @typescript-eslint/no-require-imports */
const { Server } = require("socket.io");
const OpenAI = require("openai");
const dotenv = require("dotenv");
// Load environment variables from .env.local or .env
dotenv.config({ path: ".env.local" });
dotenv.config();
const PORT = parseInt(process.env.WS_PORT || "4000", 10);
const io = new Server(PORT, {
    cors: {
        origin: "*", // Allow all origins for dev simplicity, restrict in prod
        methods: ["GET", "POST"],
    },
});
const apiKey = process.env.OPENAI_API_KEY;
const baseURL = process.env.OPENAI_BASE_URL;
let openai;
if (apiKey) {
    openai = new OpenAI({
        apiKey,
        baseURL: baseURL || "https://api.openai.com/v1"
    });
} else {
    console.warn("OPENAI_API_KEY not found. AI responses will be simulated.");
}
console.log(`WebSocket server is running on port ${PORT}`);
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.emit("status", { status: "connected" });
    socket.on("message", async (data) => {
        try {
            const { message, history } = data;
            if (!message) return;
            // Construct messages for OpenAI
            // History should be an array of { role: 'user'|'assistant', content: string }
            const messages = history ? [...history, { role: "user", content: message }] : [{ role: "user", content: message }];
            if (openai) {
                // Real OpenAI Stream
                const stream = await openai.chat.completions.create({
                    model: "mistralai/mistral-7b-instruct",
                    messages,
                    stream: true,
                });

                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    if (content) {
                        socket.emit("response-chunk", content);
                    }
                }
            } else {
                // Simulated AI Response (if no key)
                const mockResponse = "I am a simulated AI response because no API key was provided. Please check your .env file.";
                const words = mockResponse.split(" ");
                for (const word of words) {
                    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
                    socket.emit("response-chunk", word + " ");
                }
            }
            socket.emit("response-complete");
        } catch (error) {
            console.error("Error generating response:", error);
            socket.emit("error", "Failed to generate response");
        }
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
