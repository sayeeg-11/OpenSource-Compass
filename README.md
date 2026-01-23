<div align="center">

# 🌍 OpenSource Compass  
### Navigate Your Open Source Journey with Confidence

<img src="frontend/library/assets/swoc_banner.png" alt="OpenSource Compass – SWOC'26 Banner" width="40%" />

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/sayeeg-11/OpenSource-Compass)
[![GitHub Issues](https://img.shields.io/github/issues/sayeeg-11/OpenSource-Compass)](https://github.com/sayeeg-11/OpenSource-Compass/issues)
[![GitHub License](https://img.shields.io/github/license/sayeeg-11/OpenSource-Compass)](LICENSE)

<img src="https://img.shields.io/badge/SWOC-2026-blueviolet?style=for-the-badge&logo=rocket" alt="SWOC 2026">
<img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=github" alt="PRs Welcome">
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">

</div>

## ❄️ Social Winter of Code (SWOC) 2026

**Social Winter of Code (SWOC)** is a winter-long open-source program that mentors students through meaningful, real-world contributions.

---
## 📍 Table of Contents
<div align="left">
  
- [📖 About the Project](#-about-opensource-compass)
- [🎯 Vision & Objectives](#-project-vision--objectives)
- [✨ Key Features & Learning Paths](#-key-features--learning-paths)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [👥 Team & Mentors](#-team--swoc26)
- [📜 License](#-license)

</div>

---

## 📌 About OpenSource Compass

Your **ultimate beginner-friendly guide** to open source.  
No jargon. No confusion. Just clear steps to help you start contributing with confidence.

> Think of this as your friendly roadmap into open source 🌱

---

## 🎯 Project Vision & Objectives

- Simplify **Git & GitHub** for beginners  
- Explain real-world **open-source workflows**  
- Share **curated learning resources**  
- Prepare contributors for **SWOC, GSSoC, GSoC & Hacktoberfest**  
- Foster an **inclusive & welcoming community**

---

## ✨ Key Features & Learning Paths

| Feature | Description | Benefit |
| :--- | :--- | :--- |
| 🔰 **Beginner Guides** | Step-by-step Git & GitHub tutorials | Build confidence from scratch |
| 🚀 **Quick Start** | Setup guide in under 5 minutes | Start contributing immediately |
| 🎓 **Program Info** | Roadmap for GSoC, SWOC, GSSoC | Find your next big opportunity |
| 🤝 **Supportive Community** | Peer support and mentor reviews | Never get stuck alone |

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A033?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## 📂 Project Structure
<div align="left">



```
OPENSOURCE-COMPASS/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── documentation_update.yml
│   │   ├── feature_request.yml
│   │   ├── guide_proposal.yml
│   │   └── program_addition.yml
│   ├── workflows/
│   │   ├── issue-auto-comment.yml
│   │   ├── jekyll-gh-pages.yml
│   │   ├── pr-review.yml
│   │   └── static.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── .vscode/
│   └── settings.json
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── contributorProgressController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── contributorProgressRoutes.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── assets/templates/
│   │   ├── contributing.md
│   │   ├── issue-template.md
│   │   ├── pr-template.md
│   │   └── readme.md
│   ├── css/
│   │   ├── auth.css
│   │   ├── beginners-guide.css
│   │   ├── chatbot.css
│   │   ├── contribute.css
│   │   ├── contributors.css
│   │   ├── guides.css
│   │   ├── home.css
│   │   ├── navigation.css
│   │   ├── pdf_guide.css
│   │   ├── program.css
│   │   ├── resources.css
│   │   ├── sitemap.css
│   │   └── style.css
│   ├── data/
│   │   ├── chatbot_data.json
│   │   ├── programs.json
│   │   └── quiz_data.json
│   ├── js/
│   │   ├── auth.js
│   │   ├── chatbot.js
│   │   ├── components.js
│   │   ├── contribute.js
│   │   ├── contributors.js
│   │   ├── guides.js
│   │   ├── home.js
│   │   ├── main.js
│   │   ├── profile.js
│   │   ├── profile2.js
│   │   ├── programs-page.js
│   │   ├── programs.js
│   │   ├── resources.js
│   │   ├── search.js
│   │   ├── sitemap.js
│   │   └── theme.js
│   ├── library/
│   │   ├── assets/
│   │   └── guides_pdf/
│   │       ├── GSoC.pdf
│   │       ├── GSSOC.pdf
│   │       ├── Hacktoberfest.pdf
│   │       ├── LFX Mentorship.pdf
│   │       ├── Outreachy.pdf
│   │       └── SSoC.pdf
│   ├── pages/
│   │   ├── Event/
│   │   │   ├── gsoc.html
│   │   │   ├── gssoc.html
│   │   │   ├── hacktober.html
│   │   │   ├── linux.html
│   │   │   ├── outreachy.html
│   │   │   └── ssoc.html
│   │   └── guides/
│   │       ├── ethics-licensing.html
│   │       ├── Contribute.html
│   │       ├── contributors.html
│   │       ├── faq.html
│   │       ├── glossary.html
│   │       ├── guides.html
│   │       ├── pdf_guide.html
│   │       ├── profile.html
│   │       ├── programs.html
│   │       ├── Resources.html
│   │       └── sitemap.html
│   └── node_modules/
├── public/
├── .stylelintrc.json
├── 404.html
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── index.html
├── LICENSE
├── package-lock.json
└── README.md
```

---

## 👥 Team — SWOC’26

### 🛠 Project Admin

| Name | Role | GitHub | LinkedIn |
|----|----|------|---------|
| **Sayee Gosavi** | Project Admin | [@sayeeg-11](https://github.com/sayeeg-11) | https://linkedin.com/in/sayee-gosavi11|

> Responsible for project direction, reviews, and overall quality.

---

### 🧑‍🏫 Mentors

| Name | Role | GitHub | LinkedIn |
|----|----|------|---------|
| **Sameera Jape** | Mentor | [@sameera731](https://github.com/sameera731) | https://linkedin.com/in/sameera-jape  |
| **Satyam Pandey** | Mentor | [@Satyam12x](https://github.com/Satyam12x) | https://linkedin.com/in/satyam-pandey-301061272 |
| **Gopichand** | Mentor | [@Gooichand](https://github.com/Gooichand) | https://linkedin.com/in/gopichand-d-269709287 |

> Mentors guide contributors, review pull requests, and provide feedback throughout SWOC’26.

---

<div align="left">

## 🌍 Community & Contributors

### 💖 Contributors  
Thanks to these amazing people who have contributed to **OpenSource Compass** ✨  

<div align="center"> 
  <a href="https://github.com/sayeeg-11/OpenSource-Compass/graphs/contributors"> 
    <img src="https://contrib.rocks/image?repo=sayeeg-11/OpenSource-Compass" /> 
  </a> 
</div>

<br/><br/>

### ⭐ Project Support

[![Stars](https://img.shields.io/github/stars/sayeeg-11/OpenSource-Compass?style=social)](https://github.com/sayeeg-11/OpenSource-Compass/stargazers)
&nbsp;&nbsp;
[![Forks](https://img.shields.io/github/forks/sayeeg-11/OpenSource-Compass?style=social)](https://github.com/sayeeg-11/OpenSource-Compass/network/members)

</div>

## 🤝 Contribution Guidelines (SWOC’26)

### How to Contribute
<div align="left">
  
1. Browse the **Issues** section  
2. Comment on the issue you want to work on  
3. Wait for assignment  
4. Create a new branch  
5. Make your changes  
6. Open a Pull Request  

📌 **Important Rules**
- Do **not** create a PR without issue assignment  
- Keep changes focused and meaningful  
- Follow mentor feedback and repository guidelines  

📄 refer #23 – Important Contributing Guidelines for OpenSource Compass

---

## 🚀 Getting Started

Follow these steps to set up the project locally and start contributing.

### 1️⃣ Fork the Repository
Click the **Fork** button on GitHub to create a copy under your account.

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/OpenSource-Compass.git
cd OpenSource-Compass
 ```
### 3️⃣ Run the Project
Open index.html directly in your browser or use a local development server.

### 4️⃣ Start Contributing
Make changes → Test → Push → Create Pull Request


---
###  How You Can Contribute ? 
##

✏️ Fix typos and improve writing

🎨 Make it look better and prettier

📝 Add new guides and tutorials

🐛 Find and fix bugs

💡 Share awesome ideas

---

### 📋 Submitting Your Changes
##
Step 1: Create a New Branch
```bash
git checkout -b feature/your-feature-name
```
### Step 2: Make Your Changes
Implement your updates following project guidelines.
### Step 3: Test Locally
Ensure everything works correctly before committing.
### Step 4: Commit Your Work
```bash
git add .
git commit -m "Brief description of your changes"
```
### Step 5: Push to GitHub
```bash
git push origin feature/your-feature-name
```
**Step 6:** Create a Pull Request
Go to GitHub and click "Create Pull Request". Done! 🚀

---

## ✅ Do These Things

✔️ Ask questions - we love helping!

✔️ Read the existing code first

✔️ Make small, focused changes

✔️ Test your work

✔️ Be nice and respectful

---

## ❌ Don't Do These Things

❌ Don't make huge changes all at once

❌ Don't ignore feedback from reviewers

❌ Don't add random files

❌ Don't be mean to people

❌ Don't skip testing

---

## 💝 Code of Conduct

**Be awesome. Be kind. Be respectful.**

We don't accept:
- 😠 Rudeness or bullying
- 👎 Mean comments
- 🚫 Discrimination
- 💬 Hateful language

**Everyone is welcome here!** 🌈

---

## 🌟 Open Source Programs

Join these cool programs and get recognized! 🏆

- **SWOC** - Social Winter of Code 🎿
- **GSSoC** - GirlScript Summer Code 👩‍💻
- **GSoC** - Google Summer of Code 🚀
- **Hacktoberfest** - October fest! 🎃

---

## 📚 Learn More

### Right Here:
- Getting Started Guide
- Git & GitHub Tutorial
- Programs Hub
- Video Library
- Tips & Tricks

### Out There:
- [GitHub Basics](https://guides.github.com)
- [Git Tutorial](https://git-scm.com)
- [Web Dev Docs](https://developer.mozilla.org)
- [Open Source Tips](https://opensource.guide)

---

## 🐛 Found a Bug?

We want to know! Tell us! 📢

1. Check if someone already reported it
2. Click "New Issue" on GitHub
3. Write what happened
4. We'll fix it! ✅

---

## 🎁 Cool Ideas to Contribute

- 📝 Add more program guides
- 🎨 Make the design cooler
- 📱 Fix mobile issues
- 🎥 Add video tutorials
- 🌍 Translate to other languages
- ⭐ Share your success story

---

## 🚀 What's Coming Next?

We're planning:

- 📱 Mobile app
- 👤 User accounts
- 💬 Forums & discussions
- 🏅 Achievement badges
- 🌐 Many languages
- 🤖 AI helper

---

## 👥 Join Us!

### Love what we do?

⭐ Give us a star on GitHub!

🍴 Fork and contribute

💬 Share feedback

📣 Tell your friends

---

## 📜 License

MIT License = You can use, modify, and share freely! 🎉

---

## 🙏 Special Thanks

Big thanks to everyone contributing! You make this awesome! 💖

---

## ❓ Need Help?

📧 Open an issue on GitHub

💬 Join our discussions

📚 Check our guides

---

## 🚀 Quick Links

[Repository](https://github.com/sayeeg-11/OpenSource-Compass) | [Issues](https://github.com/sayeeg-11/OpenSource-Compass/issues) | [Pull Requests](https://github.com/sayeeg-11/OpenSource-Compass/pulls)

</div>

---

<div align="center">

## ❤️ Made with Love for the Open Source Community

**Let's make open source awesome for everyone!**

⭐ Please star if this helps you! ⭐

</div>
