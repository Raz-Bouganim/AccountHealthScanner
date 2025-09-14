# Account Health Scanner 🛡️

A full stack security dashboard I built to practice React and Node.js while learning about enterprise security concepts. This app scans user accounts for security risks and displays them in a clean, modern interface.

> **Personal Learning Project** – Built this while studying React and Node.js, and preparing for job interviews.

## What it does

The app automatically scans user accounts and flags potential security issues. It checks things like inactive accounts, old passwords, failed login attempts, and missing two factor authentication. Everything gets categorized by risk level and displayed in an easy-to-read dashboard.

**Security checks include:**
Password age monitoring, inactive account detection, failed login tracking, MFA compliance checking, privileged account validation, and account status verification.

The scanning engine uses configurable rules and assigns risk levels from Low to Critical based on what it finds.

## Tech Stack

**Frontend:** React 19.1.1, Vite, Tailwind CSS 4.1.13, Lucide React icons, Axios for API calls

**Backend:** Node.js with Express 5.1.0, CORS configuration, dotenv for environment variables, node-cron for scheduling, UUID generation

**Development:** ESLint for code quality, Nodemon for auto-restart, Concurrently to run both servers

## Getting Started

You'll need Node.js (v18+) and npm installed.

**Clone and install:**
```bash
git clone https://github.com/yourusername/account-health-scanner.git
cd account-health-scanner

# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

**Environment setup:**

Backend `.env`:
```env
PORT=5000
NODE_ENV=development
```

Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Run the app:**
```bash
# From backend directory (runs both servers)
npm run dev:fullstack
```

Or run them separately:
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev
```

Visit http://localhost:5173 for the app, http://localhost:5000/api for the API.

## API Endpoints

**Accounts:**
- `GET /api/accounts` - Get all accounts with scan results
- `GET /api/accounts/:id` - Get specific account
- `GET /api/health` - Health check

**Scanning:**
- `POST /api/scan/trigger` - Run a manual scan
- `GET /api/scan/summary` - Get scan statistics

## How it's organized

```
account-health-scanner/
├── backend/
│   ├── routes/          # API routes for accounts and scanning
│   ├── utils/           # Core scanning logic and rules
│   ├── data/            # Sample account data
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/  # React components for UI
│   │   ├── utils/       # API calls and data structures
│   │   └── App.jsx      # Main app component
└── README.md
```

## Configuration

The security rules are configurable in `backend/utils/scanner.js`:

```javascript
this.rulesConfig = {
  inactiveThresholdDays: 90,
  passwordAgeThresholdDays: 180,
  maxFailedAttempts: 3,
  requireMFA: true,
};
```

Risk levels work like this: Critical for admin accounts with issues, High for inactive/disabled accounts or too many failed logins, Medium for expired passwords or missing MFA, and Low for clean accounts.

## What I learned building this

**React skills:** Modern hooks, state management, component design, API integration, responsive layouts with Tailwind

**Node.js backend:** RESTful API design, Express middleware, JSON data processing, error handling, security rule implementation  

**Full-stack integration:** Client-server communication, state synchronization, development workflow with modern tooling

**Security concepts:** Risk assessment algorithms, compliance monitoring, enterprise security patterns

## Available Scripts

**Backend:**
```bash
npm start              # Production server
npm run dev            # Development with nodemon  
npm run dev:fullstack  # Run both backend and frontend
```

**Frontend:**
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

