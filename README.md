# 🛒 E-commerce Backend (Node.js)

## Overview
A production-ready backend for an e-commerce platform built with Node.js and Express.  
Features include category, subcategory, brand management, authentication, cart, coupon handling, and Stripe payment processing.

## Features
- Category & Subcategory CRUD
- Brand management
- RESTful API design
- JWT Authentication (Access & Refresh tokens)
- Refresh token storage in Redis
- Cart management (add, update, remove items)
- Coupon system (validation, expiration, usage limits)
- Stripe payment integration (Checkout sessions & success verification)

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis (for refresh tokens and caching)
- Stripe API

## Environment Variables
Ensure the following variables are set in your `.env` file:
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```


## Installation
```bash
git clone https://github.com/username/ecommerce-backend.git
cd ecommerce-backend
npm install
npm run auto
```

## API Documentation Link  
[Server_base_url]/api-docs/

## Contributing & License  
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
