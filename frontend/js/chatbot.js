document.body.classList.add("has-chatbot");

document.addEventListener('DOMContentLoaded', () => {
    // Persistent chat storage key
const CHAT_STORAGE_KEY = "opensource_compass_chat_history";
    // DOM Elements - Create dynamically to be less intrusive
    document.body.classList.add("has-chatbot");

    const chatBtn = document.createElement('button');
chatBtn.className = 'chat-widget-btn';
chatBtn.innerHTML = '💬';
chatBtn.title = 'Open Chat';
chatBtn.dataset.state = "closed"; // NEW: track state

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
    <span>OpenSource Guide</span>
    <div class="chat-controls">
            <button id="clearChatBtn" title="Clear Chat">🗑️</button>

        <button class="minimize-btn" title="Minimize">—</button>
        <button class="close-btn" title="Close">&times;</button>
    </div>
</div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot">
                Hello! I'm here to help you with your open source journey. Ask me anything!
            </div>
            <div class="suggestions" id="chatSuggestions">
                <!-- Chips will be injected here -->
            </div>
        </div>
        <div class="typing-indicator" id="typingIndicator" style="display: none;">
            OpenSource Guide is typing...
        </div>

        <div class="chat-input-area">
            <textarea id="chatInput" rows="1" placeholder="Type a message..."></textarea>
            <button id="sendBtn">➤</button>
        </div>
    `;

    document.body.appendChild(chatBtn);
    document.body.appendChild(chatWindow);

    const closeBtn = chatWindow.querySelector('.close-btn');
const minimizeBtn = chatWindow.querySelector('.minimize-btn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const suggestionsContainer = document.getElementById("chatSuggestions");
    const clearChatBtn = document.getElementById("clearChatBtn");

clearChatBtn.addEventListener("click", () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    messagesContainer.innerHTML = `
        <div class="message bot">
            Hello! I'm here to help you with your open source journey. Ask me anything!
        </div>
        <div class="suggestions" id="chatSuggestions"></div>
    `;
    renderSuggestions();
});


    let intents = [];

    // Save chat messages to localStorage
function saveChatHistory() {
    const messages = [];
    const allMessages = messagesContainer.querySelectorAll('.message');

    allMessages.forEach(msg => {
        const text = msg.querySelector('.message-text')?.innerText || "";
        const sender = msg.classList.contains('user') ? 'user' : 'bot';
        messages.push({ text, sender });
    });

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}
    const suggestions = [
        "Know about Open Source",
        "Beginner Guide",
        "Git Push Command",
        "How to Raise a PR",
        "Contribution Guide"
    ];

    function renderSuggestions() {
        suggestionsContainer.innerHTML = "";
        suggestions.forEach(text => {
            const chip = document.createElement("button");
            chip.className = "suggestion-chip";
            chip.textContent = text;

            chip.addEventListener("click", () => {
                chatInput.value = text;
                sendMessage();
                suggestionsContainer.style.display = "none"; // hide after click
            });

            suggestionsContainer.appendChild(chip);
        });
    }

    renderSuggestions();

    // Restore chat history on page load
function restoreChatHistory() {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return;

    const messages = JSON.parse(stored);

    // Clear default welcome message before restoring
    messagesContainer.innerHTML = "";

    messages.forEach(msg => {
        addMessage(msg.text, msg.sender);
    });

    suggestionsContainer.style.display = "none";
}

restoreChatHistory();
    
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
    // OPEN CHAT (from bubble or minimized bar)
chatBtn.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatBtn.style.display = 'none';
    chatBtn.dataset.state = "closed"; // reset state
    chatBtn.innerHTML = '💬'; // reset icon
    chatBtn.classList.remove('minimized-bar');
    chatInput.focus();
});

// CLOSE CHAT (full dismiss - circular icon)
closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatBtn.style.display = 'flex';
    chatBtn.dataset.state = "closed";
    chatBtn.innerHTML = '💬'; // normal bubble
    chatBtn.classList.remove('minimized-bar');
});

// MINIMIZE CHAT (rectangular bar)
minimizeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatBtn.style.display = 'flex';
    chatBtn.dataset.state = "minimized";
    chatBtn.innerHTML = 'OpenSource Guide (Minimized)';
    chatBtn.classList.add('minimized-bar');
});

    // Send Message Logic
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user');
        chatInput.value = '';
        chatInput.style.height = "auto";

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
    // Auto resize textarea
    chatInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    // Enter to send | Shift+Enter for new line
    chatInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function parseMarkdown(text) {
    // IMPORTANT WORDS to highlight automatically
    const importantWords = [
        "open source",
        "OpenSource Guide",
        "documentation",
        "programs",
        "guides",
        "project",
        "maintainers",
        "community"
    ];

    // Escape HTML to prevent injection
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks ```code```
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **text** (manual markdown)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Links [text](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Bullet points
    text = text.replace(/^- (.*)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // 🔥 Auto highlight important keywords in bold
    importantWords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        text = text.replace(regex, '<strong>$1</strong>');
    });

    // Preserve line breaks
    text = text.replace(/\n/g, "<br>");

    return text;
}



    function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;

    // Message text
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.innerHTML = parseMarkdown(text);

    // Timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = getCurrentTime();

    msgDiv.appendChild(messageText);
    msgDiv.appendChild(timestamp);

    // ⭐ ADD RATING ONLY FOR BOT MESSAGES
    if (sender === 'bot') {
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'message-rating';

        const thumbsUp = document.createElement('span');
        thumbsUp.className = 'thumb-btn';
        thumbsUp.innerHTML = '👍';

        const thumbsDown = document.createElement('span');
        thumbsDown.className = 'thumb-btn';
        thumbsDown.innerHTML = '👎';

        // Allow only one selection
        thumbsUp.addEventListener('click', () => {
            thumbsUp.classList.add('selected');
            thumbsDown.classList.remove('selected');
        });

        thumbsDown.addEventListener('click', () => {
            thumbsDown.classList.add('selected');
            thumbsUp.classList.remove('selected');
        });

        ratingDiv.appendChild(thumbsUp);
        ratingDiv.appendChild(thumbsDown);
        msgDiv.appendChild(ratingDiv);
    }

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    saveChatHistory();
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
