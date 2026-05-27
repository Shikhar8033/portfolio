# Shikhar Sharma — Portfolio Website

A dark, data-science themed personal portfolio built with vanilla HTML, CSS, and JavaScript.

## 🚀 Deploy to GitHub Pages (Step-by-step)

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it: `shikhar-portfolio` (or `yourusername.github.io` for root URL)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload your files
1. In the new repo, click **"uploading an existing file"**
2. Drag and drop these three files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Wait ~2 minutes — your site is live at:
   `https://yourusername.github.io/shikhar-portfolio/`

---

## ✉️ Set Up Contact Form (EmailJS — Free)

The contact form uses [EmailJS](https://www.emailjs.com) to send emails directly to your Gmail inbox — no backend needed.

### Step 1 — Create EmailJS account
- Go to https://www.emailjs.com → Sign up free (200 emails/month)

### Step 2 — Add Gmail service
- Dashboard → **Email Services** → **Add New Service** → choose Gmail
- Connect `shikhar.sharma8033@gmail.com`
- Copy your **Service ID**

### Step 3 — Create email template
- Dashboard → **Email Templates** → **Create New Template**
- **To Email**: `shikhar.sharma8033@gmail.com`
- **Subject**: `{{subject}} — from {{from_name}}`
- **Body**:
  ```
  New message from your portfolio!

  Name:    {{from_name}}
  Email:   {{from_email}}
  Subject: {{subject}}

  Message:
  {{message}}
  ```
- Copy your **Template ID**

### Step 4 — Get Public Key
- Click profile icon → **Account** → **API Keys**
- Copy your **Public Key**

### Step 5 — Update script.js
Open `script.js` and replace the three values at the top:
```js
const EMAILJS_SERVICE_ID  = 'service_abc123';    // your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // your Template ID
const EMAILJS_PUBLIC_KEY  = 'AbCdEfGhIjKlMnOp'; // your Public Key
```

### Step 6 — Push updated file to GitHub
Re-upload `script.js` to your repo → commit → GitHub Pages auto-deploys.

---

## 📁 File Structure
```
/
├── index.html    — main portfolio page
├── style.css     — all styling & animations
├── script.js     — canvas bg, scroll effects, contact form
└── README.md     — this file
```

## 🎨 Customization Tips
- **Colors**: Edit CSS variables at the top of `style.css` (`:root` block)
- **Add projects**: Copy a `.project-card` block in `index.html`
- **Profile photo**: Add `<img src="photo.jpg" />` in the hero section
- **GitHub link**: Update the GitHub URL in the footer

---

Built with ♥ — Shikhar Sharma, 2025
