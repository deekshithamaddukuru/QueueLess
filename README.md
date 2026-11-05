# QueueLess | Smart Queue Management System

A digital queue management platform that simplifies token generation, queue tracking, and service management.

## Overview

QueueLess is a web-based application designed to reduce waiting time and improve the queue management experience. Users can generate digital tokens and track their queue status, while administrators can manage tokens efficiently.

## Key Features

* Digital Token Generation
* Real-Time Queue Tracking
* Multiple Service Selection
* Admin Queue Management
* Token Status Updates
* MongoDB Database Integration

## Tech Stack

| Frontend   | Backend    | Database |
| ---------- | ---------- | -------- |
| React.js   | Node.js    | MongoDB  |
| HTML5      | Express.js | Mongoose |
| CSS3       | REST API   |          |
| JavaScript |            |          |

## Project Structure

```text
QueueLess/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Token.js
│   │   ├── routes/
│   │   │   └── queue.js
│   │   └── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/deekshithamaddukuru/QueueLess.git
cd QueueLess
```

**2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/queueless
```

Start the backend:

```bash
npm run dev
```

**3. Frontend Setup**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## API Endpoints

| Method | Endpoint            | Purpose         |
| ------ | ------------------- | --------------- |
| GET    | `/api/services`     | View services   |
| POST   | `/api/tokens`       | Generate token  |
| GET    | `/api/tokens/:id`   | Track token     |
| GET    | `/api/admin/tokens` | View all tokens |

## Future Enhancements

* User Authentication
* SMS Notifications
* Waiting Time Estimation
* Queue Analytics

## Author

**Deekshitha**

B.Tech – Computer Science
