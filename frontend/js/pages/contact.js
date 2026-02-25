/* ═══════════════════════════════════════════
   CONTACT PAGE BUILDER
   ═══════════════════════════════════════════ */

// Backend URL — update this when deploying
const BACKEND_URL = '';   // e.g. 'https://your-api.onrender.com'

function buildContactPage() {
    const page = document.getElementById('page-contact');

    // Social link cards
    buildRow('Connect with me', DATA.contact, page);

    // Copy email convenience bar
    const emailBar = document.createElement('div');
    emailBar.className = 'copy-email-bar';
    emailBar.innerHTML = `
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
            <span class="copy-email-label">📧 ayushmaan.ggn@gmail.com</span>
            <span class="copy-email-label">📱 +91 7838274711</span>
        </div>
        <div style="display:flex;gap:10px;">
            <button class="copy-email-btn" data-email="ayushmaan.ggn@gmail.com">📋 Copy Email</button>
            <button class="copy-email-btn" data-email="7838274711">📋 Copy Number</button>
        </div>`;
    page.appendChild(emailBar);

    // Contact form
    const form = document.createElement('div');
    form.className = 'contact-form';
    form.innerHTML = `
    <h3>Send a Message</h3>
    <div class="form-group">
      <label>Your Name</label>
      <input type="text" id="contact-name" placeholder="John Doe" autocomplete="name"/>
    </div>
    <div class="form-group">
      <label>Email Address</label>
      <input type="email" id="contact-email" placeholder="john@example.com" autocomplete="email"/>
    </div>
    <div class="form-group">
      <label>Message</label>
      <textarea id="contact-msg" placeholder="Hey, I'd love to chat about..."></textarea>
    </div>
    <button class="form-submit" id="contact-submit-btn">Send Message →</button>`;
    page.appendChild(form);

    form.querySelector('#contact-submit-btn').addEventListener('click', submitContact);
}

async function submitContact() {
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const msgEl = document.getElementById('contact-msg');

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg = msgEl.value.trim();

    if (!name || !email || !msg) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    const btn = document.getElementById('contact-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Use standard HTML form submission so FormSubmit can show its activation page
    // and easily redirect right back to the portfolio.
    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = 'https://formsubmit.co/ayushmaan.ggn@gmail.com';
    tempForm.style.display = 'none';

    // The data to send
    const fields = {
        name: name,
        email: email,
        message: msg,
        _subject: `New Portfolio Message from ${name}`,
        _next: window.location.href, // redirects back immediately after sending
        _captcha: 'false'            // prevents the 'I am not a robot' screen when possible
    };

    for (const key in fields) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        tempForm.appendChild(input);
    }

    document.body.appendChild(tempForm);
    tempForm.submit();

    // Reset button after submitting in case the user navigates back
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Message →';
        nameEl.value = '';
        emailEl.value = '';
        msgEl.value = '';
    }, 2000);
}
