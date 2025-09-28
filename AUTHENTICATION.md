# Authentication System Setup

## Overview

This project now has a complete authentication system that connects the React/Next.js frontend with the Node.js/Express backend.

## How It Works

### Backend (Server)
- **Location**: `/server`
- **Routes**: 
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/getuser` - Get authenticated user data
- **Authentication**: JWT tokens stored in localStorage
- **Database**: MongoDB with User model

### Frontend (Client)
- **Location**: `/client`
- **Authentication Context**: `/src/context/AuthContext.jsx`
- **Route Protection**: 
  - `ProtectedRoute` component for authenticated pages
  - `PublicRoute` component for login/signup pages
- **Pages**:
  - Login: `/login`
  - Signup: `/signup`
  - Chat: `/chat` (protected)
  - Home: `/` (redirects to chat if authenticated)

## Features Implemented

### 🔐 Authentication Flow
1. **Registration**: Users can create accounts with name, email, and password
2. **Login**: Users can login with email and password
3. **JWT Tokens**: Secure authentication using JWT tokens
4. **Auto-Login**: Users stay logged in across browser sessions
5. **Logout**: Users can logout from the chat interface

### 🛡️ Route Protection
- **Protected Routes**: Chat page requires authentication
- **Public Routes**: Login/Signup pages redirect authenticated users to chat
- **Home Page**: Redirects authenticated users to chat, shows landing page for guests

### 👤 User Interface
- **Error Handling**: Form validation and error messages
- **Loading States**: Loading spinners during authentication
- **User Display**: Shows user name and email in chat sidebar
- **Logout Button**: Available in the chat sidebar dropdown

## Usage

### Starting the Application

1. **Backend**:
   ```bash
   cd server
   npm install
   npm start
   ```
   Server runs on: `http://localhost:5000`

2. **Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Client runs on: `http://localhost:3000`

### User Flow

1. **New Users**:
   - Visit `/` or `/signup`
   - Create account with name, email, password
   - Automatically redirected to `/chat`

2. **Existing Users**:
   - Visit `/` or `/login`
   - Login with email and password
   - Automatically redirected to `/chat`

3. **Authenticated Users**:
   - Can access `/chat`
   - Cannot access `/`, `/login`, or `/signup` (auto-redirected to `/chat`)
   - Can logout from sidebar dropdown

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Client-side route protection
- Automatic token validation
- Secure logout (removes token)

## Environment Requirements

### Backend
- Node.js
- MongoDB connection
- CORS enabled for `http://localhost:3000`

### Frontend
- Next.js 14+
- React Context for state management
- localStorage for token persistence

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
Body: { name, email, password }
Response: { authToken }

POST /api/auth/login  
Body: { email, password }
Response: { authToken }

POST /api/auth/getuser
Headers: { "auth-token": "jwt_token" }
Response: { user_data }
```

## Files Modified/Created

### New Files
- `/client/src/context/AuthContext.jsx` - Authentication context
- `/client/src/components/ProtectedRoute.jsx` - Protected route wrapper
- `/client/src/components/PublicRoute.jsx` - Public route wrapper

### Modified Files
- `/client/src/app/layout.js` - Added AuthProvider
- `/client/src/app/login/page.js` - Connected to backend API
- `/client/src/app/signup/page.js` - Connected to backend API
- `/client/src/app/chat/page.js` - Added route protection
- `/client/src/app/page.js` - Added auth redirect logic
- `/client/src/components/nav-user.jsx` - Added real user data and logout

## Next Steps

The authentication system is now fully functional. Users can:
- ✅ Register new accounts
- ✅ Login to existing accounts
- ✅ Access protected chat page
- ✅ Be automatically redirected based on auth status
- ✅ Logout securely
- ✅ Stay logged in across browser sessions

The system is ready for production use with proper error handling and security measures in place.