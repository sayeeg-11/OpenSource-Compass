// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        let swPath = './sw.js';
        const pathParts = window.location.pathname.split('/');
        const pagesIndex = pathParts.indexOf('pages');
        if (pagesIndex !== -1) {
            const depth = pathParts.length - pagesIndex - 1;
            let up = '';
            for (let i = 0; i < depth + 1; i++) up += '../';
            swPath = up + 'sw.js';
        }
        navigator.serviceWorker.register(swPath)
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const showButton = () => {
        const btn = document.getElementById('pwa-install-btn');
        if (btn) {
            btn.style.display = 'inline-flex';
            btn.addEventListener('click', () => {
                btn.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                });
            });
        } else {
            setTimeout(showButton, 500);
        }
    };
    showButton();
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    console.log('PWA was installed');
});
