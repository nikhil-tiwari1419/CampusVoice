# ComplainBoX - Setup & Server Connection Guide

## Project Overview
ComplainBoX is a Student Grievance & Redressal System with:
- **Frontend**: React + Vite (TailwindCSS, React Router)
- **Backend**: Node.js + Express (MongoDB, JWT Auth, Google OAuth)
- **Email Service**: Brevo SMTP

## Folder Structure
```
ClgProject/
├── ComplainBoX/                    # React Frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # Reusable components
│   │   ├── Layout/                 # Navigation & Footer
│   │   ├── api/                    # API calls
│   │   ├── context/                # Auth context
│   │   ├── App.jsx                 # Routes
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                         # Node.js Backend
    ├── src/
    │   ├── controller/             # Route handlers
    │   ├── routes/                 # API endpoints
    │   ├── middleware/             # Auth, validation, etc.
    │   ├── model/                  # MongoDB schemas
    │   ├── config/                 # Database, JWT, OAuth
    │   ├── utils/                  # Email, tokens, etc.
    │   ├── limiter/                # Rate limiting
    │   ├── seed/                   # Database seeding
    │   └── app.js
    ├── server.js                   # Entry point
    ├── package.json
    └── .env
```

## Prerequisites
- Node.js v16+ & npm/pnpm
- MongoDB Atlas account (free tier)
- Google OAuth credentials (for social login)
- Brevo API key (free tier for email)

## Backend Setup (Server)

### 1. Environment Variables
Create `.env` file in `server/`:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/complainbox?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/oauth/google/callback

# Email (Brevo)
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_API_KEY=your-brevo-api-key

# Client
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000/api/oauth/google/callback` as redirect URI
6. Copy Client ID & Secret to `.env`

### 3. Get Brevo (Sendinblue) API Key
1. Sign up at [Brevo](https://www.brevo.com/)
2. Go to Settings → SMTP & API
3. Copy API v3 key to `.env`

### 4. Install Dependencies
```bash
cd server
pnpm install
```

### 5. Start Server
```bash
pnpm dev
```
Server runs on `http://localhost:3000`

### Database Seeding (Optional)
Uncomment and run seed file to populate Programs/Branches/Batches:
```bash
cd server
node src/seed/run.js
```

## Frontend Setup (React)

### 1. Environment Variables
Create `.env` file in `ComplainBoX/`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Install Dependencies
```bash
cd ComplainBoX
pnpm install
```

### 3. Start Dev Server
```bash
pnpm dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication (`/api/auth`)
```
POST   /register              - Register new user
POST   /verify-email          - Verify email with OTP
POST   /login                 - Login user
POST   /logout                - Logout user
POST   /forgot-pass           - Request password reset OTP
POST   /reset-pass            - Reset password with OTP
POST   /refresh-token         - Refresh access token
GET    /is-auth               - Check if authenticated
```

### User Profile (`/api/user`)
```
GET    /get-profile           - Get user profile
PATCH  /Complet-profile       - Update profile (batch, sem, phone)
GET    /allcomplain           - Get all complaints
GET    /programs              - Get all programs
GET    /branches/:programId   - Get branches by program
GET    /batches               - Get batches by program/branch/year
```

### Complaints (`/api/send`)
```
POST   /complain              - Submit complaint
```

### Google OAuth (`/api/oauth`)
```
GET    /google                - Initiate Google login
GET    /google/callback       - Google callback (auto-handled)
GET    /profile               - Get Google profile
GET    /logout                - Logout Google session
```

## File Structure for New Controllers

### Example: Create new controller
`server/src/controller/example.controller.js`:
```javascript
export async function exampleFunction(req, res) {
  try {
    // Your logic here
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ success: false, message: "Error message" })
  }
}
```

### Example: Create new route
`server/src/routes/example.routes.js`:
```javascript
import express from 'express'
import { exampleFunction } from '../controller/example.controller.js'
import { authUser } from '../middleware/auth.middelware.js'

const router = express.Router()
router.post('/endpoint', authUser, exampleFunction)
export default router
```

### Register route in `server/src/app.js`:
```javascript
import exampleRoutes from './routes/example.routes.js'
app.use('/api/example', exampleRoutes)
```

## Frontend: Using API Calls

### Example in components:
```javascript
import { submitComplaint } from '../api/newcomplain'
import toast from 'react-hot-toast'

async function handleSubmit(data) {
  try {
    const result = await submitComplaint(data)
    toast.success('Complaint submitted!')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error')
  }
}
```

## Database Models

### User Schema
```
- username (String, required)
- email (String, unique, required)
- password (String, hashed)
- role (String: 'user' | 'admin')
- isVerified (Boolean)
- isProfileComplete (Boolean)
- batch (ObjectId → Batch)
- sem (Number: 1-8)
- phone (Number)
- provider (String: 'local' | 'google')
```

### Complaint Schema
```
- user (ObjectId → User)
- batch (ObjectId → Batch)
- subject (String)
- message (String, required)
- status (String: 'new' | 'read' | 'resolved')
- timestamps (createdAt, updatedAt)
```

### Program Schema
```
- name (String, unique, required)
- numYears (Number)
- hasBranches (Boolean, default: false)
```

### Batch Schema
```
- program (ObjectId → Program)
- branch (ObjectId → Branch, nullable)
- year (Number: 1-4)
```

## Common Errors & Solutions

### "CORS error"
**Solution**: Check `CLIENT_URL` in server `.env` matches frontend URL

### "MongoDB connection failed"
**Solution**: Check `MONGO_URI` - make sure IP is whitelisted in MongoDB Atlas

### "OTP not sending"
**Solution**: Verify `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` in `.env`

### "Google OAuth redirect mismatch"
**Solution**: Ensure `GOOGLE_CALLBACK_URL` matches Google Console settings

## Testing Workflow

1. **Register**: Go to `/login`, create account
2. **Verify Email**: Enter OTP sent to email
3. **Complete Profile**: Select Program/Branch/Year/Sem/Phone
4. **File Complaint**: Go to `/complain`, submit grievance
5. **Track**: View on `/userhome` dashboard
6. **Admin View**: Login as admin → `/adminhome` to see all complaints

## Deployment Checklist

- [ ] Update `CLIENT_URL` to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (min 32 chars)
- [ ] Configure HTTPS/SSL
- [ ] Update Google OAuth redirect URI
- [ ] Set up MongoDB backups
- [ ] Configure email rate limits
- [ ] Test all auth flows
- [ ] Deploy backend (Heroku, Railway, Render)
- [ ] Deploy frontend (Vercel, Netlify)

## Need Help?

Check these files for implementation details:
- **Auth Flow**: `server/src/controller/auth.controller.js`
- **Middleware**: `server/src/middleware/auth.middelware.js`
- **Email Templates**: `server/src/utils/mailer.js`
- **Frontend Auth**: `ComplainBoX/src/context/auth.jsx`
