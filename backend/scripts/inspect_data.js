import axios from "axios";

const inspect = async () => {
    console.log("Inspecting GSoC Data...");
    try {
        const res = await axios.get("https://summerofcode.withgoogle.com/api/program/2024/organizations/");
        // entry 0
        console.log("GSoC Sample:", JSON.stringify(res.data[0], null, 2));
    } catch (e) { console.log(e.message); }

    console.log("Inspecting SWoC summary.js...");
    try {
        const res = await axios.get("https://beta.swoc.in/leaderboard/summary.js");
        console.log("SWoC Content:", res.data.substring(0, 500));
    } catch (e) { console.log(e.message); }

    // Try one more guess for SWoC project list directly if leaderboard is just stats
    // Often it's in a main.[hash].js file, but that's hard to parse.
    // Instead maybe looking for a specific JSON file used by the frontend.
}

inspect();
