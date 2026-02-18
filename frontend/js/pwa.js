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

                // Handle updates
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // New content is available, skipWaiting() in sw.js will trigger controllerchange
                                console.log('New content available, refreshing...');
                            } else {
                                // Content is cached for offline use
                                console.log('Content is cached for offline use.');
                            }
                        }
                    };
                };
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });

    // Reload the page when the new service worker takes over
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
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
