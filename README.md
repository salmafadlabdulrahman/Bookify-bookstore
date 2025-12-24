# 📚 Bookify - Modern Bookstore E-commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/Version-10.0-purple" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React">
  <img src="https://img.shields.io/badge/MongoDB-6+-green" alt="MongoDB">
  
  <h3>Curated reads and community events delivered to your door.</h3>
  <p>A comprehensive full-stack web application for modern Book shopping, with a dynamic admin dashboard, searching and filtering features.</p>
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)

## 🌟 Overview

**Bookify** is a feature-rich, responsive online bookstore built with the MERN stack (MongoDB, Express, React, Node.js). The platform offers a complete book shopping experience with modern design, secure authentication, and comprehensive e-commerce functionality for both readers and administrators.

## ✨ Core Features Breakdown

### 🎨 Modern & Responsive Design
- Clean, minimalist UI following modern design principles
- Smooth animations and transitions for enhanced user experience
- Accessibility compliant with proper ARIA labels and keyboard navigation


### 👥 Dual-Role Authentication System
- **User Features**:
  - Persistent login sessions with JWT tokens
  - Profile management with order history and preferences
    
- **Admin Features**:
  - Protected admin routes with role-based access control
  - Dashboard analytics for store performance
  - Complete inventory management capabilities
  - Order processing and customer management tools


### 🛍️ Advanced Product Discovery
- **Search & Filter System**:
  - Real-time search with debounced input
  - filtering by:
  - price
  - Book title
 

### 🛒 Smart Shopping Cart
- **Cart Management**:
  - Persistent cart across sessions
  - Real-time quantity updates with stock validation
  - Add/remove items with instant feedback
  - Save for later functionality

### 💳 Secure Checkout Process
- **Multi-step Checkout**:
  - Cart review with item verification
  - Shipping information with address validation
  - Payment method selection
  - Order confirmation
  - Stripe Integration


### Screenshot

### Home Page
<img width="1868" height="857" alt="لقطة شاشة 2025-12-16 205903" src="https://github.com/user-attachments/assets/f2a9f7a9-48e5-4aaf-806a-a74c899a7ff6" />

### Register Page
<img width="1511" height="809" alt="لقطة شاشة 2025-12-16 205915" src="https://github.com/user-attachments/assets/eebc39cb-16fd-4e1a-b393-a212225fdb71" />

### Products Page
<img width="1861" height="975" alt="لقطة شاشة 2025-12-16 210008" src="https://github.com/user-attachments/assets/2727a6b6-678d-4368-a77e-d2289adbb306" />

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Token-based authentication |
| **Stripe** | Payment processing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first CSS |
| **Material-UI** | Additional components |
| **react-i18next** | Internationalization |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client |
| **Framer Motion** | Animations |
| **React Hook Form** | Form management |

### Test
- Run the frontend with (npm run dev)
- Run the backend with (npm run dev)
