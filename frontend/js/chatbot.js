// chatbot.js
// Lightweight rule-based chatbot (non-intrusive, dynamic injection)

document.addEventListener('DOMContentLoaded', initChatbot);

function initChatbot() {
  const chatBtn = createChatButton();
  const chatWindow = createChatWindow();

  document.body.append(chatBtn, chatWindow);

  const closeBtn = chatWindow.querySelector('.close-btn');
  const sendBtn = chatWindow.querySelector('#sendBtn');
  const chatInput = chatWindow.querySelector('#chatInput');
  const messages = chatWindow.querySelector('#chatMessages');

  let intents = [];

  /* =========================
     LOAD CHAT DATA
  ========================= */
  fetch('../data/chatbot_data.json')
    .then(res => res.json())
    .then(data => (intents = data.intents || []))
    .catch(() => {
      // Minimal fallback
      intents = [
        {
          tag: 'default',
          patterns: ['hi', 'hello'],
          responses: ['Hello! How can I help you with open source today?']
        }
      ];
    });

  /* =========================
     TOGGLE CHAT
  ========================= */
  chatBtn.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatBtn.style.display = 'none';
    chatInput.focus();
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatBtn.style.display = 'flex';
  });

  /* =========================
     SEND MESSAGE
  ========================= */
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
      addMessage(getBotResponse(text), 'bot');
    }, 400);
  }

  /* =========================
     MESSAGE HELPERS
  ========================= */
  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function getBotResponse(input) {
    const msg = input.toLowerCase();

    for (const intent of intents) {
      if (intent.patterns.some(p => msg.includes(p.toLowerCase()))) {
        return random(intent.responses);
      }
    }

    const fallback = intents.find(i => i.tag === 'unknown' || i.tag === 'default');
    return fallback ? random(fallback.responses) : 'Can you rephrase that?';
  }
}

/* =========================
   UI CREATORS
========================= */
function createChatButton() {
  const btn = document.createElement('button');
  btn.className = 'chat-widget-btn';
  btn.title = 'Need Help?';
  btn.textContent = '💬';
  return btn;
}

function createChatWindow() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-window';
  wrapper.innerHTML = `
    <div class="chat-header">
      <span>OpenSource Guide</span>
      <button class="close-btn">&times;</button>
    </div>
    <div class="chat-messages" id="chatMessages">
      <div class="message bot">
        Hello! I’m here to help you with open source 🚀
      </div>
    </div>
    <div class="chat-input-area">
      <input type="text" id="chatInput" placeholder="Type a message..." />
      <button id="sendBtn">➤</button>
    </div>
  `;
  return wrapper;
}

/* =========================
   UTILS
========================= */
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
