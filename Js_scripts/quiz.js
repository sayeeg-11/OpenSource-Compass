document.addEventListener('DOMContentLoaded', () => {
    const modulesContainer = document.getElementById('quiz-modules');
    const quizSection = document.getElementById('quiz-play-area');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const currentModuleTitle = document.getElementById('current-module-title');
    const progressText = document.getElementById('progress-text');
    const resultSection = document.getElementById('quiz-result');
    const finalScoreDisplay = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    const restartBtn = document.getElementById('restart-btn');

    // Dashboard Elements
    const totalXpDisplay = document.getElementById('total-xp');
    const globalProgressBar = document.getElementById('global-progress-bar');

    let currentModuleIndex = 0;
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Gamification State (Persist in localStorage ideally, here in-memory for demo)
    let userState = {
        xp: 0,
        unlockedLevel: 0 // 0-indexed, so Level 1 is unlocked initially
    };

    // Load Gamification State from LocalStorage
    if (localStorage.getItem('openSourceCompassState')) {
        userState = JSON.parse(localStorage.getItem('openSourceCompassState'));
        updateDashboard();
    }

    function updateDashboard() {
        totalXpDisplay.textContent = `${userState.xp} XP`;
        // Simple progress logic: 10 levels * 100 XP max = 1000 XP max
        let progressPercent = (userState.xp / (quizData.length * 100)) * 100;
        globalProgressBar.style.width = `${Math.min(progressPercent, 100)}%`;
    }

    function saveState() {
        localStorage.setItem('openSourceCompassState', JSON.stringify(userState));
        updateDashboard();
    }

    // Initialize Modules (Learning Path Nodes)
    function loadModules() {
        if (typeof quizData === 'undefined') return;

        modulesContainer.innerHTML = '';

        quizData.forEach((module, index) => {
            // Wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'level-node-wrapper';

            // Circle Node
            const node = document.createElement('div');
            const isUnlocked = index <= userState.unlockedLevel;

            node.className = `level-node ${isUnlocked ? 'unlocked' : 'locked'}`;

            if (isUnlocked) {
                node.textContent = index + 1;
                node.onclick = () => startQuiz(index);
            } else {
                node.innerHTML = '<span>🔒</span>'; // Lock Icon
            }

            // Info Card
            const card = document.createElement('div');
            card.className = 'level-card';
            card.innerHTML = `
                <h4>${module.title}</h4>
                <div class="level-xp">Reward: 100 XP</div>
                <div class="level-status">${isUnlocked ? 'Play Now' : 'Locked'}</div>
            `;

            if (isUnlocked) {
                card.onclick = () => startQuiz(index);
            }

            wrapper.appendChild(node);
            wrapper.appendChild(card);
            modulesContainer.appendChild(wrapper);
        });
    }

    function startQuiz(index) {
        currentModuleIndex = index;
        if (index > userState.unlockedLevel) return; // Prevent playing locked levels

        questions = quizData[index].questions;

        // Handle Empty Modules
        if (!questions || questions.length === 0) {
            alert("This module is coming soon!");
            return;
        }

        currentQuestionIndex = 0;
        score = 0;

        // UI Reset
        currentModuleTitle.textContent = quizData[index].title;
        quizSection.style.display = 'block';
        resultSection.style.display = 'none';

        // Scroll to quiz play area
        quizSection.scrollIntoView({ behavior: 'smooth' });

        showQuestion();
    }

    function showQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
        progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        optionsContainer.innerHTML = '';
        nextBtn.style.display = 'none';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(i, btn);
            optionsContainer.appendChild(btn);
            optionsContainer.appendChild(btn);
        });

        // Add Explanation Container (Hidden initially)
        const explanationDiv = document.createElement('div');
        explanationDiv.id = 'explanation-text';
        explanationDiv.style.marginTop = '15px';
        explanationDiv.style.padding = '10px';
        explanationDiv.style.backgroundColor = '#f0f8ff';
        explanationDiv.style.borderLeft = '4px solid #4D96FF';
        explanationDiv.style.display = 'none'; // Hidden
        explanationDiv.style.color = '#333';
        optionsContainer.appendChild(explanationDiv);
    }

    function checkAnswer(selectedIndex, btn) {
        const correctIndex = questions[currentQuestionIndex].correct;
        const options = document.querySelectorAll('.option-btn');

        options.forEach(opt => opt.disabled = true);

        if (selectedIndex === correctIndex) {
            btn.classList.add('correct');
            score++;
        } else {
            btn.classList.add('incorrect');
            options[correctIndex].classList.add('correct');
        }

        // Show Explanation
        const explanationDiv = document.getElementById('explanation-text');
        if (explanationDiv) {
            explanationDiv.textContent = questions[currentQuestionIndex].explanation || "No explanation available.";
            explanationDiv.style.display = 'block';
        }

        nextBtn.style.display = 'block';
    }

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    };

    function showResults() {
        quizSection.style.display = 'none';
        resultSection.style.display = 'block';
        finalScoreDisplay.textContent = `${score} / ${questions.length}`;

        const percentage = (score / questions.length) * 100;

        // Calculate XP Reward (10 XP per correct answer)
        const xpEarned = score * 10;

        if (percentage >= 50) {
            resultMessage.textContent = `Success! You earned ${xpEarned} XP.`;

            // Check if we haven't unlocked the next level yet
            if (currentModuleIndex === userState.unlockedLevel) {
                userState.unlockedLevel++;
            }
            // Add XP (simplified logic: accumulate total XP)
            userState.xp += xpEarned;
            saveState();

        } else {
            resultMessage.textContent = `You scored ${score}. Try again to earn XP and unlock the next level!`;
        }

        loadModules(); // Re-render to update locks/status
    }

    restartBtn.onclick = () => {
        resultSection.style.display = 'none';
        // Scroll back to top of section
        document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Initialize
    updateDashboard();
    loadModules();
});
