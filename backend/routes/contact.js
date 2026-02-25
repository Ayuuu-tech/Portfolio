/* ═══════════════════════════════════════════
   CONTACT ROUTE – POST /api/contact
   ═══════════════════════════════════════════ */

const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config');
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message.'
            });
        }

        // Email regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // If SMTP is configured, send email
        if (config.smtp.user && config.smtp.pass) {
            const transporter = nodemailer.createTransport({
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.port === 465,
                auth: {
                    user: config.smtp.user,
                    pass: config.smtp.pass
                }
            });

            await transporter.sendMail({
                from: `"Portfolio Contact" <${config.smtp.user}>`,
                to: config.contactToEmail || config.smtp.user,
                subject: `Portfolio Contact: ${name}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `
            });

            console.log(`📧 Email sent from ${name} (${email})`);
        } else {
            // Log to console if SMTP not configured
            console.log('─── New Contact Form Submission ───');
            console.log(`Name:    ${name}`);
            console.log(`Email:   ${email}`);
            console.log(`Message: ${message}`);
            console.log('───────────────────────────────────');
        }

        return res.status(200).json({
            success: true,
            message: `Thanks, ${name}! Your message has been received. 🚀`
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});

module.exports = router;
