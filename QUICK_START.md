# Quick Start Guide - ComplainBoX

## 🚀 Fast Setup (5 minutes)

### Step 1: Update Server .env with Real Credentials

Go to `server/.env` and replace:

```env
# 1. MongoDB Atlas - Get Free Cluster
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/complainbox?retryWrites=true&w=majority

# 2. Google OAuth - Get from Google Cloud Console
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:3000/api/oauth/google/callback

# 3. Brevo Email - Get Free Account
BREVO_SENDER_EMAIL=your-verified-email@brevo.com
BREVO_API_KEY=xsib_xxxxxxxxxxxxx
```

### Step 2: Start Backend (Terminal 1)

```bash
cd server
pnpm install
pnpm dev
```

✅ Should see: `Server is running on port 3000`

### Step 3: Start Frontend (Terminal 2)

```bash
cd ComplainBoX
pnpm install
pnpm dev
```

✅ Should see: `Local: http://localhost:5173`

### Step 4: Test the App

1. Open http://localhost:5173
2. Click "Create Account"
3. Fill in details and register
4. Check console/email for OTP
5. Verify email
6. Login
7. Complete profile (select Program/Batch/Semester)
8. File a complaint

---

## 📋 API Endpoints Created

### ✅ Already Working:
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login
- POST `/api/auth/verify-email` - Verify OTP
- GET `/api/auth/is-auth` - Check auth status
- POST `/api/send/complain` - Submit complaint
- GET `/api/user/get-profile` - Get user profile
- PATCH `/api/user/Complet-profile` - Update profile

### ✨ Just Added:
- GET `/api/user/programs` - Get all programs
- GET `/api/user/branches/:programId` - Get branches by program
- GET `/api/user/batches` - Get batches by program/branch/year
- GET `/api/user/allcomplain` - Get all complaints

---

## 🔧 Get Real Credentials (2 min each)

### MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster → Shared
4. Add IP 0.0.0.0/0 (for local dev)
5. Create user → Copy connection string

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create new project
3. Search "Google+ API" → Enable
4. Credentials → OAuth 2.0 Client ID
5. Type: Web application
6. Authorized redirect: `http://localhost:3000/api/oauth/google/callback`
7. Copy Client ID & Secret

### Brevo (Email)
1. Go to https://www.brevo.com/ → Sign up
2. Verify your email domain
3. Settings → SMTP & API
4. Copy REST API v3 key
5. Add verified sender email

---

## 🗂️ Files Created

### Backend Controllers:
- `server/src/controller/program.controller.js` - Program/Branch/Batch logic

### Backend Routes:
- `server/src/routes/program.routes.js` - Program endpoints

### Frontend API:
- `ComplainBoX/src/api/newcomplain.js` - Submit & track complaints
- `ComplainBoX/src/api/allComplain.js` - Fetch all complaints
- `ComplainBoX/src/api/allusers.js` - User profile & programs

### Config:
- `ComplainBoX/.env` - Frontend config
- `server/.env` - Backend config

---

## 🎯 Complete User Flow

```
User → Register
   ↓
   → Verify Email (OTP)
   ↓
   → Login
   ↓
   → Complete Profile (Select Program/Batch/Semester)
   ↓
   → Dashboard (View Stats)
   ↓
   → File Complaint
   ↓
   → Track Complaint Status
   ↓
   → Admin Views All Complaints (if admin role)
```

---

## ⚠️ Troubleshooting

**Server won't start?**
```bash
# Check if port 3000 is free
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

**CORS Error?**
- Make sure `CLIENT_URL` in server/.env matches frontend URL
- Check `VITE_API_URL` in frontend/.env matches backend URL

**MongoDB Connection Failed?**
- Check IP whitelist in MongoDB Atlas
- Verify username/password in connection string

**Email not sending?**
- Verify `BREVO_API_KEY` is correct
- Check `BREVO_SENDER_EMAIL` is verified in Brevo

**Google login not working?**
- Verify redirect URI matches exactly
- Check OAuth credentials are for Web app

---

## 📊 Database Structure Ready

```
Programs (e.g., BCA, BSc)
  ├── Branches (e.g., Data Science, Physics)
  │   └── Batches (Year 1, 2, 3, 4)
  │       └── Students (Complete profile with batch)
  │           └── Complaints (Submit & Track)
```

---

## 🚀 You're Ready!

All files are created and connected. Just add your credentials and run:

```bash
# Terminal 1
cd server && pnpm dev

# Terminal 2  
cd ComplainBoX && pnpm dev
```

Visit: http://localhost:5173 🎉
