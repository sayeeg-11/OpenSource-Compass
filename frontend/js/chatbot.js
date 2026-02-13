document.body.classList.add("has-chatbot");

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Create dynamically to be less intrusive
    document.body.classList.add("has-chatbot");

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
        Hello! I'm here to help you with your open source journey. Ask me anything!
    </div>
</div>
<div class="typing-indicator" id="typingIndicator" style="display: none;">
    OpenSource Guide is typing...
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
    const typingIndicator = document.getElementById('typingIndicator');


    let intents = [];

    // Load data
    // Note: This path assumes index.html is in /pages/ and data is in /data/
    fetch('../data/chatbot_data.json')
        .then(response => response.json())
        .then(data => {
            intents = data.intents;
        })
        .catch(error => {
            console.error('Error loading chatbot data:', error);
            // Fallback if fetch fails
            intents = [
                {
                    tag: "greeting",
                    patterns: ["hi", "hello"],
                    responses: ["Hello! I'm having trouble connecting to my brain, but I'm here!"]
                }
            ];
        });

    // Toggle Chat
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatBtn.style.display = 'none';
        chatInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatBtn.style.display = 'flex'; // Use flex to center the icon
    });

    // Send Message Logic
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user');
        chatInput.value = '';

        // Process Bot Response
        // Simulate thinking time
        // Show typing indicator
typingIndicator.style.display = 'block';
messagesContainer.scrollTop = messagesContainer.scrollHeight;

// Simulate thinking time
setTimeout(() => {
    // Hide typing indicator before showing message
    typingIndicator.style.display = 'none';

    const response = getBotResponse(text);
    addMessage(response, 'bot');
}, 800);

    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

    function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;

    // Message text
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;

    // Timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = getCurrentTime();

    msgDiv.appendChild(messageText);
    msgDiv.appendChild(timestamp);

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


    function getBotResponse(input) {
        input = input.toLowerCase();

        for (const intent of intents) {
            for (const pattern of intent.patterns) {
                if (input.includes(pattern.toLowerCase())) {
                    const responses = intent.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }

        // Fallback
        const fallback = intents.find(i => i.tag === 'unknown') || intents.find(i => i.tag === 'default');
        if (fallback) {
            const responses = fallback.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }

        return "I'm not sure about that. Try asking about open source programs or guides.";
    }
});
