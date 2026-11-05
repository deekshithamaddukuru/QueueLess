# QueueLess – Smart Queue Management System

A beginner-friendly full-stack starter project for digital token generation and queue tracking.

## Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Features included
- View available services (Hospital, Bank, College Office)
- Generate a digital token for a selected service
- View token number, queue position, and estimated waiting time
- Admin screen to view tokens and call the next waiting token
- Update token status to `serving` or `completed`

> This is an educational MVP. Before real-world deployment, add proper user/admin authentication, input validation, rate limiting, audit logs, and privacy/security review.

## Requirements
Install Node.js (LTS) and MongoDB Community Server, or use a MongoDB Atlas connection string.

## 1. Configure backend
Open a terminal in `backend`:

```bash
npm install
```

Copy `.env.example` to `.env` and set `MONGODB_URI`.

Start backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

## 2. Configure frontend
Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## 3. Use the app
1. Select a service and enter your name.
2. Click **Generate token**.
3. Open the **Admin** tab to view the queue.
4. Click **Call next** to move the next waiting token to serving.
5. Click **Complete** when service is finished.

## Project structure

```text
QueueLess/
  backend/
    src/
      models/Token.js
      routes/queue.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      App.jsx
      main.jsx
      style.css
    index.html
    package.json
    vite.config.js
```

## Useful next improvements
- JWT login with separate user and admin roles
- Live updates with Socket.IO
- QR code on each token
- Appointment booking and time slots
- Daily analytics dashboard
- Deploy frontend and backend
