// js/search.js
const searchIndex = [
    // Program Data
    { title: "Google Summer of Code", type: "Program", url: "pages/Event/gsoc.html", keywords: "google gsoc advanced stipend" },
    { title: "GirlScript Summer of Code", type: "Program", url: "pages/Event/gssoc.html", keywords: "gssoc beginner girls student" },
    { title: "Hacktoberfest", type: "Program", url: "pages/Event/hacktober.html", keywords: "digitalocean october pr beginner" },
    { title: "Outreachy", type: "Program", url: "pages/Event/outreachy.html", keywords: "internship diversity remote paid" },
    { title: "LFX Mentorship", type: "Program", url: "pages/Event/linux.html", keywords: "linux foundation kernel cloud" },
    // Guide Data
    { title: "Git and GitHub Essentials", type: "Guide", url: "pages/Resources.html", keywords: "git github fork clone pr" },
    { title: "Open Source Licensing", type: "Guide", url: "pages/Resources.html", keywords: "license mit apache legal" }
];

function performSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    const filtered = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.keywords.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length > 0) {
        resultsContainer.innerHTML = filtered.map(item => `
            <div class="search-result-item" onclick="window.location.href='${item.url}'">
                <strong>${item.title}</strong>
                <span class="search-type-tag">${item.type}</span>
            </div>
        `).join('');
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div class="search-no-results">No matches found</div>';
    }
}