# Contributing to OpenSource-Compass

## 🚀 Quick Start (First-Time Contributors)

Welcome! If you are new to this project, follow these steps to get started quickly:

1.  **Fork** the repository to your GitHub account.
2.  **Clone** your fork to your local machine.
3.  **Open** the project folder in VS Code.
4.  **Launch** `index.html` using the **Live Server** extension.
5.  **Pick an issue** that has been assigned to you.
6.  **Create a branch** (e.g., `feature/add-program-search`).
7.  **Make changes** and verify them locally.
8.  **Push & PR:** Push your branch and open a Pull Request with screenshots.

> [!TIP]
> **Estimated setup time:** 10 minutes. Grab a coffee ☕ and let's get started!

---

Thank you for your interest in contributing to **OpenSource-Compass** 🎯

This project has evolved from a simple single-page site into a **modular, component-based architecture**. This guide will help you understand the workflow so you can contribute confidently.

---

## 🧱 Project Architecture

The project uses a **modular frontend architecture** to ensure scalability.

### 🔹 JavaScript Components

Reusable UI elements (like the **Navbar** and **Footer**) are defined in:
`frontend/js/components.js`

These components are dynamically injected into pages to avoid code duplication.

### ✅ How to Use Components in a New Page

1.  **Add Placeholders:** Create a placeholder element in your HTML:
    ```html
    <div id="navbar"></div>
    <div id="footer"></div>
    ```

2.  **Include Scripts:** Add scripts **at the end of the body** in this specific order:
    ```html
    <script src="frontend/js/components.js"></script>
    
    <script src="frontend/js/your-page-script.js"></script>
    ```

> [!IMPORTANT]
> **Always load `frontend/js/components.js` before your page-specific scripts.**
> This ensures shared components are fully loaded and ready to use.

---

## 🖥️ Local Development

Because this project uses **async JavaScript** (fetch, dynamic rendering), it must be run via a local server.

### 🟢 Option 1: Frontend-Only Setup (Recommended)
**Best for:** UI changes, documentation, adding programs/guides.
_No backend installation required!_

> [!IMPORTANT]
> **Note for Beginners:**
> **Backend setup is optional.** Most first-time contributions (SWOC, etc.) focus on the frontend or documentation. You likely do **not** need to set up the full backend environment unless your issue explicitly requires it.

1.  **Install Live Server** extension in VS Code.
2.  Right-click `index.html` → Select **Open with Live Server**.
3.  Access the site at `http://127.0.0.1:5500`.

> [!WARNING]
> **Why is this required?**
> Opening HTML files directly (`file://`) **will break** the **Contributor Wall**, **Program Hub**, and other features that fetch JSON data. Always use a local server!

### 🟠 Option 2: Full Stack Setup (Frontend + Backend)
**Best for:** Working on authentication, API endpoints, or database features.

1.  **Clone & Enter:**
    ```bash
    git clone https://github.com/TarunyaProgrammer/OpenSource-Compass.git
    cd OpenSource-Compass
    ```

2.  **Setup Backend (Terminal 1):**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend/` folder:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/opensource_compass
    JWT_SECRET=your_super_secret_key_123
    ```
    Run the server:
    ```bash
    npm start
    ```

3.  **Setup Frontend (Terminal 2):**
    Open `index.html` via Live Server as described in Option 1.

---

## 📊 Data Standards

Dynamic sections like the **Program Hub** rely on structured JSON data.

### 📁 programs.json Schema

If you are editing `programs.json`, ensure your entry matches this schema:

```json
{
  "id": "unique-program-id",
  "name": "Program Name",
  "description": "Short description (1-2 lines)",
  "organization": "Hosting Organization",
  "tags": ["opensource", "internship", "remote"],
  "url": "[https://example.com](https://example.com)",
  "deadline": "YYYY-MM-DD"
}
```

### 🚨 Rules

* `id` must be **unique** (used internally for search & filtering)
* `tags` must be an **array of lowercase strings**
* Do NOT remove or rename existing keys
* Keep descriptions concise (1–2 lines)

> [!CAUTION]
> **Invalid entries will be rejected.**
> Double-check your JSON syntax to ensure it doesn't break the search logic.

---

## 🚦 WORKFLOW

### 1️⃣ Fork & Clone

* Fork the repository
* Clone your fork locally

```bash
git clone https://github.com/your-username/OpenSource-Compass.git
```

### 2️⃣ Branching

Create a descriptive feature branch:

```bash
git checkout -b feature/your-feature-name
```

### 3️⃣ Environment Setup

* Copy `.env.example` → `.env`
* Update values if required before development

### 4️⃣ Pull Request

* Push your branch to your fork
* Open a PR **against the `main` branch**
* Use the **required PR template**

---

## 📝 COMMIT MESSAGES

We follow the **type(scope): subject** convention:

**Examples:**
* `feat: add program hub search filter`
* `fix: resolve navbar loading issue`
* `docs: update contributing guidelines`
* `refactor: simplify component injection logic`

### Allowed Types

| Type | Description |
| :--- | :--- |
| **feat** | A new feature |
| **fix** | A bug fix |
| **docs** | Documentation only changes |
| **refactor** | Code changes without feature/bug impact |

> [!NOTE]
> Commits not following this format may be requested to be squashed or rewritten.

---

## 🚫 COMMUNITY GUIDELINES & MORALE

We are building an inclusive, positive open-source space.

### ❌ Strictly Prohibited

* Negative or discouraging comments on issues or PRs
* Passive-aggressive or demotivating language

### ✅ Respect Assignment Rules

* Wait for an issue to be **officially assigned** before starting
* Unsolicited PRs for unassigned issues will be **closed without review**

> [!WARNING]
> Repeated violations may lead to warnings or bans from the community.

---

## 📸 VISUAL REQUIREMENTS (MANDATORY)

### ✅ For Pull Requests

You **MUST** include:
* Screenshots or GIFs of the implemented changes

### ✅ For Issues

You **MUST** include:
* Screenshots of the current state / problem area

> [!CAUTION]
> **No Visuals = No Review**
> To ensure clarity and faster reviews, submissions without visuals may be requested to update before review.

---

## ⏱️ TIME CONSTRAINTS & DISQUALIFICATION

### ⏳ Assignment Rules

* Work must begin **immediately after assignment**
* Maximum **3 issues per day** (more only after completion)

### 🕒 Deadlines

* Ideal completion: **30 minutes – 48 hours**
* Grace period: **72 hours**

> [!NOTE]
> If no progress is shown after 72 hours, the issue will be unassigned to give others a chance.

### 🚨 Disqualification Conditions

* ❌ PR fails build or breaks functionality
* ❌ Linting rules ignored
* ❌ Missing mandatory screenshots
* ❌ Duplicate PRs for already-assigned issues

### 💤 Stale PRs

* If requested changes are ignored for **24 hours**, the PR may be closed

---

## 🟢 Contribution Category

### **Beginner Friendly** 🟢

This contribution focuses on:
* Documentation clarity
* Technical writing
* Understanding project structure

> [!TIP]
> **Perfect for first-time open-source contributors! 🚀**
> We love helping new folks get started. Don't be afraid to ask questions!

---

Happy Contributing 💙
