/* ═══════════════════════════════════════════
   SERVER CONFIG
   ═══════════════════════════════════════════ */

require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5500',
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
    },
    contactToEmail: process.env.CONTACT_TO_EMAIL || ''
};
