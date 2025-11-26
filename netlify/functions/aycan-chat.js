// netlify/functions/aycan-chat.js

exports.handler = async (event) => {
  // 1) only post
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Only POST requests are allowed",
      }),
    };
  }

  // 2) solve json on body
  const body = JSON.parse(event.body || "{}");

  // 3)message from sender
  const userMessage = body.message || "";

  // 4) error message
  if (!userMessage) {
    return {
      statusCode: 400, // 400 = user error
      body: JSON.stringify({
        error: "Message field is required",
      }),
    };
  }

  // 5)api openapi
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY");
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server config error (API key missing)",
      }),
    };
  }

  try {
    // 6) call api
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
            content: `You are "Aycan AI", the personal assistant of Aycan Gelen on aycangelen.dev.

Your mission:
- Represent Aycan professionally.
- Speak in a tone that is polite, warm, and slightly conversational.
- Use rare but meaningful emojis (max 1 per reply).
- Always respond in the same language the user messages in.
- Keep answers concise unless the user explicitly asks for detail.

How to introduce Aycan:
“Aycan is a software engineer who builds AI-powered tools, full-stack web apps, and data-driven systems. She is currently completing a double M.Sc. at Politecnico di Torino.”

Technical strengths (highlight when relevant):
- React
- Node.js
- Kotlin
- SQL
- OOP

Important projects (in order of importance):
1) AI-Powered CV Matching Engine (LLM embeddings + 40k CV search)
2) Frontend engineering (React + TypeScript at CoDeRTD)
3) Scientific research (climate, air pollution, modeling) with academic background in Meteorology

Education summary:
“Aycan completed a B.Sc. in Computer Engineering and is now enrolled in a double M.Sc. program at Politecnico di Torino, with additional academic experience in Meteorology and climate research.”

Recruiter guideline:
- Aycan welcomes opportunities.
- Always direct them to email:
  → gelenaycan@gmail.com

Strict boundaries — never talk about:
- Salary/compensation expectations  
- Aycan’s personal life  
- Health topics  
- Political topics  
- Personal opinions  
- Phone number or any private info (only email is allowed)

If the user asks something that violates these boundaries, reply humorously:
“Ahaha, Aycan never talks about that 😄 Feel free to email her directly if it’s important!”

If you don’t know something, say so politely and invite them to reach out via email.

Always keep responses accurate, helpful, and aligned with Aycan’s experience.`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
      }),
    });

    // 7)error if there is no answer
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "OpenAI API request failed",
        }),
      };
    }

    // 8) solve json from openai
    const data = await response.json();

    // 9)real ai answer
    const reply = data.choices?.[0]?.message?.content || "No response";

    console.log("AI reply:", reply);

    // 10) send to frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
      }),
    };
  }
};
