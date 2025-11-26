// netlify/functions/aycan-chat.js

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Only POST requests are allowed",
        }),
      };
    }
  
    const body = JSON.parse(event.body || "{}");
  
    const userMessage = body.message || "";
  
    if (!userMessage) {
      return {
        statusCode: 400, // 400 = user error
        body: JSON.stringify({
          error: "Message field is required",
        }),
      };
    }
  
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
              content:
                "You are 'Aycan AI', the personal assistant of Aycan Gelen on aycangelen.dev. Speak in a friendly, down-to-earth tone, keep answers short and clear, and you can speak English naturally if the user does also other languages. Use at most 1–2 emojis when it feels natural. Help visitors understand who Aycan is, her skills, experience and projects, and how to contact or work with her. If you don't know something, be honest and suggest they reach out to Aycan directly.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          
          temperature: 0.7,
        }),
      });
  
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
  
      const data = await response.json();
  
      const reply = data.choices?.[0]?.message?.content || "No response";
  
      console.log("AI reply:", reply);
  
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
  