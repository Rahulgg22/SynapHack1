# DevARENA Backend (Node.js)

This is the backend for the DevARENA hackathon platform. It provides RESTful APIs for user authentication, event management, registration, announcements, judges, and analytics.

## Features
- User authentication (JWT, roles: user, organizer, admin)
- Event CRUD (create, read, update, delete)
- Event registration
- Organizer/admin dashboard APIs
- Announcements
- Judges management
- Analytics endpoints

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcrypt for password hashing

## Getting Started
1. Install dependencies: `npm install`
2. Set up a `.env` file (see `.env.example`)
3. Start the server: `npm run dev` (for development)

## Folder Structure
- `/models` - Mongoose models
- `/routes` - Express route handlers
- `/controllers` - Business logic
- `/middleware` - Auth, error handling, etc.
- `/utils` - Utility functions
- `/config` - DB and app config

---
Replace any placeholder values in `.env.example` before running in production.
