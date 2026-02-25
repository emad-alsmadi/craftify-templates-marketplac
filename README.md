# Book Store App (Full‑Stack) — Next.js + Node.js/Express + MongoDB

A modern full‑stack Book Store application built with a **Next.js (App Router)** frontend and a **Node.js/Express** REST API backend.  
The project includes a polished UI, JWT authentication, cookie-based session persistence on the client, role-based route protection via Next.js Middleware, and a complete password reset flow with email delivery (Nodemailer + SMTP).

---

## Features

### Frontend (Next.js)
- **Next.js App Router** application (dedicated [frontend/](cci:9://file:///c:/Users/Abdalmoute/OneDrive/Desktop/book_store_app/frontend:0:0-0:0) folder)
- Modern responsive UI:
  - TailwindCSS styling
  - Framer Motion animations
  - Radix UI primitives
  - Lucide icons
- **Redux Toolkit** state management
- **Axios API client** with an interceptor that automatically attaches:
  - `Authorization: Bearer <token>`
- Authentication UI flows:
  - Login
  - Signup
  - Profile & Edit Profile pages (Edit profile UI is currently a placeholder)
  - Logout (client-side cookie/session clearing)
- Password recovery UI:
  - Forgot password form
  - “Check your email” confirmation page
  - Reset password page (token + userId in URL)
- Role-based user experience:
  - Unauthorized page for blocked routes
  - Next.js Middleware redirects based on auth & role

### Backend (Node.js/Express)
- REST API under `/api`
- MongoDB persistence (Mongoose)
- **JWT authentication (stateless)**
  - API expects tokens in the **Authorization header** (Bearer)
  - No server-side sessions
- Password reset flow with Nodemailer:
  - **Forgot password** generates a short-lived reset token and emails the reset link
  - **Reset password** verifies token and updates user password securely
  - Supports **Gmail** or **custom SMTP** via environment variables
  - Hardened behavior to avoid server crashes on email delivery issues

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- Redux Toolkit
- Axios
- TailwindCSS
- Framer Motion
- Radix UI
- Zod + React Hook Form

### Backend
- Node.js / Express
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Nodemailer
- CORS

---

## Authentication Model (How it Works)

### Token delivery
- The backend returns a JWT token in JSON responses (login/register).
- The frontend stores auth state in **non-httpOnly cookies**:
  - `token` — JWT token
  - `userRole` — role string (ex: `admin`, `user`, `moderator`)

### API authorization
- The frontend attaches the JWT to API requests using:
  - `Authorization: Bearer <token>`

### Route protection (Next.js Middleware)
- The Next.js [middleware.ts](cci:7://file:///c:/Users/Abdalmoute/OneDrive/Desktop/book_store_app/frontend/middleware.ts:0:0-0:0) checks the cookies on navigation:
  - If a route is protected and `token/userRole` are missing → redirect to [/login](cci:9://file:///c:/Users/Abdalmoute/OneDrive/Desktop/book_store_app/frontend/src/app/login:0:0-0:0)
  - If the user role does not match required role → redirect to [/unauthorized](cci:9://file:///c:/Users/Abdalmoute/OneDrive/Desktop/book_store_app/frontend/src/app/unauthorized:0:0-0:0)

> Note: Because cookies are non-httpOnly, this approach is optimized for simple role-based UX routing and client-managed sessions.

---

## Password Reset (Single‑Use Link)

The reset link is designed to become invalid after a successful password change.

- A reset JWT is generated using a dynamic secret:
  - `resetSecret = JWT_SECRET_KEY + user.passwordHash`
- Once the password changes, the password hash changes → the old reset token can no longer be verified.
- Tokens expire quickly (short TTL) for additional safety.

---

## Project Structure
