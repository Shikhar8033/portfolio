/* ================================================================
   PORTFOLIO SCRIPT — Shikhar Sharma
   Contact form powered by EmailJS
   To set up: replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
   Instructions at bottom of file
   ================================================================ */

// ── EmailJS Config ───────────────────────────────────────────────
// STEP 1: Sign up at https://www.emailjs.com (free tier — 200 emails/mo)
// STEP 2: Create a service (Gmail), create an email template
// STEP 3: Replace the three values below with your own

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'AbCdEfGhIjKlMnOp'

// ── EmailJS Template Variables (must match your template) ─────────
// In your EmailJS template, use:
//   {{from_name}}    — sender's name
//   {{from_email}}   — sender's email
//   {{subject}}      — subject
//   {{message}}      — message body
//   {{to_email}}     — your email (shikhar.sharma8033@gmail.com)


// ── Animated Canvas Background ───────────────────────────────────
const canvas  = document.getElementById('bg-canvas');
const ctx     = canvas.getContext('2d');

let W, H, nodes = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createNodes(count) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5,
    });
  }
}

function drawCanvas() {
  ctx.clearRect(0, 0, W, H);
  const COLOR   = '0,212,255';
  const CONNECT = 140;

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${COLOR},0.6)`;
    ctx.fill();
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < CONNECT) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${COLOR},${0.12 * (1 - d/CONNECT)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawCanvas);
}

window.addEventListener('resize', () => { resize(); createNodes(70); });
resize();
createNodes(70);
drawCanvas();


// ── Navbar scroll effect ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// ── Hamburger / Mobile menu ──────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ── Scroll reveal ────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.section, .project-card, .skill-group, .timeline-item, .cert-badge');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ── Skill bar animation ──────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        bar.style.width = w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach(el => barObserver.observe(el));


// ── Contact form (EmailJS) ───────────────────────────────────────
(function() {
  // Init EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = document.getElementById('btn-text');
const btnLoader  = document.getElementById('btn-loader');
const formStatus = document.getElementById('form-status');

function showStatus(msg, type) {
  formStatus.textContent  = msg;
  formStatus.className    = `form-status ${type}`;
  formStatus.classList.remove('hidden');
  setTimeout(() => { formStatus.classList.add('hidden'); }, 6000);
}

function setLoading(state) {
  submitBtn.disabled = state;
  btnText.classList.toggle('hidden', state);
  btnLoader.classList.toggle('hidden', !state);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Check if EmailJS is configured
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    // Demo mode — show success without actually sending
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showStatus('✓ Message received! (Demo mode — configure EmailJS to enable real sending)', 'success');
      form.reset();
    }, 1500);
    return;
  }

  setLoading(true);

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      subject:    subject,
      message:    message,
      to_email:   'shikhar.sharma8033@gmail.com',
    });

    showStatus('✓ Message sent! I\'ll get back to you within 24 hours.', 'success');
    form.reset();
  } catch (err) {
    console.error('EmailJS error:', err);
    showStatus('Something went wrong. Please email me directly at shikhar.sharma8033@gmail.com', 'error');
  } finally {
    setLoading(false);
  }
});


/* ================================================================
   HOW TO SET UP EMAILJS (Free – 200 emails/month)
   ================================================================
   1. Go to https://www.emailjs.com and create a free account

   2. Add an Email Service:
      - Click "Email Services" → "Add New Service"
      - Choose Gmail, connect your shikhar.sharma8033@gmail.com account
      - Copy the Service ID → replace YOUR_SERVICE_ID above

   3. Create an Email Template:
      - Click "Email Templates" → "Create New Template"
      - Set To Email: shikhar.sharma8033@gmail.com
      - Subject: {{subject}} — from {{from_name}}
      - Body:
            Name:    {{from_name}}
            Email:   {{from_email}}
            Subject: {{subject}}

            {{message}}
      - Copy the Template ID → replace YOUR_TEMPLATE_ID above

   4. Get your Public Key:
      - Click your profile → "Account" → "API Keys"
      - Copy Public Key → replace YOUR_PUBLIC_KEY above

   5. Save script.js, commit and push to GitHub — done!
   ================================================================ */
