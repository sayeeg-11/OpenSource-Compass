# Contributing to OpenSource-Compass

## 🚀 Quick Start (First-Time Contributors)

1. Fork the repository
2. Clone your fork locally
3. Open `index.html` using VS Code Live Server
4. Pick an issue that is assigned to you
5. Create a new feature branch
6. Make small, focused changes
7. Push your branch and open a Pull Request with screenshots

⏱️ Estimated time: 30–60 minutes

---


Thank you for your interest in contributing to **OpenSource-Compass** 🎯

This project has evolved from a simple single-page site into a **modular, component-based architecture** using JavaScript components and JSON-driven data. This guide will help you understand the new workflow and contribute confidently without breaking existing features.

---

## 🧱 Project Architecture

The project now follows a **modular frontend architecture** to improve scalability and maintainability.

### 🔹 JavaScript Components

* Reusable UI elements like **Navbar** and **Footer** are defined in:

  ```
  frontend/js/components.js
  ```
* These components are dynamically injected into pages using JavaScript to avoid duplication.

### ✅ How to Use Components in a New Page

1. Create a placeholder element in your HTML:

   ```html
   <div id="navbar"></div>
   <div id="footer"></div>
   ```

2. Include scripts **at the end of the body** in this order:

   ```html
   <script src="frontend/js/components.js"></script>
   <script src="frontend/js/your-page-script.js"></script>
   ```

⚠️ **Important:** Always load `components.js` before page-specific scripts to ensure shared components are available.

---

## 📊 Data Standards

Dynamic sections like the **Program Hub** and **Search** rely on structured JSON data.

### 📁 programs.json Schema

All programs must follow this schema exactly:

```json
{
  "id": "unique-program-id",
  "name": "Program Name",
  "description": "Short description of the program",
  "organization": "Hosting Organization",
  "tags": ["opensource", "internship", "remote"],
  "url": "https://example.com",
  "deadline": "YYYY-MM-DD"
}
```

### 🚨 Rules

* `id` must be **unique** (used internally for search & filtering)
* `tags` must be an **array of lowercase strings**
* Do NOT remove or rename existing keys
* Keep descriptions concise (1–2 lines)

Invalid entries may break the search logic and will be rejected.

---

## 🖥️ Local Development

Since the project uses **async JavaScript features** (fetch, dynamic rendering), it must be run via a local server.

> ⚠️ **Note:** Backend setup is optional for beginner contributors.
> Most first-time contributions should focus on frontend or documentation.


### ▶️ Recommended: VS Code Live Server

1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Access the site at `http://127.0.0.1:5500`

This is required to properly test:

* Contributor Wall
* Program Hub
* JSON fetch operations

❌ Opening HTML files directly (`file://`) will NOT work.

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

Examples:

* `feat: add program hub search filter`
* `fix: resolve navbar loading issue`
* `docs: update contributing guidelines`
* `refactor: simplify component injection logic`

### Allowed Types

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **refactor**: Code changes without feature/bug impact

Commits not following this format may be requested to be squashed or rewritten.

---

## 🚫 COMMUNITY GUIDELINES & MORALE

We are building an inclusive, positive open-source space.

### ❌ Strictly Prohibited

* Negative or discouraging comments on issues or PRs
* Passive-aggressive or demotivating language

### ✅ Respect Assignment Rules

* Wait for an issue to be **officially assigned** before starting
* Unsolicited PRs for unassigned issues will be **closed without review**

Repeated violations may lead to warnings or bans.

---

## 📸 VISUAL REQUIREMENTS (MANDATORY)

### ✅ For Pull Requests

* You **MUST** include:

  * Screenshots or GIFs of the implemented changes

### ✅ For Issues

* You **MUST** include:

  * Screenshots of the current state / problem area

To ensure clarity and faster reviews, submissions without visuals may be requested to update before review.

---

## ⏱️ TIME CONSTRAINTS & DISQUALIFICATION

### ⏳ Assignment Rules

* Work must begin **immediately after assignment**
* Maximum **3 issues per day** (more only after completion)

### 🕒 Deadlines

* Ideal completion: **30 minutes – 48 hours**
* Grace period: **72 hours**

If no progress is shown after 72 hours, the issue will be unassigned.

### 🚨 Disqualification Conditions

* PR fails build or breaks functionality
* Linting rules ignored
* Missing mandatory screenshots
* Duplicate PRs for already-assigned issues

### 💤 Stale PRs

* If requested changes are ignored for **24 hours**, the PR may be closed

---

## 🟢 Contribution Category

**Beginner Friendly** 🟢

This contribution focuses on:

* Documentation clarity
* Technical writing
* Understanding project structure

Perfect for first-time open-source contributors 🚀

---

Happy Contributing 💙

