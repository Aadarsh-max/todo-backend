# Todo List Application - Backend

REST API backend built with Node.js and Express. Manages task and category operations with Firebase Authentication for email/password and Google OAuth login. Handles user profiles, task management, and secure data operations.

## Overview

Express server providing REST API for the Todo List frontend. Firebase Authentication handles login, while Firestore stores all user data (tasks, categories, profiles).

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - REST API framework
- **Firebase Admin SDK** - Authentication and Firestore
- **CORS** - Cross-origin requests
- **Multer** - File uploads (profile pictures)
- **Nodemon** - Auto-reload for development

## Installation & Setup

```bash
git clone https://github.com/yourusername/todo-list-backend.git
cd todo-list-backend

npm install

# Create .env file
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

npm run dev
```

## Firebase Configuration

**Enable in Firebase Console:**
- Authentication (Email/Password, Google)
- Firestore Database
- Storage (for profile pictures)

**Firestore Security Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /tasks/{taskId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /categories/{categoryId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

**Database Collections:**
```
users/ → userId → email, displayName, profilePicture, createdAt
tasks/ → taskId → userId, title, description, category, dueDate, 
                   isCompleted, isStarred, isPrivate, timestamps
categories/ → categoryId → userId, name, color, createdAt
```

## Authentication Flow

1. Frontend: User logs in via Firebase (email or Google)
2. Firebase returns ID token
3. Frontend sends token in Authorization header
4. Backend verifies token with Firebase Admin SDK
5. Backend processes request and returns data

## Response Format

**Success:**
```json
{ "success": true, "data": {...} }
```

**Error:**
```json
{ "error": { "code": "error_code", "message": "Error description" } }
```

## Middleware

**Authentication Middleware**
- Verifies Firebase ID token on protected routes
- Attaches userId to request
- Returns 401 if token invalid

**Error Handling**
- Catches all errors
- Formats error responses
- Logs issues

**CORS**
- Allows frontend domain
- Enables credentials

## Deployment

Set environment variables on your hosting platform (Heroku, Render, Railway, etc.):
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL
- PORT
- FRONTEND_URL

## Security

- Firebase handles password hashing
- Firestore rules enforce user isolation
- Users can only access their own data
- Private tasks encrypted in Firestore
- Token verification on all protected routes

## Troubleshooting

**Token verification failing?**
- Check Firebase credentials in .env
- Verify token format in Authorization header
- Ensure token isn't expired

**Database operations failing?**
- Check Firestore security rules
- Verify userId matches authenticated user
- Ensure rules allow read/write access

**Tasks not appearing?**
- Verify userId is stored correctly
- Check Firestore rules for read access
- Ensure tasks belong to authenticated user

## Running

```bash
npm run dev      # Development with auto-reload
npm start        # Production mode
npm test         # Run tests
```

---

**Secure backend for efficient task management.**
