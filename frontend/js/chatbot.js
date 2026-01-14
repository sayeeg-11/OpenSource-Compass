document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatBtn = document.createElement('button');
    chatBtn.className = 'chat-widget-btn';
    chatBtn.innerHTML = '💬';
    chatBtn.title = 'Need Help?';

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <span>OpenSource Guide</span>
            <button class="close-btn">&times;</button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot">
                Hello! I'm here to help you with your open source journey.
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="Type a message...">
            <button id="sendBtn">➤</button>
        </div>
    `;

    document.body.appendChild(chatBtn);
    document.body.appendChild(chatWindow);

    const closeBtn = chatWindow.querySelector('.close-btn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');

    let intents = [];

    // Load chatbot data
    fetch('../data/chatbot_data.json')
        .then(res => res.json())
        .then(data => intents = data.intents)
        .catch(() => {
            intents = [{
                tag: "fallback",
                patterns: [],
                responses: ["I'm having trouble responding right now."]
            }];
        });

    // Toggle chat
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatBtn.style.display = 'none';
        chatInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatBtn.style.display = 'flex';
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 400);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function normalize(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, '');
    }

    function getBotResponse(input) {
        const userText = normalize(input);

        let bestMatch = null;
        let highestScore = 0;

        for (const intent of intents) {
            let score = 0;

            for (const pattern of intent.patterns) {
                const p = normalize(pattern);
                if (userText.includes(p)) score += 2;
                else if (p.split(' ').some(word => userText.includes(word))) score += 1;
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = intent;
            }
        }

        if (bestMatch>0 && highestScore > 0) {
            const responses = bestMatch.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }

        const fallback = intents.find(i => i.tag === 'unknown');
        return fallback
            ? fallback.responses[Math.floor(Math.random() * fallback.responses.length)]
            : "I'm not sure about that. Try asking about Git or open source.";
    }
});
