# ShopSphere - Production-Ready Full-Stack E-Commerce Platform

![ShopSphere Banner](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80)

**ShopSphere** is a feature-packed, production-ready full-stack e-commerce web application built using modern web architecture: **React 18, Vite, Tailwind CSS, Node.js, Express.js, MongoDB Atlas (Mongoose), JWT Authentication, bcrypt, Cloudinary, and Vercel Serverless Functions**.

---

## 🚀 Key Features & Capabilities

### 🔐 Authentication & Roles
- **Dual User Roles**: Customer & Administrator.
- **Security**: Password hashing via `bcryptjs`, JWT token authorization, protected API routes, and rate-limiting.
- **One-Click Demo Login**: Easy one-click buttons on the login screen for testing both Customer and Admin roles.
- **Forgot & Reset Password**: Token-based email recovery flow.

### 🛍️ Customer Shopping Experience
- **Vibrant Modern UI**: Glassmorphism aesthetic, dark/light mode toggle, smooth Framer Motion micro-interactions.
- **Product Catalog**: Multi-facet filter (Category, Price range slider, Brand, Minimum rating, Stock availability), instant search bar with live suggestions dropdown, and multiple sorting methods.
- **Interactive Product Detail**: Image magnifier zoom view, technical specifications tab, verified customer reviews & star ratings, related products carousel.
- **Shopping Cart & Checkout**: Real-time tax/shipping calculations, promo coupon support (`WELCOME10`, `SAVER20`), save for later items, multi-address selector, and mock Stripe Credit Card payment gateway + Cash On Delivery.
- **Order Management & Invoicing**: Real-time order progress timeline (Pending &rarr; Confirmed &rarr; Packed &rarr; Shipped &rarr; Delivered) and **instant PDF Invoice generation & download**.
- **Product Comparison**: Side-by-side comparison of up to 4 products (prices, ratings, specs, stock levels).

### 🛡️ Admin Dashboard & Analytics
- **Executive KPI Cards**: Total Users, Total Orders, Total Revenue ($ USD), and Active Products count.
- **Sales Analytics Chart**: Visual revenue trend graph powered by `Recharts`.
- **Product Management (CRUD)**: Create and update products with image upload, discount percentage, SKU, specifications, and low-stock alerts.
- **Order Workflow**: Manage customer order status transitions and assign shipment tracking numbers.
- **Data Export**: Export orders report directly to **CSV format**.
- **Coupons & Department Management**: Admin controls for promotional promo codes and store departments.

---

## 🔑 Demo Account Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@shopsphere.com` | `Admin@123456` |
| **Customer** | `customer@shopsphere.com` | `Customer@123456` |

---

## 💻 Local Setup & Installation

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB server or MongoDB Atlas URI string

### 1. Clone & Install Dependencies
```bash
# Install root, backend, and client dependencies
npm run build
```

### 2. Environment Configuration
Copy `.env.example` to `.env` in the root or `backend` folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/shopsphere
JWT_SECRET=shopsphere_super_secret_jwt_key_2026_production_ready
JWT_EXPIRE=30d
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database
Pre-populate the database with demo Admin, Customer, 10 Categories, 16+ Products, Sample Orders, Reviews & Coupons:
```bash
npm run seed
```

### 4. Run Application locally
Start both backend API server (Port 5000) and Vite React frontend (Port 3000) concurrently:
```bash
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## ⚡ Deployment Guide (Vercel + MongoDB Atlas)

Please refer to [`Deployment.md`](./Deployment.md) for full step-by-step instructions on deploying the project seamlessly to **Vercel** as Serverless Functions and connecting to **MongoDB Atlas**.


## Features

- User Authentication
- Product Management
- Shopping Cart
- Order Management
- Admin Dashboard
- Responsive UI

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB