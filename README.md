

#  BuySmart API – Production-Ready E-Commerce Backend

BuySmart API is a fully–featured **E-Commerce backend** built using **Node.js, Express, and MongoDB**.
It implements **authentication, authorization, product management, cart, orders, payments (placeholder), admin analytics, and more**.

This project follows **real-world architecture**, uses **MVC pattern**, and includes many **advanced backend concepts*

---

##  **Features**

###  **Authentication & Authorization**

* Register & Login
* JWT-based authentication
* Role-based access control (Admin/User)
* Protected routes

###  **Product Management**

* Create, update, delete products (Admin only)
* Public product listing
* Filtering, sorting, pagination

###  **Cart Management**

* Add to cart
* Update cart item
* Remove item
* Clear cart

###  **Orders**

* Create order from cart
* Reduce stock automatically
* MongoDB **transactions** for atomic operations
* Order history for users
* Admin order overview

###  **Admin Dashboard Analytics**

Uses MongoDB **aggregation pipelines** to get:

* Total revenue
* Total users
* Total orders

###  **User Features**

* Get profile
* Update profile
* Change password

---

##  **Tech Stack**

| Layer             | Technology                             |
| ----------------- | -------------------------------------- |
| Backend Framework | **Node.js + Express.js**               |
| Database          | **MongoDB + Mongoose**                 |
| Auth              | **JWT, bcryptjs**                      |
| Deployment        | **Render**                             |             |
| Other Concepts    | Transactions, Aggregations, Middleware |



## **Environment Variables**

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

##  **Run Locally**

```
npm install
npm run dev
```

Server starts at:

```
http://localhost:5000
```

---

##  **Live API URL**

**[https://buysmart-api.onrender.com](https://buysmart-api.onrender.com)**

---

##  API Endpoints


##  **AUTH ROUTES** → `/api/v1/auth`

| Method | Endpoint    | Access  | Description                |
| ------ | ----------- | ------- | -------------------------- |
| POST   | `/register` | Public  | Register a new user        |
| POST   | `/login`    | Public  | Login user & get JWT       |
| GET    | `/profile`  | Private | Get logged-in user profile |
| PUT    | `/update-profile`  | Private | Update profile             |
| PUT    | `/chnage-password` | Private | Change password            |

---

##  **PRODUCT ROUTES** → `/api/v1/product`

| Method | Endpoint | Access     | Description        |
| ------ | -------- | ---------- | ------------------ |
| GET    | `/`      | Public     | Get all products   |
| GET    | `/:id`   | Public     | Get single product |
| POST   | `/`      | Admin Only | Create product     |
| PUT    | `/:id`   | Admin Only | Update product     |
| DELETE | `/:id`   | Admin Only | Delete product     |

---

##  **CART ROUTES** → `/api/v1/cart`

| Method | Endpoint      | Access  | Description      |
| ------ | ------------- | ------- | ---------------- |
| POST   | `/add/:productId`        | Private | Add item to cart |
| GET    | `/`           | Private | View cart        |
| PUT    | `/update/:productId`     | Private | Update quantity  |
| DELETE | `/remove/:productId` | Private | Remove item      |

---

##  **ORDER ROUTES** → `/api/v1/order`

| Method | Endpoint     | Access  | Description        |
| ------ | ------------ | ------- | ------------------ |
| POST   | `/`          | Private | Place new order    |
| GET    | `/my` | Private | Get user's orders  |
| GET    | `/:id`       | Private | Get specific order |

---

##  **ADMIN ROUTES** → `/api/v1/admin`

| Method | Endpoint               | Access | Description           |
| ------ | ---------------------- | ------ | --------------------- |
| GET    | `/stats/revenue`       | Admin  | Total revenue         |
| GET    | `/stats/orders`        | Admin  | Total orders          |
| GET    | `/stats/users`         | Admin  | Total users           |

---

##  **Key Highlights**

### ✔ Professional MVC Architecture

### ✔ Protected admin-only routes

### ✔ Centralized error handling

### ✔ MongoDB transactions

### ✔ Aggregation analytics like real e-commerce

### ✔ Clean, structured, interview-ready codebase

---

##  **Author**

**Tejas Kawle**
BuySmart API – A complete production-style backend

---

##  **Like this project? Consider giving it a star on GitHub!**

---
*


