#  Drive Dashboard (Google Drive File Manager)

A modern, lightweight **Google Drive file management dashboard** built using **Google Apps Script + HTML/CSS/JavaScript**.

Designed with a clean UI and smooth navigation to simulate a **mini cloud storage SaaS experience**.

---

## ✨ Features

* 📁 **Folder Navigation**

  * Click folders to explore contents
  * Breadcrumb navigation + back button

* 📄 **File Preview**

  * PDF preview inside app
  * Image preview support

* 🔍 **Search**

  * Real-time filtering of files

* ⬆ **Upload System**

  * Upload files directly to Google Drive

* ✏ **Rename Files**

* 🗑 **Delete Files**

* 🎨 **Modern UI**

  * Glassmorphism design
  * Responsive grid layout
  * Smooth hover animations

---

## 🛠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Google Apps Script
* **Storage:** Google Drive API

---

## 📸 Screenshots

![Dashboard Preview](screenshot.png)

---

## 🌐 Live Demo

👉 [Open App](YOUR_WEB_APP_LINK_HERE)

---

## ⚙️ Setup Instructions

1. Open **Google Apps Script**
2. Create a new project
3. Add:

   * `Code.gs`
   * `index.html`
4. Replace your **Google Drive folder ID**:

   ```js
   var ROOT = "YOUR_FOLDER_ID";
   ```
5. Deploy:

   * Deploy → Web App
   * Access: **Anyone**

---

## 📁 Project Structure

```id="proj-structure"
.
├── Code.gs        # Backend logic (Drive API)
├── index.html     # UI (Dashboard)
├── README.md
```

---

## 💡 Key Highlights

* Lightweight alternative to full SaaS platforms
* No external backend required
* Uses Google Drive as storage
* Easy to deploy and maintain

---

## ⚠️ Limitations

* No authentication system (public access)
* Limited to Google Apps Script environment
* Not a full-scale production SaaS (yet)

---

## 🚀 Future Improvements

* 🔐 User authentication system
* 📁 Folder creation UI
* 📤 Drag & drop upload
* 🌐 Custom domain integration
* ⚡ Migration to Next.js (full SaaS architecture)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
