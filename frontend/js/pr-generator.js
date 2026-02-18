/**
 * PR Generator Frontend Logic
 * Supports both Modal Mode (Legacy) and Page Mode (New DevTools).
 */

document.addEventListener('DOMContentLoaded', () => {
    const existingForm = document.getElementById('prGeneratorForm');

    if (existingForm) {
        // We are on the DevTools page where the form exists statically
        setupFormLogic(existingForm);
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
                projectRequirements
            }),
        });

        const data = await response.json();

        if (data.prDescription) {
            previewArea.innerText = data.prDescription;
            previewSection.classList.add('active');
            // Scroll to preview
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('Error: ' + (data.error || 'Failed to generate PR.'));
        }
    } catch (error) {
        console.error('PR Generation Error:', error);
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
