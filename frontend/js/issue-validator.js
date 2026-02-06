document.addEventListener('DOMContentLoaded', () => {
    const issueForm = document.getElementById('issueValidatorForm');
    const resultSection = document.getElementById('issueResultSection');
    const resultContent = document.getElementById('issueResultContent');
    const submitBtn = document.getElementById('issueSubmitBtn');

    if (!issueForm) return;

    issueForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const repoLink = document.getElementById('issueRepo').value.trim();
        const title = document.getElementById('issueTitle').value.trim();
        const description = document.getElementById('issueDescription').value.trim();

        if (!repoLink || !title || !description) {
            alert("Please fill in all fields.");
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        resultSection.classList.remove('active');
        resultContent.innerHTML = '';

        try {
            const response = await fetch('http://localhost:5000/api/issue/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    repoLink,
                    title,
                    description
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to validate issue');
            }

            const data = await response.json();
            displayResult(data);

        } catch (error) {
            console.error('Error:', error);
            resultContent.innerHTML = `<div style="color: #ef4444;">Error: ${error.message}</div>`;
            resultSection.classList.add('active');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function displayResult(data) {
        let statusColor = '#e2e8f0';
        let statusIcon = '';
        let headlineText = data.headline || data.status;

        // Map status to colors/icons
        switch (data.status) {
            case 'Duplicate':
            case 'Potential Duplicate':
                statusColor = '#ef4444'; // Red
                statusIcon = '⚠️';
                break;
            case 'Unique':
            case 'Good':
                statusColor = '#22c55e'; // Green
                statusIcon = '✅';
                break;
            case 'Needs Improvement':
                statusColor = '#f59e0b'; // Orange
                statusIcon = '🔧';
                break;
            default:
                statusColor = '#94a3b8'; // Grey
                statusIcon = 'ℹ️';
        }

        let html = `
            <div style="margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: ${statusColor}; margin: 0; font-family: 'Playfair Display', serif; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span>${statusIcon}</span> ${headlineText}
                </h3>
            </div>
        `;

        // 1. Uniqueness Feedback (Primary)
        if (data.uniqueness_feedback) {
            html += `
                <div style="margin-bottom: 1.2rem;">
                    <h5 style="color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem; margin-bottom: 0.5rem;">Uniqueness Check</h5>
                    <p style="margin: 0; color: #e2e8f0; line-height: 1.5; font-size: 0.95rem; background: rgba(15, 23, 42, 0.4); padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                        ${data.uniqueness_feedback}
                    </p>
                </div>
            `;
        }

        // 2. Related Issues List
        if (data.related_issues && data.related_issues.length > 0) {
            const repoUrl = document.getElementById('issueRepo').value.trim();
            html += `
                <div style="margin-bottom: 1.2rem;">
                     <h5 style="color: #d4af37; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem; margin-bottom: 0.5rem;">Related Issues</h5>
                     <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                        ${data.related_issues.map(issue => `
                            <div style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                                        <a href="${repoUrl}/issues/${issue.number}" target="_blank" style="color: #60a5fa; font-weight: 600; text-decoration: none; font-size: 0.9rem;">#${issue.number}</a>
                                        <span style="font-size: 0.7rem; padding: 1px 6px; border-radius: 100px; background: ${issue.status === 'open' ? '#22c55e' : '#a855f7'}; color: white;">${issue.status}</span>
                                        <span style="font-size: 0.75rem; color: #94a3b8;">${issue.date}</span>
                                    </div>
                                    <div style="color: #e2e8f0; font-size: 0.9rem; line-height: 1.3;">${issue.title}</div>
                                </div>
                                <div style="font-size: 0.75rem; color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 2px 6px; border-radius: 4px; white-space: nowrap; margin-left: 0.5rem;">
                                    ${issue.relevance || 'Related'}
                                </div>
                            </div>
                        `).join('')}
                     </div>
                </div>
            `;
        }

        // 3. Project Context Feedback
        if (data.project_context_feedback || data.feedback) {
            html += `
                <div style="margin-bottom: 1.2rem;">
                    <h5 style="color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem; margin-bottom: 0.5rem;">Code Context</h5>
                    <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem; line-height: 1.4;">
                        ${data.project_context_feedback || data.feedback}
                    </p>
                </div>
            `;
        }

        resultContent.innerHTML = html;
        resultSection.classList.add('active');
    }
});
