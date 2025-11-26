// public/chat-widget.js

(function () {
    
    // chat button
    const button = document.createElement("button");
    button.textContent = "Chat with Aycan AI 💬";
  
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "9999";
    button.style.padding = "10px 16px";
    button.style.borderRadius = "9999px";
    button.style.border = "none";
    button.style.background = "#111827";
    button.style.color = "white";
    button.style.fontSize = "14px";
    button.style.fontFamily = "system-ui";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 4px 10px rgba(0,0,0,0.25)";
  
    // hover
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.03)";
    });
  
    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });
  
    document.body.appendChild(button);
  
    
    // chat windw
    const chatBox = document.createElement("div");
  
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "70px";
    chatBox.style.right = "20px";
    chatBox.style.width = "300px";
    chatBox.style.height = "380px";
    chatBox.style.background = "white";
    chatBox.style.border = "1px solid #ddd";
    chatBox.style.borderRadius = "12px";
    chatBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.25)";
    chatBox.style.display = "none";
    chatBox.style.flexDirection = "column";
    chatBox.style.overflow = "hidden";
    chatBox.style.zIndex = "9999";
  
    // inside html
    chatBox.innerHTML = `
      <div style="background:#111827; color:white; padding:10px; font-size:16px; font-weight:600;">
        Aycan AI 🤖
      </div>
  
      <div id="chat-messages" style="flex:1; padding:10px; overflow-y:auto; font-size:14px;">
      </div>
  
      <div style="padding:10px; border-top:1px solid #ddd; display:flex; gap:8px;">
        <input 
          id="chat-input" 
          type="text" 
          placeholder="Type a message..." 
          style="flex:1; padding:6px 8px; border-radius:6px; border:1px solid #ccc;"
        >
        <button id="chat-send" style="background:#111827; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
          Send
        </button>
      </div>
    `;
  
    
    // 3) choose item from html
    const messagesDiv = chatBox.querySelector("#chat-messages");
    const input = chatBox.querySelector("#chat-input");
    const sendBtn = chatBox.querySelector("#chat-send");
  
    // 4) add message
    function addMessage(text, sender) {
      const msg = document.createElement("div");
      msg.style.marginBottom = "8px";
  
      if (sender === "user") {
        // hr's message
        msg.style.textAlign = "right";
        msg.innerHTML = `
          <div style="
            display:inline-block;
            padding:6px 10px;
            background:#4F46E5;
            color:white;
            border-radius:12px;
            max-width:80%;
          ">
            ${text}
          </div>
        `;
      } else {
        // AI message
        msg.style.textAlign = "left";
        msg.innerHTML = `
          <div style="
            display:inline-block;
            padding:6px 10px;
            background:#E5E7EB;
            color:#111827;
            border-radius:12px;
            max-width:80%;
          ">
            ${text}
          </div>
        `;
      }
  
      messagesDiv.appendChild(msg);
      //scrolling auto
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  
    // 5) push send button to send message
    sendBtn.addEventListener("click", async () => {
        const text = input.value.trim();
        if (!text) return;
      
        // 1) add message
        addMessage(text, "user");
        input.value = "";
      
        // 2) "Aycan AI yazıyor..." 
        const typingMsg = document.createElement("div");
        typingMsg.style.textAlign = "left";
        typingMsg.style.opacity = "0.6";
        typingMsg.textContent = "Aycan AI is typing...";
        messagesDiv.appendChild(typingMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      
        try {
          // 3) post request to backend
          const res = await fetch("/.netlify/functions/aycan-chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text }),
          });
      
          const data = await res.json();
      
          // 4) "typing" delete
          messagesDiv.removeChild(typingMsg);
      
          // 5) AI answer added
          if (data.reply) {
            addMessage(data.reply, "bot");
          } else {
            addMessage("AI Couldnt answer😕", "bot");
          }
        } catch (err) {
          // error 
          messagesDiv.removeChild(typingMsg);
      
          addMessage("Server error 😵", "bot");
          console.error(err);
        }
      });
      
  
    // 6)send message with enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
      }
    });
    
  
    document.body.appendChild(chatBox);
  
    
    // chat open-close
    let isOpen = false;
  
    button.addEventListener("click", () => {
      isOpen = !isOpen;
      chatBox.style.display = isOpen ? "flex" : "none";
    });
  })();
  