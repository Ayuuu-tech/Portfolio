# Personal Portfolio – Dynamic Netflix-Style Developer Portfolio

A fully dynamic, Netflix-inspired developer portfolio website. Built natively with HTML, CSS, and Vanilla JavaScript, ensuring it is incredibly fast, responsive, and easy to deploy for free as a purely static site.

## 🚀 Live Demo
*[Insert your live Render link here, e.g., https://ayushmaan-portfolio.onrender.com]*

## 🎯 Features

- **🔴 Cinematic Intro** – Bespoke logo animation mimicking a streaming service heartbeat start.
- **👤 Profile Selection** – Classic "Who is browsing?" screen before entering the app.
- **🎬 Hero Banner** – Auto-cycling and manually swipeable hero carousel showcasing featured projects.
- **🃏 Netflix-style Rows** – Horizontal scrolling rows of interactive cards for projects and skills.
- **📊 Live API Integrations**
  - **GitHub Stats:** Dynamically fetches and displays public repos, stars, followers, and forks. Also renders a live SVG commit heatmap natively.
  - **LeetCode Progress:** Fetches your current LeetCode problem solved counts, acceptance rate, and global ranking, presenting them in an animated donut chart and progress bars.
- **📬 Serverless Contact Form** – Email routing natively handled smoothly using `FormSubmit.co`. No backend required!
- **📱 Fully Responsive** – Tailored breakpoints ranging from 4K displays down to tiny mobile screens (including a custom bottom navigation bar and activity bar for mobile users).

## 📁 Project Structure

```
portfolio/
├── frontend/                    # Source code directory
│   ├── index.html               # Main entry point (HTML shell)
│   ├── resume.pdf               # Downloadable resume
│   ├── css/                     # Stylesheets (modularized into components)
│   │   ├── variables.css        # Design tokens (colors, fonts)
│   │   ├── responsive.css       # All mobile/tablet overrides
│   │   └── ...                  # Components (cards, hero, navbar, etc.)
│   └── js/                      # Vanilla JavaScript modules
│       ├── data.js              # Central DATA object (Projects, Skills, timeline, etc.)
│       ├── app.js               # Main bootstrap script
│       ├── github-stats.js      # API fetcher for GH stats & chart
│       ├── leetcode-stats.js    # API fetcher for Leetcode
│       └── ...                  # Layout builders & interaction logic
└── README.md                    # This file
```

## 🛠️ Personalization Guide

To make this your own, simply edit the following files:
1. **`frontend/js/data.js`**: Replace all the placeholder projects, skills, education, and resume timeline details with your own. 
2. **`frontend/js/github-stats.js`**: Update the `GH_USER` constant at the top to your GitHub username.
3. **`frontend/js/leetcode-stats.js`**: Update the `LEETCODE_USER` constant at the top to your LeetCode username.
4. **`frontend/js/pages/contact.js`**: Ensure the email address in the DOM and FormSubmit endpoint points to your actual email.
5. **`frontend/resume.pdf`**: Replace the file with your actual PDF resume.

## 🌐 How to Deploy (Render.com)

Since the entire app runs completely client-side in the browser, deployment takes less than 30 seconds for free on Render.

1. Create a free account at [Render.com](https://render.com/).
2. Click **New +** -> **Static Site**.
3. Connect this GitHub repository.
4. Under the configuration settings:
   - **Branch:** `main`
   - **Build Command:** *(Leave entirely blank)*
   - **Publish Directory:** `frontend`
5. Click **Create Static Site**.

Your stunning new portfolio will instantly be live on the internet! 🚀

## 🛠️ Tech Stack

| Layer       | Technology                                                  |
|-------------|-------------------------------------------------------------|
| **Core**    | HTML5, CSS3, Vanilla JavaScript (ES6+)                      |
| **APIs**    | GitHub API, Alfa-Leetcode API, FormSubmit.co                |
| **Design**  | Native CSS Flexbox/Grid, CSS Variables, Keyframe Animations |
| **Icons**   | Native OS Emojis & SVG rendering                            |
| **Fonts**   | Bebas Neue, DM Sans (Google Fonts)                          |
# Portfolio
