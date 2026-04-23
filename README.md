# Edwisely-Hackathon

# 🚀 Debugging Race Platform

A real-time competitive coding platform where participants fix broken code, run tests, and compete on a live leaderboard.

---

## 🧠 Overview

Debugging Race is designed to simulate a fast-paced coding competition environment. Participants are given intentionally broken code and must fix it as quickly as possible. Their performance is evaluated based on correctness, speed, and efficiency.

---

## ✨ Features

* ⚡ **Real-time multiplayer competition** using WebSockets
* 🧪 **Sandboxed code execution** with timeout protection
* 📊 **Live leaderboard updates**
* ⏱️ **Countdown timer for race pressure**
* 🧮 **Smart scoring system** (tests passed + time + attempts)
* 💻 **Monaco-based code editor** for smooth coding experience
* 🎯 **Instant feedback on test results**

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Monaco Editor

### Backend

* FastAPI (Python)
* WebSockets (real-time communication)

### Execution Engine

* Python subprocess (sandboxed execution)

### Data Layer

* Redis (optional) / In-memory store

---

## ⚙️ System Architecture

```
Frontend (React)
       ⇅ WebSocket
Backend (FastAPI)
       ⇅
Sandbox Execution Engine
       ⇅
Leaderboard Store (Redis / Memory)
```

---

## 🔄 Workflow

1. User joins a race session
2. Broken code is loaded in the editor
3. User clicks **Run Tests**
4. Backend executes code in sandbox
5. Results are returned instantly
6. Leaderboard updates in real-time
7. User submits final solution

---

## 🧪 Scoring Logic

Score is calculated based on:

* ✅ Number of test cases passed
* ⏱️ Time taken (faster = better)
* 🔁 Number of attempts (fewer = better)
* 🏁 Bonus for final submission

---

## 🛡️ Safety Measures

* Execution timeout prevents infinite loops
* Code size limits enforced
* Isolated subprocess execution
* Error handling for invalid outputs

---

## 📂 Project Structure

```
backend/
  app/
    api/
    services/
    core/
    db/

frontend/
  src/
    features/
      arena/
      editor/
      leaderboard/
```

---

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

---

### 3. (Optional) Redis

```bash
redis-server
```

---

## 🎮 How to Use

* Open the app in browser
* Edit the broken code
* Click **Run Tests**
* Fix errors and improve solution
* Watch leaderboard update live
* Submit final solution

---

## 🧠 Challenges Faced

* Handling secure sandboxed execution
* Managing real-time updates via WebSockets
* Avoiding infinite loops and crashes
* Synchronizing leaderboard across users

---

## 📈 Future Improvements

* Multi-problem support
* Language support (Python, JS, etc.)
* Team-based competitions
* Persistent user profiles
* Deployment with Docker + cloud

---

## 🏁 Conclusion

This project demonstrates how real-time systems, secure code execution, and competitive scoring can be combined to create an engaging debugging competition platform.

---

## 👨‍💻 Author

Built during a hackathon 🚀
