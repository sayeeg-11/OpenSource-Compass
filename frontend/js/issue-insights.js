/**
 * Issue Insights Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('issueInsightsForm');
    const submitBtn = document.getElementById('insightsSubmitBtn');
    const resultSection = document.getElementById('insightsResultSection');
    const resultContent = document.getElementById('insightsResultContent');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const issueUrl = document.getElementById('issueUrl').value.trim();

            if (!issueUrl) return;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            resultSection.classList.remove('active');

            try {
                const response = await fetch('http://localhost:5000/api/issue/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ issueUrl })
                });

                const data = await response.json();

                if (response.ok) {
                    resultContent.innerText = data.analysis;
                    resultSection.classList.add('active');
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    alert('Error: ' + (data.error || 'Failed to analyze issue.'));
                }
            } catch (err) {
                console.error(err);
                alert('Something went wrong. Please check if the backend is running.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }
});
