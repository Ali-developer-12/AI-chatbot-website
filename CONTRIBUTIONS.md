# Contributing Guide

Thank you for considering contributing to the **AI Chatbot Project**! 🎉

This guide outlines how to contribute effectively, maintain consistency, and ensure smooth collaboration.

---

## 🚀 How to Contribute

### 1. **Fork the Repository**

Click the **Fork** button at the top of the GitHub repo.

### 2. **Clone Your Fork**

```
git clone https://github.com/<your-username>/ai-chatbot-project.git
cd ai-chatbot-project
```

### 3. **Create a New Branch**

Use meaningful names:

```
git checkout -b feature/signup-validation
```

### 4. **Make Your Changes**

Follow the project structure and coding style. Keep commits small and focused.

### 5. **Commit Changes**

```
git add .
git commit -m "feat: add signup input validation"
```

### 6. **Push to Your Branch**

```
git push origin feature/signup-validation
```

### 7. **Create a Pull Request (PR)**

Open GitHub → your fork → **Compare & Pull Request**.

Add:

* Summary of changes
* Issue number (if any)
* Screenshots (if UI‑related)

---

## 📁 Project Conventions

### 🧩 Folder Structure

Follow the existing structure:

* `frontend/` → HTML, CSS, JS
* `backend/` → Express server, routes, controllers, middleware

### 🧹 Code Style

* Use meaningful variable/function names
* Keep functions short and readable
* Comment only when necessary
* Avoid duplicate code

### 🧪 Testing

Before submitting a PR:

* Test signup & login flows
* Test `/ask` chat endpoint
* Test JWT-protected routes
* Test frontend behavior (token, redirects, chat response)

---

## 🔐 Security Guidelines

* Never commit `.env` or API keys
* Never upload tokens/logs/screenshots containing secrets
* Report vulnerabilities privately via email or GitHub security

---

## 🛠️ Types of Contributions

You can contribute by:

* Fixing bugs
* Improving UI/UX
* Writing documentation
* Adding new features
* Improving validation and error handling
* Refactoring code

---

## 🤝 Code Ownership (Team Roles)

Refer to README for detailed role assignments.

Each team member should work inside their assigned folder/module unless collaborating on a shared feature.

---

## 📜 Pull Request Checklist

Before submitting:

* [ ] Code runs without errors
* [ ] No debug console logs left
* [ ] Tested on browser + backend
* [ ] No API keys or sensitive data included
* [ ] PR description filled properly

---

## 💬 Communication

For discussions:

* Use GitHub Issues
* Use descriptive titles
* Keep the discussion focused and constructive

---

## ❤️ Final Note

We appreciate all contributions — big or small. Thank you for helping improve this project!
