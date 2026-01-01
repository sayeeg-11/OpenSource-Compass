document.addEventListener('DOMContentLoaded', () => {
    console.log('OpenSource Compass Loaded');

    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        // Simple check to see if href matches current path end
        if (link.href.includes(currentPath.split('/').pop()) && currentPath !== '/' && link.getAttribute('href') !== '#') {
            link.style.color = 'var(--secondary-blue)';
        }
    });

    // Copy to Clipboard Functionality
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        // Insert wrapper before block
        block.parentNode.insertBefore(wrapper, block);
        
        // Move block into wrapper
        wrapper.appendChild(block);

        // Create button
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copy';

        // Add click event
        button.addEventListener('click', () => {
            const textToCopy = block.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.innerText = 'Copied!';
                setTimeout(() => {
                    button.innerText = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });

        wrapper.appendChild(button);
    });
});
