/* ═══════════════════════════════════════════
   DATA ROUTE – GET /api/data
   Serves portfolio data to frontend dynamically
   ═══════════════════════════════════════════ */

const express = require('express');
const router = express.Router();

// Portfolio data (mirrors frontend/js/data.js but served via API)
const DATA = {
    profiles: [
        { id: 'projects', icon: '🚀', label: 'Projects' },
        { id: 'skills', icon: '🛠️', label: 'Tech Stack' },
        { id: 'resume', icon: '📄', label: 'Resume' },
        { id: 'about', icon: '🎮', label: 'About Me' },
        { id: 'contact', icon: '📬', label: 'Contact' }
    ],

    projects: [
        { id: 1, emoji: '🌐', title: 'Portfolio Website', desc: 'A Netflix-inspired developer portfolio built with vanilla HTML, CSS, and JavaScript.', tags: ['HTML', 'CSS', 'JavaScript'], category: 'Web Apps', featured: true, rank: 1, isNew: true, isLive: true },
        { id: 2, emoji: '🤖', title: 'AI Chat Assistant', desc: 'Real-time AI chatbot powered by GPT API with streaming responses and markdown rendering.', tags: ['React', 'Node.js', 'OpenAI', 'WebSockets'], category: 'Web Apps', featured: true, rank: 2, isNew: true, isLive: false },
        { id: 3, emoji: '📊', title: 'Analytics Dashboard', desc: 'Interactive data visualization dashboard with real-time charts and drag-and-drop widgets.', tags: ['Vue.js', 'D3.js', 'Firebase'], category: 'Web Apps', featured: true, rank: 3, isNew: false, isLive: true },
        { id: 4, emoji: '🛒', title: 'E-Commerce Platform', desc: 'Full-stack e-commerce with Stripe integration and admin panel.', tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind'], category: 'Web Apps', featured: false, rank: 4, isNew: false, isLive: false },
        { id: 5, emoji: '📱', title: 'Fitness Tracker App', desc: 'Cross-platform mobile app for tracking workouts and progress.', tags: ['React Native', 'Firebase', 'Charts'], category: 'Side Projects', featured: false, rank: 5, isNew: false, isLive: false },
        { id: 6, emoji: '🎵', title: 'Music Streaming UI', desc: 'Spotify-inspired music player UI with playlist management.', tags: ['React', 'Howler.js', 'CSS Grid'], category: 'Side Projects', featured: false, rank: 6, isNew: true, isLive: false },
        { id: 7, emoji: '🔗', title: 'URL Shortener', desc: 'Fast URL shortener with analytics and QR code generation.', tags: ['Go', 'Redis', 'React', 'Docker'], category: 'Open Source', featured: false, rank: 7, isNew: false, isLive: true },
        { id: 8, emoji: '📝', title: 'Markdown Editor', desc: 'Real-time markdown editor with live preview and syntax highlighting.', tags: ['TypeScript', 'CodeMirror', 'Electron'], category: 'Open Source', featured: false, rank: 8, isNew: false, isLive: false },
        { id: 9, emoji: '🎮', title: 'Multiplayer Quiz Game', desc: 'Real-time multiplayer quiz game with rooms and leaderboards.', tags: ['Socket.io', 'Node.js', 'MongoDB'], category: 'Side Projects', featured: false, rank: 9, isNew: true, isLive: false },
        { id: 10, emoji: '🔒', title: 'Auth Microservice', desc: 'Production-ready authentication microservice with JWT and OAuth2.', tags: ['Node.js', 'JWT', 'Redis', 'Docker'], category: 'Open Source', featured: false, rank: 10, isNew: false, isLive: false },
        { id: 11, emoji: '🧠', title: 'Neural Style Transfer', desc: 'Deep learning web app applying artistic styles to photos.', tags: ['Python', 'TensorFlow', 'Flask', 'React'], category: 'Side Projects', featured: false, rank: null, isNew: false, isLive: false },
        { id: 12, emoji: '🏗️', title: 'DevOps Pipeline Builder', desc: 'Visual CI/CD pipeline builder with drag-and-drop stages.', tags: ['React', 'Node.js', 'Docker', 'YAML'], category: 'Currently Building', featured: false, rank: null, isNew: true, isLive: false },
        { id: 13, emoji: '📦', title: 'Component Library', desc: 'Reusable React component library with Storybook documentation.', tags: ['React', 'Storybook', 'Rollup', 'A11y'], category: 'Open Source', featured: false, rank: null, isNew: false, isLive: false },
        { id: 14, emoji: '⚡', title: 'Serverless API Gateway', desc: 'Custom API gateway on AWS Lambda with rate limiting and caching.', tags: ['AWS Lambda', 'API Gateway', 'DynamoDB'], category: 'Currently Building', featured: false, rank: null, isNew: true, isLive: false }
    ],

    skills: [
        { icon: '⚛️', name: 'React', level: 92, category: 'Frontend' },
        { icon: '🟨', name: 'JavaScript', level: 95, category: 'Frontend' },
        { icon: '🟦', name: 'TypeScript', level: 88, category: 'Frontend' },
        { icon: '🎨', name: 'CSS / SCSS', level: 90, category: 'Frontend' },
        { icon: '🖼️', name: 'Next.js', level: 85, category: 'Frontend' },
        { icon: '💚', name: 'Vue.js', level: 72, category: 'Frontend' },
        { icon: '🟢', name: 'Node.js', level: 90, category: 'Backend' },
        { icon: '🐍', name: 'Python', level: 82, category: 'Backend' },
        { icon: '🐘', name: 'PostgreSQL', level: 80, category: 'Backend' },
        { icon: '🍃', name: 'MongoDB', level: 78, category: 'Backend' },
        { icon: '🔥', name: 'Firebase', level: 75, category: 'Backend' },
        { icon: '🔴', name: 'Redis', level: 70, category: 'Backend' },
        { icon: '🐳', name: 'Docker', level: 82, category: 'Tools & DevOps' },
        { icon: '☸️', name: 'Kubernetes', level: 60, category: 'Tools & DevOps' },
        { icon: '🔀', name: 'Git / GitHub', level: 94, category: 'Tools & DevOps' },
        { icon: '☁️', name: 'AWS', level: 72, category: 'Tools & DevOps' },
        { icon: '🔧', name: 'CI/CD', level: 78, category: 'Tools & DevOps' },
        { icon: '📐', name: 'Figma', level: 68, category: 'Tools & DevOps' },
        { icon: '🦀', name: 'Rust', level: 35, category: 'Currently Learning' },
        { icon: '🧊', name: 'Three.js', level: 40, category: 'Currently Learning' },
        { icon: '🤖', name: 'Machine Learning', level: 45, category: 'Currently Learning' },
        { icon: '⛓️', name: 'Web3 / Solidity', level: 30, category: 'Currently Learning' }
    ],

    resume: [
        { emoji: '💼', title: 'Senior Frontend Engineer', desc: 'Led the frontend team at TechCorp, building scalable React applications serving 2M+ users.', tags: ['TechCorp', '2023 - Present', 'Full-time'], category: 'Work Experience' },
        { emoji: '👨‍💻', title: 'Full Stack Developer', desc: 'Built and maintained 12+ client projects spanning e-commerce, SaaS, and healthcare.', tags: ['DevStudio', '2021 - 2023', 'Full-time'], category: 'Work Experience' },
        { emoji: '🧑‍💻', title: 'Junior Developer', desc: 'Started career building WordPress sites and custom plugins.', tags: ['WebAgency', '2019 - 2021', 'Full-time'], category: 'Work Experience' },
        { emoji: '🎓', title: 'B.Tech Computer Science', desc: 'Graduated with honors. Specialized in algorithms and data structures.', tags: ['State University', '2015 - 2019', 'GPA: 3.8'], category: 'Education' },
        { emoji: '📜', title: 'AWS Solutions Architect', desc: 'Certified in designing distributed systems on AWS.', tags: ['Amazon Web Services', '2023', 'Professional'], category: 'Certifications' },
        { emoji: '📜', title: 'Google UX Design', desc: 'Google UX Design Professional Certificate.', tags: ['Google / Coursera', '2022', 'Professional'], category: 'Certifications' },
        { emoji: '🏆', title: 'Hackathon Winner', desc: 'Won 1st place at HackTheNorth 2023.', tags: ['HackTheNorth', '2023', '1st Place'], category: 'Achievements' },
        { emoji: '⭐', title: 'Open Source Contributor', desc: '500+ contributions on GitHub with 2.4k stars.', tags: ['GitHub', 'Ongoing', '2400+ Stars'], category: 'Achievements' },
        { emoji: '📢', title: 'Conference Speaker', desc: 'Spoke at ReactConf and JSNation.', tags: ['ReactConf', 'JSNation', '2023'], category: 'Achievements' }
    ],

    about: [
        { emoji: '📖', title: 'My Journey', desc: 'Started coding at 14 with HTML and CSS.', tags: ['Started at 14', 'Self-taught', 'Passion-driven'], category: 'My Story' },
        { emoji: '💡', title: 'Why I Code', desc: 'I believe technology can solve real problems.', tags: ['Problem Solver', 'Builder', 'Dreamer'], category: 'My Story' },
        { emoji: '🎸', title: 'Music', desc: 'Guitar player and lo-fi producer.', tags: ['Guitar', 'Lo-fi', 'Production'], category: 'Hobbies & Interests' },
        { emoji: '🏋️', title: 'Fitness', desc: 'Consistent gym-goer training for a half-marathon.', tags: ['Gym', 'Running', 'Half-marathon'], category: 'Hobbies & Interests' },
        { emoji: '📚', title: 'Reading', desc: 'Non-fiction enthusiast.', tags: ['Non-fiction', 'Tech Books', 'Psychology'], category: 'Hobbies & Interests' },
        { emoji: '🎮', title: 'Gaming', desc: 'FPS player and indie game enthusiast.', tags: ['FPS', 'Indie Games', 'Game Design'], category: 'Hobbies & Interests' },
        { emoji: '☕', title: 'Coffee Aficionado', desc: 'V60 pour-over daily driver.', tags: ['V60', 'Ethiopian', 'Specialty'], category: 'Fun Facts' },
        { emoji: '🌍', title: 'Traveled to 12 Countries', desc: 'Visited 12 countries and 30+ cities.', tags: ['12 Countries', 'Digital Nomad', 'Explorer'], category: 'Fun Facts' },
        { emoji: '⌨️', title: 'Custom Keyboard Builder', desc: 'Built 3 custom mechanical keyboards.', tags: ['Mechanical', '65% Layout', 'Custom'], category: 'Fun Facts' }
    ],

    contact: [
        { emoji: '📧', title: 'Email', desc: 'Reach out for collaborations.', tags: ['Primary Contact'], link: 'mailto:ayushmaanyadav@example.com' },
        { emoji: '💼', title: 'LinkedIn', desc: 'Professional networking.', tags: ['Professional'], link: 'https://linkedin.com/in/ayushmaanyadav' },
        { emoji: '🐙', title: 'GitHub', desc: 'Open source contributions.', tags: ['Open Source'], link: 'https://github.com/ayushmaanyadav' },
        { emoji: '🐦', title: 'Twitter / X', desc: 'Hot takes on web dev.', tags: ['Social'], link: 'https://twitter.com/ayushmaanyadav' }
    ]
};

// GET /api/data – full portfolio data
router.get('/', (req, res) => {
    res.json({ success: true, data: DATA });
});

module.exports = router;
