# ShopSphere - Full-Stack E-Commerce Platform

**ShopSphere** is a full-stack e-commerce web application built with **React 18, Vite, Tailwind CSS, Node.js, Express, MongoDB Atlas (Mongoose), JWT authentication, bcrypt, Cloudinary and Vercel Serverless Functions**.

## Features

- Customer and Admin roles with JWT auth, bcrypt hashing, rate limiting
- Product catalog with filters, live search, sorting
- Product detail page with zoom, specs, reviews, related products
- Cart, coupons (`WELCOME10`, `SAVER20`), checkout with mock card payment and Cash On Delivery
- Order tracking timeline and PDF invoice download
- Product comparison (up to 4 products)
- Admin dashboard with KPI cards, Recharts sales chart, product CRUD, order management, CSV export, coupons and categories
- Dark/light mode and Framer Motion animations

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT, bcryptjs |
| Media | Cloudinary (optional) |
| Hosting | Vercel |

## Demo Accounts (after seeding)

| Role | Email | Password |
| :--- | :--- | :--- |
| Admin | `admin@shopsphere.com` | `Admin@123456` |
| Customer | `customer@shopsphere.com` | `Customer@123456` |

## Local Setup

Prerequisites: Node.js 18+ and MongoDB (local or Atlas).

```bash
npm run build
copy .env.example .env
npm run seed
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable | Required | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Long random secret (generate your own) |
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | No | Local API port (default 5000) |
| `CLIENT_URL` | Recommended | Deployed frontend URL (CORS) |
| `VITE_API_URL` | No | `/api` in production |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | No | Cloudinary image uploads |

## Deployment

See [Deployment.md](./Deployment.md) for deploying on Vercel with MongoDB Atlas.

## License

MIT
