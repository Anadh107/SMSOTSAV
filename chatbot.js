/* ====== SOUNDS ====== */
const typingSound = new Audio("typing.mp3");
typingSound.volume = 0.4;

const notificationSound = new Audio("notification.mp3");
notificationSound.volume = 0.6;

let soundUnlocked = false;

/* ====== LOAD CHATBOT HTML ====== */
fetch("chatbot.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("chatbot-container").innerHTML = html;
    initChatbot();
  });

/* ====== NOTIFICATION SOUND ON LOAD ====== */
window.addEventListener("load", () => {
  setTimeout(() => {
    notificationSound.play().catch(() => {});
  }, 800);
});

/* ====== MAIN CHATBOT ====== */
function initChatbot() {

  const chatBody = document.getElementById("chatBody");
  const openBot = document.getElementById("openBot");
  const closeBot = document.getElementById("closeBot");

  let step = 0;
  let userData = {
    name: "",
    college: "",
    district: ""
  };

  function unlockSound() {
  if (soundUnlocked) return;

  notificationSound.play().then(() => {
    notificationSound.pause();
    notificationSound.currentTime = 0;
    soundUnlocked = true;
  }).catch(() => {});
}

  /* OPEN BOT */
  openBot.onclick = () => {
    document.querySelector(".chatbot").style.display = "flex";
    openBot.classList.add("opened");
    startChat();
  };

  /* CLOSE BOT */
  closeBot.onclick = () => {
    document.querySelector(".chatbot").style.display = "none";
  };

  /* BOT MESSAGE */
  function bot(msg) {
    showTyping();

    setTimeout(() => {
      hideTyping();
      chatBody.innerHTML += `<div class="bot">${msg}</div>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 900);
  }

  /* USER MESSAGE */
  function user(msg) {
    chatBody.innerHTML += `<div class="user">${msg}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* TYPING INDICATOR */
  function showTyping() {
    typingSound.currentTime = 0;
    typingSound.play().catch(() => {});

    const typing = document.createElement("div");
    typing.className = "typing";
    typing.id = "typingIndicator";
    typing.innerHTML = `
  <span class="typing-text">SMSOTSAV is typing</span>
  <div class="dots">
    <span></span><span></span><span></span>
  </div>
  `;
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
  }

  /* START CHAT */
  function startChat() {
    chatBody.innerHTML = "";
    step = 0;

    bot("Hello 👋 Welcome to SMSOTSAV 2026");
    setTimeout(() => {
      bot("May I know your name?");
      enableInput();
    }, 600);
  }

  /* INPUT ENABLE */
  function enableInput() {
    const inputBox = document.querySelector(".chatbot-footer input");
    const sendBtn = document.querySelector(".chatbot-footer button");

    inputBox.disabled = false;
    sendBtn.disabled = false;

    sendBtn.onclick = () => handleInput(inputBox);
    inputBox.onkeypress = (e) => {
      if (e.key === "Enter") handleInput(inputBox);
    };
  }

  function disableInput() {
    document.querySelector(".chatbot-footer input").disabled = true;
    document.querySelector(".chatbot-footer button").disabled = true;
  }

  /* HANDLE USER INPUT */
  function handleInput(inputBox) {
    const value = inputBox.value.trim();
    if (!value) return;

    user(value);
    inputBox.value = "";

    if (step === 0) {
      userData.name = value;
      bot(`Nice to meet you, ${userData.name} 😊`);
      bot("Which college are you from?");
      step = 1;
    }
    else if (step === 1) {
      userData.college = value;
      bot("Got it 👍 Which district are you from?");
      step = 2;
    }
    else if (step === 2) {
      userData.district = value;
      bot("Perfect! Now tell me, which program you want to know more 👇");
      askProgram();
      step = 3;
      disableInput();
    }
  }

  /* PROGRAM OPTIONS */
  function askProgram() {
    bot(`
      <button onclick="selectCategory('Sports')">Sports</button>
      <button onclick="selectCategory('Cultural')">Cultural</button>
      <button onclick="selectCategory('Technical')">Technical</button>
      <button onclick="selectStarNight()">Star Night</button>
    `);
  }

  /* GLOBAL FUNCTIONS */
  window.selectCategory = function(category) {
    bot(`📌 ${category} Events:`);

    eventData[category].forEach(event => {
      bot(`
        <b>${event.name}</b><br>
        Price: ${event.price}<br>
        <a href="${event.form}" target="_blank">Register Now</a><br><br>
      `);
    });

    bot("Want to explore another program?");
    askProgram();
  };

  window.selectStarNight = function() {
    bot("🔥 STAR NIGHT 🔥");
    bot("Featuring PARMISH VERMA");
    bot("Tickets available in Explore → Star Night section.");
    askProgram();
  };
}
