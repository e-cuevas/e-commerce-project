# Wine E-Commerce Website

## Project Purpose

This project is a **Wine E-Commerce Website** designed to provide users with a seamless online shopping experience for wines. The application allows users to browse, search, and purchase wines, manage their shopping cart, and handle user authentication.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Hosting:**
  - **Frontend:** Deployable to any static hosting (e.g., 20i, Netlify, Vercel)
  - **Backend:** Hosted on [Render](https://render.com)
- **Architecture:** MERN-style (React for frontend, Node/Express for backend, MySQL as database)

## Features

- Browse a catalog of wines with images and details
- Search and filter wines
- Add wines to a shopping cart and manage quantities
- User registration and login (authentication)
- Favorites management
- Responsive design for desktop and mobile
- Backend API for all data operations

## Project Structure

```
/frontend # React app (UI, cart, search, etc.)
/backend # Node.js + Express API (routes, auth, DB connection)
README.md # Project overview and instructions
```
## How It Works

- The **frontend** (React) fetches wine data and handles user interactions.
- The **backend** (Node.js/Express) provides RESTful API endpoints for wines, users, authentication, and cart management.
- **MySQL** stores all persistent data (wines, users, orders, etc.).
- The backend is deployed on **Render**, making it accessible to the frontend via API calls.

## Getting Started

1. Clone the repository.
2. Install dependencies in both `/frontend` and `/backend`.
3. Set up your `.env` files for both frontend and backend.
4. Run the backend and frontend locally for development.
5. Deploy the backend to Render and the frontend to your preferred static hosting.

---

**This project demonstrates a full-stack e-commerce solution using modern web technologies, with a focus on clean architecture, scalability, and user experience.**
