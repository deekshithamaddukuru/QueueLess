QueueLess – Smart Queue Management System

About the Project

QueueLess is a smart digital queue management system designed to reduce waiting time and make queue management easier. Users can generate digital tokens, track their queue status, and access services without standing in long physical queues.

Features

- Digital Token Generation
- Real-Time Queue Tracking
- Multiple Service Selection
- Admin Queue Management
- Token Status Updates
- MongoDB Database Integration

Technologies Used

Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Vite

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

Project Structure

QueueLess/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md

Installation and Setup

1. Clone the Repository

git clone https://github.com/deekshithamaddukuru/QueueLess.git
cd QueueLess

2. Configure Backend

cd backend
npm install

Create a ".env" file inside the backend folder.

Add the following configuration:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/queueless

Start the backend server:

npm run dev

3. Configure Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Open the local URL displayed in the terminal.

Database

MongoDB is used to store token details and queue-related information.

Future Enhancements

- User Authentication
- SMS Notifications
- Estimated Waiting Time
- Multiple Service Center Support

Author

Deekshitha

License

This project is developed for educational purposes.