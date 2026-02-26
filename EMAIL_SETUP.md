# Email Implementation Guide

This document explains how to implement email functionality for the contact form.

---

## Quick start: EmailJS (no backend needed)

1. **Create an EmailJS account**  
   Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up (free tier is enough).

2. **Add an email service**  
   - In the dashboard: **Email Services** → **Add New Service**.  
   - Connect your email (Gmail, Outlook, or custom SMTP).  
   - Copy the **Service ID**.

3. **Create an email template**  
   - Go to **Email Templates** → **Create New Template**.  
   - Set **To Email** to `{{to_email}}` (or your address, e.g. `info@igniscoreholdings.net`).  
   - Subject example: `Contact from {{from_name}}`.  
   - Body example:  
     `From: {{from_name}} ({{from_email}})\nPhone: {{phone}}\nCompany: {{company}}\nService: {{service}}\n\nMessage:\n{{message}}`  
   - Save and copy the **Template ID**.

4. **Get your public key**  
   - In the dashboard go to **Account** → **API Keys** (or **General**).  
   - Copy your **Public Key**.

5. **Configure the project**  
   - In the project root, copy the example env file:  
     `cp .env.example .env` (or on Windows: copy `.env.example` to `.env`).  
   - Edit `.env` and set:
     ```
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     ```
   - Restart the dev server: stop it (Ctrl+C), then run `npm run dev` again.

6. **Test**  
   Submit the contact form on the site. You should see a success message and receive the email.

---

## Current Implementation

The contact form supports three methods for sending emails:

### 1. EmailJS (Recommended for client-side)
- Sign up at https://www.emailjs.com/
- Create a service and email template
- Set environment variables in `.env` (see Quick start above):
  ```
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  ```

### 2. Backend API (Recommended for production)
- Create a backend endpoint at `/api/send-email`
- Use services like Nodemailer, SendGrid, or AWS SES
- Example backend implementation provided below

### 3. Mailto Fallback (Always available)
- Opens user's default email client
- Pre-fills the email with form data
- Works without any configuration

## Backend Implementation Example (Node.js + Express)

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your email transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com', // or your SMTP server
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, replyTo } = req.body;
    
    await transporter.sendMail({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html,
      replyTo
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## Setup Instructions

1. **For EmailJS (Quick Setup):**
   - Visit https://www.emailjs.com/
   - Create an account and set up a service
   - Create an email template
   - Copy your credentials to `.env` file

2. **For Backend API:**
   - Implement the backend service shown above
   - Deploy to your server
   - Update `VITE_API_URL` in your environment

3. **Environment File:**
   - Copy `.env.example` to `.env`
   - Fill in your credentials

## Email Template for EmailJS

Create an email template in EmailJS with these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Phone number
- `{{company}}` - Company name
- `{{service}}` - Service interest
- `{{message}}` - Message content
- `{{to_email}}` - Recipient email (info@igniscoreholdings.net)

The form will automatically use the mailto fallback if other methods fail.