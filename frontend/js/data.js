/* ═══════════════════════════════════════════
   DATA – All portfolio content lives here
   ═══════════════════════════════════════════ */

const DATA = {
  profiles: [
    { id: 'projects', icon: '🚀', label: 'Projects' },
    { id: 'skills', icon: '🛠️', label: 'Tech Stack' },
    { id: 'resume', icon: '📄', label: 'Resume' },
    { id: 'about', icon: '🎮', label: 'About Me' },
    { id: 'contact', icon: '📬', label: 'Contact' }
  ],

  projects: [
    // ── Featured ──
    {
      id: 1, emoji: '🧺', title: 'Laundry Buddy',
      desc: 'Full-stack PWA for hostel laundry management. Eliminates paper slips with real-time order tracking, push notifications, admin dashboard, JWT + session auth, rate limiting, and Docker deployment. Serving 200+ users.',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'PWA', 'Docker', 'JWT'],
      category: 'Featured Projects', featured: true, rank: 1, isNew: true, isLive: true,
      link: 'https://laundrybuddy.ayushmaanyadav.me/'
    },
    {
      id: 2, emoji: '🧠', title: 'Mental Health Predictor',
      desc: 'AI-powered mental health status predictor (Good/Moderate/Poor) trained on 10,000+ samples using Random Forest Classifier. Interactive Streamlit dashboard with real-time predictions, confidence scores, and personalized recommendations.',
      tags: ['Python', 'scikit-learn', 'Streamlit', 'Pandas', 'Jupyter'],
      category: 'Featured Projects', featured: true, rank: 2, isNew: true, isLive: false,
      link: 'https://github.com/Ayuuu-tech/Mental-Health-Status-Prediction'
    },
    {
      id: 3, emoji: '🦊', title: 'Big Fox',
      desc: 'Voice & text desktop AI assistant for Windows. Supports 30+ commands — open websites, control media, take notes, set reminders, read system info (battery/CPU/RAM), take screenshots, and more. Wake-word activated.',
      tags: ['Python', 'SpeechRecognition', 'pyttsx3', 'pyaudio', 'psutil'],
      category: 'Featured Projects', featured: true, rank: 3, isNew: true, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },

    // ── Full-Stack Web Apps ──
    {
      id: 4, emoji: '🍽️', title: 'Table Mint',
      desc: 'Full-stack Point of Sale (POS) system with a Next.js frontend and a dedicated backend API. Designed for restaurant and retail management with order handling and real-time updates.',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'REST API'],
      category: 'Featured Projects', featured: true, rank: 4, isNew: true, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },
    {
      id: 5, emoji: '🏥', title: 'ReLive AI',
      desc: 'AI-powered post-operative remote monitoring platform. Analyzes real-time vitals from wearables using LSTM + XGBoost + Isolation Forest to detect surgical complications early. Features a live React dashboard, WebSocket alerts, HIPAA compliance, and Kubernetes deployment.',
      tags: ['FastAPI', 'React', 'TensorFlow', 'XGBoost', 'PostgreSQL', 'Docker', 'Kubernetes'],
      category: 'Featured Projects', featured: true, rank: 5, isNew: true, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },


    // ── Science & Research ──
    {
      id: 6, emoji: '⚛️', title: 'QuantumForge DMET',
      desc: 'Web-based quantum many-body simulator implementing Dynamical Mean Field Embedding Theory (DMET). Simulates the Hubbard model with real-time parameter tuning, ground state energy computation, density matrix visualisation, and correlation function plots.',
      tags: ['Python', 'Streamlit', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter'],
      category: 'Science & Research', featured: false, isNew: true, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },

    // ── Python & Tools ──
    {
      id: 8, emoji: '💧', title: 'Smart Water Detector',
      desc: 'Arduino IoT project using pH, TDS, and turbidity sensors to assess water quality in real-time. Results displayed on a 16×2 LCD. Uses sensor averaging and hysteresis logic for stable, flicker-free output.',
      tags: ['Arduino', 'C++', 'IoT', 'Sensors', 'LCD'],
      category: 'Hardware & IoT', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },

    // ── Mini Games & Beginner ──
    {
      id: 9, emoji: '🎹', title: 'Simon Game',
      desc: 'Fully interactive Simon Says memory game built in vanilla JavaScript. Generates colour sequences, captures player input, validates turns, handles game-over and score tracking with DOM manipulation.',
      tags: ['HTML', 'CSS', 'JavaScript', 'DOM'],
      category: 'Mini Games', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },
    {
      id: 10, emoji: '✅', title: 'To-Do App',
      desc: 'Clean and minimal to-do list app. Add, complete, and delete tasks with a simple and fast JavaScript interface.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Mini Games', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },
    {
      id: 11, emoji: '🐍', title: 'Snake Water & Gun',
      desc: 'Python-based terminal game — the classic Snake-Water-Gun (Rock-Paper-Scissors variant). Player competes against a randomised computer choice with dictionary-based win logic.',
      tags: ['Python', 'CLI', 'Random'],
      category: 'Mini Games', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },
    {
      id: 12, emoji: '🎯', title: 'Number Guessing Game (JS)',
      desc: 'Browser-based JavaScript game where you guess a random number between 1 and a custom maximum. Gives higher/lower hints and has a quit option.',
      tags: ['JavaScript', 'HTML', 'CSS'],
      category: 'Mini Games', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    },
    {
      id: 13, emoji: '🔢', title: 'Number Guessing Game (Py)',
      desc: 'Python CLI number guessing game with randomised target (1–100), hint system (Higher/Lower), and attempt counter. Clean beginner-friendly Python code.',
      tags: ['Python', 'CLI', 'Random'],
      category: 'Mini Games', featured: false, isNew: false, isLive: false,
      link: 'https://github.com/Ayuuu-tech'
    }
  ],

  skills: [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', name: 'React.js', level: 75, category: 'Web', link: 'https://react.dev/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', name: 'Node.js', level: 72, category: 'Web', link: 'https://nodejs.org/en/docs/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', name: 'Express.js', level: 72, category: 'Web', link: 'https://expressjs.com/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', name: 'Flask', level: 65, category: 'Web', link: 'https://flask.palletsprojects.com/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', name: 'Tailwind CSS', level: 70, category: 'Web', link: 'https://tailwindcss.com/docs' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', name: 'Python', level: 78, category: 'Languages', link: 'https://docs.python.org/3/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', name: 'C++', level: 70, category: 'Languages', link: 'https://en.cppreference.com/w/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', name: 'Java', level: 62, category: 'Languages', link: 'https://docs.oracle.com/en/java/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', name: 'JavaScript', level: 76, category: 'Languages', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { icon: '🗄️', name: 'SQL', level: 70, category: 'Languages' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg', name: 'Solidity', level: 55, category: 'Languages', link: 'https://docs.soliditylang.org/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', name: 'MySQL', level: 70, category: 'Databases & Cloud', link: 'https://dev.mysql.com/doc/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', name: 'MongoDB', level: 68, category: 'Databases & Cloud', link: 'https://www.mongodb.com/docs/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', name: 'AWS (EC2, S3)', level: 60, category: 'Databases & Cloud', link: 'https://docs.aws.amazon.com/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', name: 'Redis', level: 55, category: 'Databases & Cloud', link: 'https://redis.io/docs/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', name: 'Git', level: 78, category: 'Tools', link: 'https://git-scm.com/doc' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', name: 'Docker', level: 65, category: 'Tools', link: 'https://docs.docker.com/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', name: 'Linux', level: 68, category: 'Tools', link: 'https://tldp.org/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg', name: 'Nginx', level: 55, category: 'Tools', link: 'https://nginx.org/en/docs/' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', name: 'Firebase', level: 65, category: 'Tools', link: 'https://firebase.google.com/docs' },
    { icon: '🧩', name: 'OOP', level: 78, category: 'Concepts' },
    { icon: '📐', name: 'DB Design', level: 70, category: 'Concepts' },
    { icon: '📜', name: 'Smart Contracts', level: 55, category: 'Concepts' },
    { icon: '🔄', name: 'CI/CD', level: 60, category: 'Concepts' }
  ],

  resume: [
    { emoji: '🎓', title: 'B.Tech Computer Science & Engineering', desc: 'Pursuing Bachelor of Technology with a CGPA of 7.70/10.', tags: ['2024 - 2028', 'CGPA: 7.70'], category: 'Education' },
    { emoji: '💻', title: 'Web Developer (Part Time)', desc: 'Built 3+ full-stack applications improving operational efficiency by 30%. Developed 10+ REST APIs reducing manual data processing by 40%.', tags: ['Bridgehut Promotions', 'Sep 2025 - Present'], category: 'Work Experience' },
    { emoji: '🏅', title: 'Vice President, NSS', desc: 'Led 300+ volunteers across 50+ social initiatives. Secured 50,000+ INR funding and digitized operations using React and Firebase.', tags: ['National Service Scheme', 'May 2025 - Present'], category: 'Achievements' }
  ],

  about: [
    { emoji: '👨‍🎓', title: 'My Journey', desc: 'I am a B.Tech Computer Science student (2024-2028) with a strong passion for software development and creating scalable systems.', tags: ['Student', 'Developer', 'CS'], category: 'My Story' },
    { emoji: '💡', title: 'Why I Code', desc: 'Driven by the desire to solve real-world problems. Whether it is building a SaaS platform for logistics or an AI monitoring system for healthcare.', tags: ['Problem Solver', 'Builder', 'Innovator'], category: 'My Story' },
    { emoji: '🚀', title: 'Leadership', desc: 'As Vice President of NSS, I lead teams and manage large-scale social initiatives, blending my technical skills to digitize and improve operations.', tags: ['Leadership', 'Management', 'Social Impact'], category: 'My Story' }
  ],

  contact: [
    { emoji: '📧', title: 'Email', desc: 'Reach out to me directly for opportunities and collaborations.', tags: ['Primary Contact'], link: 'mailto:ayushmaan.ggn@gmail.com' },
    { emoji: '💼', title: 'LinkedIn', desc: 'Connect with me professionally on LinkedIn.', tags: ['Professional'], link: 'https://linkedin.com/in/ayushmaan-yadav2006' },
    { emoji: '🐙', title: 'GitHub', desc: 'Check out my latest projects and open-source contributions.', tags: ['Open Source'], link: 'https://github.com/Ayuuu-tech' },
    { emoji: '💻', title: 'LeetCode', desc: 'View my algorithmic problem-solving skills and coding practice.', tags: ['Problem Solving'], link: 'https://leetcode.com/u/ayuuu_13/' }
  ]
};
