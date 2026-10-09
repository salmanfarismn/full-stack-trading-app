# Zerodha Clone — Full-Stack Trading Platform

A production-grade, full-stack stock trading platform inspired by Zerodha's Kite web interface. Built using a modern three-tier architecture with React, Node.js, Express, and MongoDB, featuring secure JWT authentication, real-time portfolio tracking, interactive financial charting, and order execution workflows.

> **Disclaimer:** This project is an independent educational clone developed solely for learning and portfolio demonstration purposes. It is neither affiliated with, endorsed by, nor connected to Zerodha Broking Limited or any official Zerodha products.

---

## 📌 Table of Contents

- [Live Deployments](#-live-deployments)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Repository Structure](#-repository-structure)
- [Technology Stack](#-technology-stack)
- [API Reference](#-api-reference)
- [Environment Configuration](#-environment-configuration)
- [Local Development Setup](#-local-development-setup)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

## 🌐 Live Deployments

| Component | Service | Live URL |
| :--- | :--- | :--- |
| **Frontend (Marketing & Auth)** | AWS Amplify | [https://main.d3sp359p7k5wy0.amplifyapp.com](https://main.d3sp359p7k5wy0.amplifyapp.com) |
| **Trading Dashboard** | Vercel | [https://full-stack-trading-app-mauve.vercel.app](https://full-stack-trading-app-mauve.vercel.app) |
| **Backend REST API** | Render | [https://full-stack-trading-app-nyyt.onrender.com](https://full-stack-trading-app-nyyt.onrender.com) |

---

## ✨ Key Features

### 1. Authentication & Session Management
- **Secure Registration & Login:** User onboarding with email validation, unique constraint checks, and password minimum strength checks.
- **Bcrypt Password Hashing:** Salted password encryption using 12 salt rounds before database persistence.
- **JWT & HTTP-Only Cookies:** Token generation using JSON Web Tokens transmitted via secure, `httpOnly`, cross-origin (`SameSite=None; Secure=true`) cookies.
- **Session Verification Middleware:** Automated token verification on protected routes with automatic redirection to login upon expiry or unauthorized access.

### 2. Public Portal & Onboarding (`frontend/`)
- **Zerodha Kite Landing Ecosystem:** Pixel-accurate landing page with dynamic UI sections (Hero, Ecosystem, Pricing Preview, Education).
- **Dedicated Information Hubs:** Comprehensive About, Products, Pricing, and Support ticketing overview pages.
- **Interactive Auth Flows:** Client-side validation, Toast notifications for user feedback (`react-toastify`), and cross-domain redirect to the trading dashboard upon successful authentication.

### 3. Trading Dashboard (`dashboard/`)
- **Kite-Style TopBar:** Live index indicators for NIFTY 50 and SENSEX, quick navigation, account user ID, and logout trigger.
- **Stock Watchlist:** Left sidebar watchlist showing instruments, current prices, and percentage changes with hover action triggers (**Buy**, **Sell**, **Chart**, **More**).
- **Summary & Portfolio Overview:** Investment breakdown displaying Equity and Commodity margins, total invested value, current market valuation, and overall P&L.
- **Holdings Management:** Detailed equity table showing Instrument, Quantity, Average Buy Price, Last Traded Price (LTP), Current Value, Net P&L (color-coded profit/loss), and Daily Change.
- **Open Positions:** Real-time view of open intraday and CNC product positions with P&L performance.
- **Order History:** Audit log of all placed trades detailing instrument name, quantity, executed price, total amount, and order mode (`BUY` / `SELL`).
- **Interactive Data Visualizations:** Vertical bar graphs and doughnut charts powered by Chart.js for asset distribution and portfolio performance.
- **Trade Execution Windows:** Floating, draggable order modal supporting custom quantity, limit price inputs, dynamic margin estimation, and one-click order placement.

---

## 🏗️ System Architecture

The project is structured as a decoupled multi-tier monorepo:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     Frontend (AWS Amplify)      │       │       Dashboard (Vercel)        │
│  - Landing Pages & Onboarding   │       │  - Portfolio, Watchlist, Orders │
│  - Login / Signup Authentication│       │  - Charts & Trading Modal       │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │                                         │
                 │ HTTP Credentials (withCredentials: true)│
                 ▼                                         ▼
         ┌─────────────────────────────────────────────────────────┐
         │              Backend REST API (Render)                  │
         │  - Express Router & Controllers                         │
         │  - JWT Middleware & Cookie Authentication               │
         │  - Order Execution & Portfolio Aggregation              │
         └───────────────────────────┬─────────────────────────────┘
                                     │ Mongoose ODM
                                     ▼
                         ┌───────────────────────┐
                         │     MongoDB Atlas     │
                         │  - Users & Sessions   │
                         │  - Holdings & Orders  │
                         │  - Market Positions   │
                         └───────────────────────┘
```

### Communication Flow:
1. **User Auth:** The user authenticates on the frontend. The backend validates credentials, signs a JWT, and sets an `httpOnly`, cross-domain cookie.
2. **Dashboard Access:** The user is redirected to the dashboard on Vercel. On mount, `Home.jsx` sends a session check to `GET /auth` with `withCredentials: true`. If valid, the dashboard renders; otherwise, the user is redirected to the frontend login page.
3. **Trading & Data:** The dashboard retrieves holdings (`GET /allHoldings`), positions (`GET /allPositions`), and orders (`GET /allOrders`), and posts new buy/sell transactions (`POST /newOrder`).

---

## 📁 Repository Structure

```
zerodha-clone/
├── backend/
│   ├── controllers/
│   │   └── AuthController.js        # Signup & login controllers
│   ├── middlewares/
│   │   └── AuthMiddleware.js        # JWT token verification middleware
│   ├── model/
│   │   ├── HoldingsModel.js         # Mongoose model for stock holdings
│   │   ├── OrdersModel.js           # Mongoose model for placed orders
│   │   ├── PositionsModel.js        # Mongoose model for open positions
│   │   └── UserModel.js             # Mongoose model for registered users
│   ├── routes/
│   │   └── AuthRoute.js             # Authentication route endpoints
│   ├── schemas/
│   │   ├── HoldingsSchema.js        # Holdings schema definition
│   │   ├── OrdersSchema.js          # Orders schema definition
│   │   ├── PositionsSchema.js       # Positions schema definition
│   │   └── UserSchema.js            # User schema with pre-save hashing
│   ├── util/
│   │   └── SecretToken.js           # JWT token generation helper
│   ├── index.js                     # Server entry point & CORS configuration
│   └── package.json                 # Backend dependencies & start scripts
│
├── dashboard/
│   ├── public/                      # Static assets & HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── BuyActionWindow.jsx  # Buy order modal
│   │   │   ├── Dashboard.jsx        # Dashboard nested routing & layout
│   │   │   ├── Funds.jsx            # Account funds & margin overview
│   │   │   ├── GeneralContext.jsx   # Global UI context (trade modal state)
│   │   │   ├── Holdings.jsx         # Equity holdings table & charts
│   │   │   ├── Home.jsx             # Auth verification gatekeeper
│   │   │   ├── Menu.jsx             # TopBar navigation & profile menu
│   │   │   ├── Orders.jsx           # Order book & trade history
│   │   │   ├── Positions.jsx        # Intraday / CNC positions table
│   │   │   ├── SellActionWindow.jsx # Sell order modal
│   │   │   ├── Summary.jsx          # Account summary & equity breakdown
│   │   │   ├── TopBar.jsx           # Header with market indices
│   │   │   ├── VerticalGraph.jsx    # Chart.js vertical bar chart
│   │   │   └── WatchList.jsx        # Stock watchlist sidebar
│   │   ├── data/
│   │   │   └── data.js              # Mock datasets for initialization
│   │   ├── index.css                # Dashboard styling system
│   │   └── index.js                 # Dashboard React root entry
│   └── package.json                 # Dashboard dependencies & scripts
│
├── frontend/
│   ├── public/                      # Public assets & HTML template
│   ├── src/
│   │   ├── landing_page/
│   │   │   ├── about/               # About page components
│   │   │   ├── auth/                # Login, Signup & Auth check components
│   │   │   ├── home/                # Landing page sections & Hero
│   │   │   ├── pricing/             # Brokerage & pricing models
│   │   │   ├── products/            # Zerodha tech stack showcase
│   │   │   ├── support/             # Helpdesk & support portal
│   │   │   ├── Footer.jsx           # Shared footer
│   │   │   ├── Navbar.jsx           # Public navigation bar
│   │   │   └── NotFound.jsx         # 404 handler
│   │   ├── index.css                # Global stylesheet
│   │   └── index.jsx                # Frontend React root & router
│   └── package.json                 # Frontend dependencies & scripts
│
├── .gitignore                       # Git ignore configuration
└── README.md                        # Project documentation
```

---

## 💻 Technology Stack

### Frontend Application (`frontend/`)
- **Core Library:** React 18
- **Routing:** React Router DOM (v7)
- **UI & Layout:** Bootstrap 5, Custom CSS
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **State & Cookies:** React Cookie

### Trading Dashboard (`dashboard/`)
- **Core Library:** React 18
- **Routing:** React Router DOM (v7)
- **Component Library:** Material-UI (MUI v5), Emotion
- **Icons:** Material Icons (`@mui/icons-material`)
- **Data Visualization:** Chart.js, React-Chartjs-2
- **HTTP Client:** Axios

### Backend REST API (`backend/`)
- **Runtime:** Node.js (CommonJS)
- **Web Framework:** Express 5
- **Database ODM:** Mongoose 9
- **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), Bcrypt password hashing
- **Cookie & Body Parsing:** `cookie-parser`, `body-parser`
- **CORS Management:** `cors` (configured with credentials and origin whitelist)
- **Environment Management:** `dotenv`
- **Development Tooling:** Nodemon

### Infrastructure & Cloud Services
- **Database:** MongoDB Atlas
- **Frontend Hosting:** AWS Amplify
- **Dashboard Hosting:** Vercel
- **Backend Hosting:** Render

---

## 📡 API Reference

Base URL (Production): `https://full-stack-trading-app-nyyt.onrender.com`  
Base URL (Local): `http://localhost:3002`

### 1. Authentication Endpoints

#### Register New User
- **Method:** `POST`
- **Endpoint:** `/signup`
- **Request Body:**
  ```json
  {
    "username": "trader_joe",
    "email": "trader@example.com",
    "password": "Password123"
  }
  ```
- **Responses:**
  - `201 Created`:
    ```json
    {
      "message": "User signed in successfully",
      "success": true,
      "user": {
        "id": "6705...",
        "email": "trader@example.com",
        "username": "trader_joe",
        "createdAt": "2026-10-09T00:00:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Field validation error or password under 8 characters.
  - `409 Conflict`: User with this email already exists.

#### User Login
- **Method:** `POST`
- **Endpoint:** `/login`
- **Request Body:**
  ```json
  {
    "email": "trader@example.com",
    "password": "Password123"
  }
  ```
- **Responses:**
  - `201 OK`:
    ```json
    {
      "message": "User loged in successfully!",
      "success": true
    }
    ```
    *(Sets secure `token` HTTP-only cookie)*
  - `200 / 400`: Invalid email or incorrect password.

#### Verify Session
- **Method:** `GET`
- **Endpoint:** `/auth`
- **Headers / Cookies:** Requires `token` cookie (`withCredentials: true`)
- **Responses:**
  - Success: `{"status": true, "user": "trader_joe"}`
  - Unauthorized: `{"status": false}`

#### Logout User
- **Method:** `POST`
- **Endpoint:** `/logout`
- **Responses:**
  - `200 OK`: `{"message": "Logged out successfully", "success": true}`  
    *(Clears `token` cookie)*

---

### 2. Market & Portfolio Endpoints

#### Retrieve Holdings
- **Method:** `GET`
- **Endpoint:** `/allHoldings`
- **Response Format:**
  ```json
  [
    {
      "_id": "6705...",
      "name": "INFY",
      "qty": 5,
      "avg": 1350.5,
      "price": 1555.45,
      "net": "+15.18%",
      "day": "-1.60%"
    }
  ]
  ```

#### Retrieve Open Positions
- **Method:** `GET`
- **Endpoint:** `/allPositions`
- **Response Format:**
  ```json
  [
    {
      "_id": "6705...",
      "product": "CNC",
      "name": "EVEREADY",
      "qty": 2,
      "avg": 316.27,
      "price": 312.35,
      "net": "+0.58%",
      "day": "-1.24%",
      "isLoss": true
    }
  ]
  ```

#### Retrieve Orders Book
- **Method:** `GET`
- **Endpoint:** `/allOrders`
- **Response Format:**
  ```json
  [
    {
      "_id": "6705...",
      "name": "RELIANCE",
      "qty": 10,
      "price": 2450.0,
      "mode": "BUY"
    }
  ]
  ```

#### Place New Trade Order
- **Method:** `POST`
- **Endpoint:** `/newOrder`
- **Request Body:**
  ```json
  {
    "name": "TCS",
    "qty": 2,
    "price": 3200.0,
    "mode": "BUY"
  }
  ```
- **Response:**
  - `200 OK`: `"Order placed!"`

---

## ⚙️ Environment Configuration

Ensure you create the appropriate `.env` files in their respective folders before running locally. **Never commit actual `.env` files or credentials to Git.**

### Backend (`backend/.env`)

```env
# Port on which the Express server listens
PORT=3002

# MongoDB Atlas connection string
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database_name>?retryWrites=true&w=majority

# Secret key used for signing and verifying JWT tokens
TOKEN_KEY=your_super_secret_jwt_key_here
```

### Dashboard (`dashboard/.env`)

```env
# Port on which the Dashboard React development server runs
PORT=3001
```

### Frontend (`frontend/.env` - Optional)

```env
# Default CRA port (leave as 3000)
PORT=3000
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js:** v18.x or later installed
- **npm:** v9.x or later
- **MongoDB:** Active MongoDB Atlas cluster or local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/salmanfarismn/full-stack-trading-app.git
cd full-stack-trading-app
```

### 2. Install Dependencies

You must install dependencies in all three application directories:

```bash
# Install backend dependencies
cd backend
npm install

# Install dashboard dependencies
cd ../dashboard
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to repository root
cd ..
```

### 3. Configure Environment Variables
Create a `.env` file in `backend/` using the template provided in [Environment Configuration](#backend-backendenv).

### 4. Run the Applications Locally

Open **three separate terminal windows** to execute all tiers concurrently:

#### Terminal 1 — Backend API Server
```bash
cd backend
npm start
```
*Runs with nodemon on `http://localhost:3002`.*

#### Terminal 2 — Trading Dashboard
```bash
cd dashboard
npm run dev
```
*Runs on `http://localhost:3001`.*

#### Terminal 3 — Frontend Public Portal
```bash
cd frontend
npm run dev
```
*Runs on `http://localhost:3000`.*

---

## 🚢 Deployment Guide

The platform is designed to be deployed across three specialized hosting providers:

### 1. Frontend on AWS Amplify
- **Repository Root:** Select the repository and set the app root directory to `frontend`.
- **Build Settings (`amplify.yml`):**
  - Base Directory: `build`
  - Pre-build command: `npm install`
  - Build command: `npm run build`
- **Output:** Static bundle served globally with automated SSL.

### 2. Dashboard on Vercel
- **Root Directory:** Set root directory to `dashboard`.
- **Framework Preset:** Create React App.
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Environment Variables:** Set `PORT=3001` if required.

### 3. Backend on Render
- **Environment:** Node.js Web Service.
- **Root Directory:** `backend`.
- **Build Command:** `npm install`.
- **Start Command:** `node index.js` (or `npm start`).
- **Environment Variables:** Add `PORT`, `MONGO_URL`, and `TOKEN_KEY` in the Render dashboard.

### Cross-Origin Authentication (CORS & Cookies)
When deploying each service to a different domain:
1. Ensure the backend CORS configuration in `backend/index.js` explicitly includes the production domains of the frontend and dashboard in its `origin` array:
   ```javascript
   app.use(cors({
     origin: [
       "https://main.d3sp359p7k5wy0.amplifyapp.com",
       "https://full-stack-trading-app-mauve.vercel.app"
     ],
     credentials: true
   }));
   ```
2. When creating cookies (`res.cookie`), the options `sameSite: "none"` and `secure: true` must be enabled to permit cross-domain browser cookie transmission over HTTPS.
3. Client-side HTTP requests must specify `withCredentials: true` with Axios.

---

## 🛠️ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **`MongooseServerSelectionError`** | MongoDB connection string is invalid or IP address is not whitelisted. | Verify `MONGO_URL` in `backend/.env`. In MongoDB Atlas, add your current IP address (or `0.0.0.0/0` for development) under **Network Access**. |
| **CORS Policy Error** | Request origin is not permitted by Express server. | Ensure the client origin URL (e.g., `http://localhost:3000` or production domain) is present in the `origin` array inside `backend/index.js`. |
| **Cross-Origin Cookie Not Persisting** | Cookies blocked due to mismatched `SameSite` or insecure HTTP transfer. | Ensure `res.cookie` uses `{ sameSite: "none", secure: true }` over HTTPS in production, and requests set `{ withCredentials: true }`. |
| **Port Conflict Error (`EADDRINUSE`)** | Multiple React or Express apps trying to bind to the same local port. | Confirm `frontend/` runs on port 3000, `dashboard/` runs on port 3001 (`PORT=3001` in `dashboard/.env`), and `backend/` runs on 3002. |
| **Dashboard Redirects to Login Constantly** | User session check `GET /auth` fails or cookie is missing. | Complete login on the frontend first so that the backend cookie is established, then ensure cookies are enabled in browser settings. |

---

## 🔮 Future Roadmap

- [ ] **Live WebSockets:** Integrate Socket.io to stream real-time price ticks and depth data to the Watchlist.
- [ ] **Paper Trading Engine:** Simulated wallet balances, order matching, and trade execution simulation.
- [ ] **Technical Analysis Charts:** Integrate TradingView Advanced Real-Time Chart widgets into the modal and holdings pages.
- [ ] **User Funds Processing:** Endpoints for deposits, withdrawals, and ledger transaction tracking.
- [ ] **Dynamic Search & Filtering:** Filter watchlist and holdings by symbol, exchange, and percent gainers/losers.
- [ ] **Automated Testing Suite:** Unit tests for controllers using Jest and end-to-end component testing with React Testing Library.

---

## 📄 License

This repository does not currently include a formal root open-source license (`Unlicensed / All Rights Reserved`). The `backend/package.json` file references an `ISC` license. If you intend to use or distribute this code, please contact the repository owner.
