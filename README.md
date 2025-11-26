# BuySmart API 

**BuySmart API** is a production-ready **E-Commerce Backend** built with **Node.js, Express, and MongoDB**. It provides secure and efficient APIs for products, orders, cart, user management, and admin analytics. This project demonstrates advanced backend concepts like JWT authentication, role-based access, transactions, and aggregation pipelines.

---

##  Features

### User Authentication & Authorization
- Register and login with **JWT token authentication**
- **Role-based access control**: admin vs normal user
- Protected routes to ensure data security

### Product Management
- CRUD operations for products
- Pagination, filtering, and sorting support
- Admin-only routes for creating, updating, deleting products

### Cart & Orders
- Add/update/remove items in user cart
- Place orders with **transaction-safe operations** (atomic stock reduction & cart clearing)
- Order tracking with status (`created`, `processing`, `shipped`, `delivered`, `cancelled`)

### Admin Analytics
- Total users, orders, revenue
- Best-selling products
- Monthly sales chart using **MongoDB aggregation pipelines**

### User Profile
- View and update profile
- Change password

---

##  Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Middleware:** Error handling, validation, role-based access

---

##  Installation

1. Clone the repo:
```bash
git clone https://github.com/TejasKawle/BuySmart-API.git
cd BuySmart-API
Install dependencies:

bash
Copy code
npm install
Create a .env file based on .env.example:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm run dev
Server should run on http://localhost:5000

 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/v1/auth/register	Register a new user
POST	/api/v1/auth/login	Login and get JWT token
GET	/api/v1/auth/profile	Get logged-in user profile (protected)

Products
Method	Endpoint	Description
GET	/api/v1/products	Get all products
POST	/api/v1/products	Create new product (admin only)
PUT	/api/v1/products/:id	Update product (admin only)
DELETE	/api/v1/products/:id	Delete product (admin only)

Cart
Method	Endpoint	Description
POST	/api/v1/cart	Add/update product in cart
GET	/api/v1/cart	Get user cart
DELETE	/api/v1/cart/:id	Remove product from cart

Orders
Method	Endpoint	Description
POST	/api/v1/orders	Place an order (protected)
GET	/api/v1/orders	Get logged-in user orders
GET	/api/v1/orders/:id	Get single order by ID

Admin Analytics
Method	Endpoint	Description
GET	/api/v1/admin/stats	Get total users, orders, revenue, best sellers (admin only)

 Live API
Deployed on Render: https://buysmart-api.onrender.com

 Notes
This is a backend-only project. You can integrate with any frontend (React, Next.js, etc.).

All sensitive routes are protected with JWT and role-based authorization.

MongoDB transactions are used to ensure order creation and stock updates are atomic.

 Future Enhancements
Add product reviews & ratings

Wishlist & favorites

Online payment integration (Razorpay, Stripe, PayPal)

Admin dashboard with detailed analytics charts

🔗 Author
Tejas Kawle
GitHub | LinkedIn
