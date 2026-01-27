import axios from "axios";

const probe = async () => {
    console.log("Probing GSoC...");
    try {
        const res = await axios.get("https://summerofcode.withgoogle.com/api/program/2024/organizations/");
        console.log("GSoC 2024 Success:", res.data.length || "Data found");
    } catch (e) {
        console.log("GSoC 2024 Failed:", e.message);
    }

    try {
        // Try looking for a common NextJS/Generic approach or just guessing
        const res = await axios.get("https://summerofcode.withgoogle.com/api/program/current/organizations/");
        console.log("GSoC Current Success:", res.data.length || "Data found");
    } catch (e) {
        console.log("GSoC Current Failed:", e.message);
    }

    console.log("Probing SWoC...");
    try {
        // Checking network tab of beta.swoc.in usually reveals /api/v1/projects or similar
        // Let's try some common ones
        const urls = [
            "https://beta.swoc.in/api/projects",
            "https://beta.swoc.in/api/project/all",
            "https://swoc-backend.vercel.app/api/project",
            // often small programs host backend separately.
            // But looking at the page source index.html: <script src="/leaderboard/summary.js">
            // suggests it might just be loading static JSONs or local API.
            "https://beta.swoc.in/leaderboard/summary.js"
        ];

        for (const url of urls) {
            try {
                const res = await axios.get(url);
                console.log(`SWoC Probe ${url}: Success (${res.status})`);
                if (Array.isArray(res.data)) console.log("Is Array of length:", res.data.length);
            } catch (e) {
                console.log(`SWoC Probe ${url}: Failed (${e.message})`);
            }
        }

    } catch (e) {
        console.log("SWoC Main Failed:", e.message);
    }
}

probe();
