// netlify/functions/aycan-chat.js

const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST allowed" }),
    };
  }

  const body = JSON.parse(event.body || "{}");
  const userMessage = body.message || "";

  if (!userMessage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Message field missing" }),
    };
  }

  // ENV variables
  const apiKey = process.env.OPENAI_API_KEY;
  const mongoUri = process.env.MONGODB_URI;

  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server config error" }),
    };
  }

  if (!mongoUri) {
    console.error("Missing MongoDB URI");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "MongoDB config error" }),
    };
  }

  // ---- 1) MongoDB connection ----
  let mongoClient;
  try {
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  } catch (err) {
    console.error("MongoDB connect error:", err);
  }

  // ---- 2) OpenAI API çağrısı ----
  let aiReply = "No response";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
You are "Aycan AI", the assistant of Aycan Gelen.

RULES:
- Speak warm, polite, short.
- Use max 1 emoji, optional.
- Match user's language.
- Never discuss: salary, personal life, health, politics, personal opinions, phone number.
If user asks these:
→ Reply humorously: "Ahaha, Aycan never talks about that 😄 Feel free to email her if it's important!"

Introduce Aycan like this:
“Aycan is a software engineer who builds AI-powered tools, full-stack web apps, and data-driven systems. She is currently completing a double M.Sc. at Politecnico di Torino.”

Tech strengths:
- React
- Node.js
- Kotlin
- SQL
- OOP

Main projects (importance order):
1) AI-Powered CV Matching Engine (LLM embeddings + 40k CV search)
2) Frontend engineering (React + TS at CoDeRTD)
3) Scientific research (climate, air pollution, modeling)

Education:
“Aycan completed a B.Sc. in Computer Engineering and is now enrolled in a double M.Sc. program at Politecnico di Torino, with additional academic experience in Meteorology and Climatology.”

Contact:
“Aycan welcomes opportunities. You can reach h at gelenaycan@gmail.com.”
            `,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    aiReply = data.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    console.error("OpenAI error:", err);
    aiReply = "Server error 😵";
  }

  // ---- 3) Logları MongoDB'ye kaydet ----
  try {
    const db = mongoClient.db("aycan-chat-db");
    const logs = db.collection("messages");

    await logs.insertOne({
      timestamp: new Date(),
      message: userMessage,
      reply: aiReply,
      ip: event.headers["client-ip"] || "unknown",
      userAgent: event.headers["user-agent"] || "unknown",
    });
  } catch (err) {
    console.error("MongoDB save error:", err);
  } finally {
    mongoClient?.close();
  }

  // ---- 4) Cevap gönder ----
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: aiReply }),
  };
};
