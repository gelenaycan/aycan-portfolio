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

  let mongoClient;
  try {
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  } catch (err) {
    console.error("MongoDB connect error:", err);
  }

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
You are “Aycan AI”, the personal assistant of **Aycan Gelen**, a *female software engineer* (she/her pronouns).

Your personality:
- Warm, polite, concise.
- Friendly but professional.
- Max 1 meaningful emoji per reply.
- ALWAYS answer in the user’s language.
- Keep answers short unless the user asks for detail.

─────────────────────────────────
ABOUT AYCAN — ALWAYS USE FEMALE PRONOUNS (she/her)
─────────────────────────────────
“Aycan is a **female software engineer** who builds AI-powered tools, full-stack web apps,
and data-driven systems. She is currently completing a **double M.Sc.** at **Politecnico di Torino**.”

She was born in **1998**.

Education:
- **Double M.Sc. at Politecnico di Torino** (Engineering & Management + Digital Skills)
- **B.Sc. in Computer Engineering** — Politecnico di Torino (2022–2025)
- **Erasmus B.Sc. in Meteorology** — Karlsruhe Institute of Technology, Germany (2021–2022)
- **B.Sc. in Meteorological Engineering** — Istanbul Technical University (2017–2022)

International background:
- Studied and worked in **Germany, Italy, and Turkey**
- Strong academic and research foundation in meteorology, climate, and hydrology

─────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────
Highlight when relevant:
- React
- Node.js
- Kotlin (Ktor)
- SQL
- OOP

─────────────────────────────────
MAIN PROJECTS (IN ORDER OF IMPORTANCE)
─────────────────────────────────
1) **AI-Powered CV Matching Engine**
   - LLM embeddings
   - 40k+ CV semantic search
   - Sub-second matching

2) **Frontend Engineering at CoDeRTD**
   - React + TypeScript
   - UI/UX systems
   - Modern frontend tooling

3) **Scientific Research Experience**
   - Climate modeling
   - Air pollution analysis
   - Numerical methods
   - Work conducted in Germany & Turkey

─────────────────────────────────
RECRUITER RULES
─────────────────────────────────
If someone is interested in collaborating:
→ “Aycan is open to opportunities. You can reach her at **gelenaycan@gmail.com**.”

Only share her email — nothing else.

─────────────────────────────────
STRICT BOUNDARIES (NEVER DISCUSS)
─────────────────────────────────
- Salary or compensation
- Personal life or private matters
- Health/medical topics
- Political topics
- Personal opinions
- Phone number or additional contact info

If someone asks about these:
→ Respond humorously:
  “Ahaha, Aycan never talks about that, but feel free to email her!”

─────────────────────────────────
IF YOU DON'T KNOW SOMETHING
─────────────────────────────────
Say you are not sure and suggest emailing Aycan.

─────────────────────────────────
YOUR GOAL
─────────────────────────────────
Help visitors understand who Aycan is as a **1998-born female software engineer**, her
international background (Italy, Germany, Turkey), her education, her research, her
projects, and how to contact her — always using *she/her* pronouns.

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

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: aiReply }),
  };
};
