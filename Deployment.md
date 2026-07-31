# Vercel & MongoDB Atlas Deployment Guide for ShopSphere

This document explains how to deploy **ShopSphere** to **Vercel** using Vercel Serverless Functions for Express API routes and static hosting for the React Vite frontend.

---

## 1. MongoDB Atlas Configuration

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, add IP Address `0.0.0.0/0` (Allows Vercel Serverless Functions to connect).
3. Under **Database Access**, create a database user (e.g. `shopsphere_user` with a strong password).
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopsphere?retryWrites=true&w=majority
   ```

---

## 2. Vercel Deployment Steps

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root directory:
   ```bash
   vercel
   ```

4. Set Environment Variables in Vercel Dashboard under **Project Settings &rarr; Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random secret string
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: `/api`

5. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 3. Architecture & Rewrite Rules (`vercel.json`)

The application is pre-configured with `vercel.json`:
- All `/api/*` routes are handled by `api/index.js` (Serverless Function delegating to Express).
- All static assets and client-side single page app (SPA) routes are served from `client/dist`.

---

## 4. Seeding Production Database

To populate your MongoDB Atlas cluster with demo products and accounts, run locally with your Atlas URI:
```bash
MONGODB_URI="your_atlas_connection_string" npm run seed
```
