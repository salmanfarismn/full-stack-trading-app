# Zerodha Clone

A full-stack stock trading platform clone built with React, Node.js, Express, and MongoDB.

## 📁 Project Structure

```
zerodha-clone/
├── backend/          # Express.js API server
├── dashboard/        # Trading dashboard
├── frontend/         # Landing page & auth
└── README.md
```

## 🏗️ Architecture

**Three-Tier Setup:**
- **Frontend** (port 3000): React landing page + authentication
- **Dashboard** (port 3000): React trading dashboard  
- **Backend** (port 3002): Express.js REST API

## 🔧 Backend - `backend/`

Node.js Express server with MongoDB integration.

**Structure:**
- `index.js` - Server initialization
- `controllers/AuthController.js` - Auth logic
- `routes/AuthRoute.js` - API endpoints
- `middlewares/AuthMiddleware.js` - JWT verification
- `model/` - Database models (User, Holdings, Orders, Positions)
- `schemas/` - Mongoose schemas
- `util/SecretToken.js` - JWT utilities

**Key Dependencies:**
- express, mongoose, jsonwebtoken, bcrypt, cors, dotenv

**Setup:**
```bash
cd backend
npm install
# Create .env with PORT=3002 and MONGO_URL
npm start
```

## 💻 Dashboard - `dashboard/`

React trading interface with Material-UI and Chart.js.

**Key Components:**
- `Dashboard.jsx` - Main router & layout
- `Summary.jsx` - Portfolio overview
- `Holdings.jsx` - Stock holdings
- `Positions.jsx` - Open trades
- `Orders.jsx` - Order history
- `Funds.jsx` - Account funds
- `WatchList.jsx` - Stock watchlist
- `Chart.jsx` / `DoughnutChart.jsx` / `VerticalGraph.jsx` - Charts
- `BuyActionWindow.jsx` / `SellActionWindow.jsx` - Trade modals
- `GeneralContext.jsx` - Global state

**Data:**
- Uses sample/mock data from `data/data.js`

**Setup:**
```bash
cd dashboard
npm install
npm run dev
```

## 🌐 Frontend - `frontend/`

React landing page with Bootstrap.

**Key Pages:**
- `landing_page/home/` - Homepage
- `landing_page/about/` - About page
- `landing_page/pricing/` - Pricing page
- `landing_page/products/` - Products page
- `landing_page/support/` - Support page
- `landing_page/auth/` - Login & Signup

**Setup:**
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Authentication

- JWT-based token authentication
- Bcrypt password hashing
- Cookies for token storage
- Protected dashboard routes

**Flow:**
1. User registers/logs in via frontend
2. Backend validates & creates JWT token
3. Token stored in cookies
4. Dashboard verifies token for access

## 📊 Features

- User registration & login
- Portfolio dashboard with summary
- View holdings & positions
- Order history tracking
- Fund management
- Stock watchlist
- Portfolio charts & visualizations
- Buy/Sell trading functionality
- Responsive design

## 🚀 Quick Start

```bash
# Terminal 1 - Backend
cd backend && npm install && npm start

# Terminal 2 - Dashboard  
cd dashboard && npm install && npm run dev

# Terminal 3 - Frontend
cd frontend && npm install && npm run dev
```

Access at:
- Frontend: `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard`
- API: `http://localhost:3002`

## 📚 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Bootstrap, React Router |
| Dashboard | React, Material-UI, Chart.js |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, Bcrypt |

## 📄 License

ISC
