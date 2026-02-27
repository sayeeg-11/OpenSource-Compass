/**
 * PR Generator Frontend Logic
 * Supports both Modal Mode (Legacy) and Page Mode (New DevTools).
 * Includes AI Assist Controls for fine-grained PR generation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const existingForm = document.getElementById('prGeneratorForm');

    if (existingForm) {
        // We are on the DevTools page where the form exists statically
        setupFormLogic(existingForm);
        setupAIAssistControls();
    } else {
        // We are on another page (Home, Contribute, etc.) - Show FAB to link to DevTools
        injectLinkFAB();
    }
});

function injectLinkFAB() {
    // Premium Floating Action Button for DevTools
    const fabHtml = `
        <button id="prGenFab" class="pr-gen-fab" aria-label="Open Developer Tools">
            <i class="fas fa-terminal"></i>
        </button>
    `;
    document.body.insertAdjacentHTML('beforeend', fabHtml);

    const fab = document.getElementById('prGenFab');
    fab.addEventListener('click', () => {
        const path = window.location.pathname;
        let targetUrl = 'frontend/pages/devtools.html';

        if (path.includes('/pages/')) {
            targetUrl = './devtools.html';
        } else if (path.includes('index.html') || path.endsWith('/')) {
            targetUrl = 'frontend/pages/devtools.html';
        }

        window.location.href = targetUrl;
    });
}

// ==========================================
// AI Assist State
// ==========================================
const aiAssistState = {
    creativity: 50,
    strictness: 'best-practice',
    autoSummarize: true,
    autoDetectType: true,
    rewriteInput: false,
};

function getCreativityLabel(value) {
    if (value <= 20) return 'Low';
    if (value <= 40) return 'Medium-Low';
    if (value <= 60) return 'Medium';
    if (value <= 80) return 'Medium-High';
    return 'High';
}

// ==========================================
// AI Assist Controls Setup
// ==========================================
function setupAIAssistControls() {
    // Panel toggle
    const toggleBtn = document.getElementById('aiAssistToggleBtn');
    const panel = document.getElementById('aiAssistPanel');

    if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    // Creativity Slider
    const slider = document.getElementById('creativitySlider');
    const valueLabel = document.getElementById('creativityValue');

    if (slider && valueLabel) {
        const updateSlider = () => {
            const val = parseInt(slider.value);
            aiAssistState.creativity = val;
            valueLabel.textContent = getCreativityLabel(val);

            // Update slider track gradient
            const pct = val + '%';
            slider.style.background = `linear-gradient(90deg, #d4af37 0%, #f4d03f ${pct}, #334155 ${pct})`;
        };
        slider.addEventListener('input', updateSlider);
        updateSlider(); // Init
    }

    // Strictness Toggle
    const strictnessToggle = document.getElementById('strictnessToggle');
    if (strictnessToggle) {
        const btns = strictnessToggle.querySelectorAll('.ai-strictness-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                aiAssistState.strictness = btn.dataset.value;
            });
        });
    }

    // Smart Toggles
    const autoSummarize = document.getElementById('autoSummarizeToggle');
    const autoDetect = document.getElementById('autoDetectTypeToggle');
    const rewriteInput = document.getElementById('rewriteInputToggle');

    if (autoSummarize) autoSummarize.addEventListener('change', () => { aiAssistState.autoSummarize = autoSummarize.checked; });
    if (autoDetect) autoDetect.addEventListener('change', () => { aiAssistState.autoDetectType = autoDetect.checked; });
    if (rewriteInput) rewriteInput.addEventListener('change', () => { aiAssistState.rewriteInput = rewriteInput.checked; });

    // Per-field AI assist buttons
    const assistBtns = document.querySelectorAll('.ai-field-assist-btn');
    assistBtns.forEach(btn => {
        btn.addEventListener('click', () => handleFieldImprove(btn));
    });
}

// ==========================================
// Per-Field AI Improve
// ==========================================
async function handleFieldImprove(btn) {
    const targetId = btn.dataset.target;
    const field = document.getElementById(targetId);
    if (!field) return;

    const text = field.value.trim();
    if (!text) {
        showAIToast('Please enter some text first before improving.', 'warning');
        return;
    }

    // Visual feedback
    const parentGroup = btn.closest('.ai-field-group');
    btn.classList.add('improving');
    if (parentGroup) parentGroup.classList.add('ai-improving');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner"></i> Improving...';

    try {
        const response = await fetch('http://localhost:5000/api/pr/improve-section', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text,
                fieldName: targetId,
                creativity: aiAssistState.creativity,
                strictness: aiAssistState.strictness,
            }),
        });

        const data = await response.json();

        if (data.improvedText) {
            field.value = data.improvedText;
            // Trigger input event for any watchers
            field.dispatchEvent(new Event('input', { bubbles: true }));

            btn.innerHTML = '<i class="fas fa-check"></i> Improved!';
            btn.classList.add('success');
            showAIToast('Section improved successfully!', 'success');

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('success');
            }, 2500);
        } else {
            throw new Error(data.error || 'Failed to improve section.');
        }
    } catch (error) {
        console.error('AI Improve Error:', error);
        showAIToast(`AI improvement failed: ${error.message}`, 'error');
        btn.innerHTML = originalHTML;
    } finally {
        btn.classList.remove('improving');
        if (parentGroup) parentGroup.classList.remove('ai-improving');
    }
}

// ==========================================
// Toast Notification
// ==========================================
function showAIToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.querySelector('.ai-toast');
    if (existing) existing.remove();

    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
    };

    const toast = document.createElement('div');
    toast.className = 'ai-toast';
    toast.innerHTML = `<i class="fas ${iconMap[type] || iconMap.info}"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });
    });

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ==========================================
// Form Logic
// ==========================================
function setupFormLogic(form) {
    const submitBtn = document.getElementById('prSubmitBtn');
    const previewSection = document.getElementById('prPreviewSection');
    const previewArea = document.getElementById('prPreviewContent');
    const copyBtn = document.getElementById('prCopyBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handlePRGeneration(submitBtn, previewSection, previewArea);
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => copyToClipboard(previewArea, copyBtn));
    }
}

async function handlePRGeneration(submitBtn, previewSection, previewArea) {
    const prLink = document.getElementById('prLink')?.value || "";
    const problem = document.getElementById('prProblem').value;
    const changes = document.getElementById('prChanges').value;
    const testing = document.getElementById('prTesting').value;
    const limitations = document.getElementById('prLimitations').value;

    // Validation: Require either (problem + changes) OR a link
    if (!prLink && (!problem || !changes)) {
        alert("Please provide either an Issue/PR link or both Problem Statement and Changes.");
        return;
    }

    // Fetch project requirements
    let projectRequirements = "Follow standard professional open-source PR practices.";
    try {
        const configResp = await fetch('../data/pr_config.json');
        if (configResp.ok) {
            const config = await configResp.json();
            projectRequirements = config.requirements;
        }
    } catch (e) {
        console.warn('Could not load PR config, using defaults.');
    }

    // Visual feedback
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    previewSection.classList.remove('active');

    try {
        const response = await fetch('http://localhost:5000/api/pr/generate-pr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prLink,
                problem,
                changes,
                testing,
                limitations,
                projectRequirements,
                // AI Assist parameters
                aiAssist: {
                    creativity: aiAssistState.creativity,
                    strictness: aiAssistState.strictness,
                    autoSummarize: aiAssistState.autoSummarize,
                    autoDetectType: aiAssistState.autoDetectType,
                    rewriteInput: aiAssistState.rewriteInput,
                },
            }),
        });

        const data = await response.json();

        if (data.prDescription) {
            previewArea.innerText = data.prDescription;
            previewSection.classList.add('active');
            // Scroll to preview
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showAIToast('PR description generated successfully!', 'success');
        } else {
            alert('Error: ' + (data.error || 'Failed to generate PR.'));
        }
    } catch (error) {
        console.error('PR Generation Error:', error);
        alert(`Something went wrong: ${error.message}. Please check if the backend is running on port 5000.`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

function copyToClipboard(previewArea, copyBtn) {
    const text = previewArea.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('success');

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    }).catch(err => {
        console.error('Clipboard error:', err);
        alert('Failed to copy to clipboard.');
    });
}
