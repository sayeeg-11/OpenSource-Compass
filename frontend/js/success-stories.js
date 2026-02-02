// Success Stories Page JavaScript

// Sample stories data (in production, this would come from backend)
const storiesData = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "GSoC Contributor → Maintainer",
        story: "Started with fixing typos during SWOC. Six months later, I was accepted into Google Summer of Code and now I'm a core maintainer of the project!",
        prs: 150,
        year: 2024,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        badge: "trophy",
        likes: 45,
        comments: []
    },
    {
        id: 2,
        name: "Raj Patel",
        role: "First-time Contributor → Outreachy Intern",
        story: "OpenSource Compass gave me the confidence to make my first PR. Now I'm a paid Outreachy intern working on projects I love!",
        prs: 80,
        year: 2025,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
        badge: "star",
        likes: 38,
        comments: []
    },
    {
        id: 3,
        name: "Maria Garcia",
        role: "Student → Full-time Developer",
        story: "My open source contributions through GSSoC landed me my dream job! Employers love seeing real-world collaboration skills.",
        prs: 200,
        year: 2023,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        badge: "rocket",
        likes: 52,
        comments: []
    },
    {
        id: 4,
        name: "Alex Kim",
        role: "Hacktoberfest Winner → Tech Lead",
        story: "Started during Hacktoberfest with documentation fixes. Two years later, I'm leading a team of 15 developers at a startup!",
        prs: 300,
        year: 2022,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        badge: "fire",
        likes: 67,
        comments: []
    },
    {
        id: 5,
        name: "Priya Sharma",
        role: "Beginner → MLH Fellow",
        story: "Never coded before 2023. OpenSource Compass taught me everything. Now I'm an MLH Fellow working on amazing projects!",
        prs: 95,
        year: 2024,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        badge: "star",
        likes: 41,
        comments: []
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Career Switcher → Open Source Advocate",
        story: "Left my corporate job to pursue open source. Best decision ever! Now I mentor others and contribute full-time.",
        prs: 180,
        year: 2023,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        badge: "trophy",
        likes: 55,
        comments: []
    }
];

// Get badge icon based on type
function getBadgeIcon(badgeType) {
    const icons = {
        trophy: 'fa-trophy',
        star: 'fa-star',
        rocket: 'fa-rocket',
        fire: 'fa-fire'
    };
    return icons[badgeType] || 'fa-star';
}

// Render stories
function renderStories() {
    const container = document.getElementById('storiesContainer');

    container.innerHTML = storiesData.map(story => `
    <div class="story-card-full fade-in">
      <div class="story-header">
        <div class="story-avatar">
          <img src="${story.avatar}" alt="${story.name}" />
          <div class="story-badge">
            <i class="fas ${getBadgeIcon(story.badge)}"></i>
          </div>
        </div>
        <div class="story-meta">
          <h4>${story.name}</h4>
          <p class="story-role">${story.role}</p>
        </div>
      </div>
      <p class="story-text">"${story.story}"</p>
      <div class="story-stats">
        <div class="story-stat">
          <i class="fas fa-code-branch"></i>
          <span>${story.prs}+ PRs</span>
        </div>
        <div class="story-stat">
          <i class="fas fa-calendar"></i>
          <span>${story.year}</span>
        </div>
      </div>
      <div class="story-actions">
        <button class="story-action-btn" onclick="toggleLike(${story.id})">
          <i class="fas fa-heart"></i>
          <span id="likes-${story.id}">${story.likes}</span>
        </button>
        <button class="story-action-btn" onclick="openCommentModal(${story.id})">
          <i class="fas fa-comment"></i>
          <span>${story.comments.length} Comments</span>
        </button>
      </div>
    </div>
  `).join('');

    // Trigger fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Toggle like
function toggleLike(storyId) {
    const story = storiesData.find(s => s.id === storyId);
    const btn = event.currentTarget;
    const likesSpan = document.getElementById(`likes-${storyId}`);

    if (btn.classList.contains('liked')) {
        story.likes--;
        btn.classList.remove('liked');
    } else {
        story.likes++;
        btn.classList.add('liked');
    }

    likesSpan.textContent = story.likes;
}

// Submit Story Modal
function openSubmitModal() {
    const modal = document.getElementById('submitModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSubmitModal() {
    const modal = document.getElementById('submitModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('submitStoryForm').reset();
}

// Comment Modal
let currentStoryId = null;

function openCommentModal(storyId) {
    currentStoryId = storyId;
    const modal = document.getElementById('commentModal');
    const story = storiesData.find(s => s.id === storyId);

    renderComments(story.comments);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCommentModal() {
    const modal = document.getElementById('commentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentStoryId = null;
}

function renderComments(comments) {
    const commentsList = document.getElementById('commentsList');

    if (comments.length === 0) {
        commentsList.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <i class="fas fa-comments" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    `;
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-avatar">${comment.author.charAt(0).toUpperCase()}</div>
        <div class="comment-meta">
          <div class="comment-author">${comment.author}</div>
          <div class="comment-time">${comment.time}</div>
        </div>
      </div>
      <div class="comment-text">${comment.text}</div>
    </div>
  `).join('');
}

// Form Submissions
document.addEventListener('DOMContentLoaded', () => {
    renderStories();

    // Character counter for story textarea
    const storyTextarea = document.getElementById('storyText');
    const charCount = document.querySelector('.char-count');

    if (storyTextarea && charCount) {
        storyTextarea.addEventListener('input', (e) => {
            const count = e.target.value.length;
            charCount.textContent = `${count}/300`;

            if (count > 250) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });
    }

    // Submit story form
    const submitForm = document.getElementById('submitStoryForm');
    if (submitForm) {
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(submitForm);
            const newStory = {
                id: storiesData.length + 1,
                name: formData.get('name'),
                role: formData.get('role'),
                story: formData.get('story'),
                prs: parseInt(formData.get('prs')) || 0,
                year: parseInt(formData.get('year')) || new Date().getFullYear(),
                avatar: formData.get('avatar') || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.get('name') || '')}`,
                badge: 'star',
                likes: 0,
                comments: []
            };

            // In production, this would be sent to backend
            storiesData.unshift(newStory);
            renderStories();
            closeSubmitModal();

            // Show success message
            showNotification('Success! Your story has been submitted and will be reviewed soon.');
        });
    }

    // Comment form
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const commentText = document.getElementById('commentText').value;
            const story = storiesData.find(s => s.id === currentStoryId);

            if (story && commentText.trim()) {
                const newComment = {
                    author: 'Anonymous User', // In production, get from logged-in user
                    text: commentText,
                    time: 'Just now'
                };

                story.comments.push(newComment);
                renderComments(story.comments);

                // Update comment count in story card
                renderStories();

                // Clear form
                document.getElementById('commentText').value = '';

                showNotification('Comment posted successfully!');
            }
        });
    }

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal.id === 'submitModal') {
                    closeSubmitModal();
                } else if (modal.id === 'commentModal') {
                    closeCommentModal();
                }
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'grid';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
    color: var(--deep-navy);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
    font-family: "Inter", -apple-system, sans-serif;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
