# Manufacturing ERP System

A full-stack **Manufacturing ERP System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project is designed to demonstrate how an ERP system can manage important business operations such as employee management, customer and supplier management, product and inventory management, attendance tracking, leave management, and payroll.

The application follows a modular architecture with a secure REST API, JWT-based authentication, role-based access control, and MongoDB for data management.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Admin authentication using JWT
* Secure login and logout
* Protected API routes using authentication middleware
* Token-based authorization
* Role-based access control

### 👨‍💼 Employee Management

* Add new employees
* View employee details
* Update employee information
* Delete employees
* Auto-generate employee codes
* Manage employee departments and designations
* Assign reporting managers

### 👥 Customer Management

* Add and manage customers
* Maintain customer contact information
* Manage billing and shipping addresses
* Auto-generate customer codes
* Update and delete customer records

### 🚚 Supplier Management

* Add and manage suppliers
* Maintain supplier contact information
* Manage supplier types
* Track supplier details

### 📦 Product Management

* Manage products
* Assign products to categories and units
* Maintain product details
* Manage product types and pricing
* Connect products with inventory

### 🏷️ Category & Unit Management

* Create product categories
* Manage measurement units
* Support different unit types
* Maintain category and unit information

### 🏭 Warehouse Management

* Create and manage warehouses
* Maintain warehouse details
* Manage warehouse types and locations

### 📊 Inventory Management

* Track product stock
* Manage inventory by warehouse
* Monitor stock quantities
* Maintain product inventory records

### 📝 Purchase Order Management

* Create purchase orders
* Manage suppliers and products
* Track purchase order details
* Maintain purchase order status

### 🕐 Attendance Management

* Track employee attendance
* Mark employee presence during login
* Store employee login time
* Store logout time
* Track employee login location
* Calculate working hours
* View attendance records

### 🏖️ Leave Management

* Apply for employee leave
* Manage different leave types
* Approve or reject leave requests
* Track leave status

### 💰 Payroll Management

* Manage employee salary information
* Calculate payroll details
* Maintain salary records
* Track payroll processing

### 📈 Dashboard

The admin dashboard provides an overview of important business information such as:

* Total Employees
* Total Customers
* Total Suppliers
* Total Products
* Inventory Overview
* Employee Attendance
* Present Employees
* Absent Employees
* Half-Day Employees
* Employee Login Time
* Employee Logout Time
* Total Working Hours

---

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router
* Bootstrap
* JavaScript
* Axios

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* Middleware

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 📂 Project Structure

```text
Manufacturing-ERP/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔑 Authentication Flow

The application uses **JWT-based authentication**.

The general authentication flow is:

```text
Admin Login
     ↓
Backend Validates Credentials
     ↓
JWT Token Generated
     ↓
Token Sent to Frontend
     ↓
Frontend Stores Authentication Token
     ↓
Token Sent With Protected API Requests
     ↓
verifyToken Middleware
     ↓
Request Authorized
     ↓
Controller Executes
```

Protected API requests use the following authorization format:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔄 API Architecture

The backend follows a modular architecture:

```text
Frontend (React)
       ↓
Axios API Request
       ↓
Express Route
       ↓
verifyToken Middleware
       ↓
Controller
       ↓
Mongoose Model
       ↓
MongoDB
```

The application uses RESTful APIs for CRUD operations.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

```bash
cd Manufacturing-ERP
```

---

### 3. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

Or, if using nodemon:

```bash
npm run dev
```

---

### 4. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm run dev
```

---

## 🔒 Environment Variables

The following environment variables are required:

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB database connection string     |
| `JWT_SECRET` | Secret key used for JWT authentication |

> Never commit your `.env` file to GitHub. Add it to `.gitignore`.

---

## 📌 Main Modules

```text
Dashboard
│
├── Employee Management
│   └── Attendance
│
├── Customer Management
│
├── Supplier Management
│
├── Product Management
│   ├── Category
│   └── Unit
│
├── Inventory Management
│   └── Warehouse
│
├── Purchase Order
│
├── Leave Management
│
└── Payroll Management
```

---

## 🗄️ Database Design

The application uses MongoDB with Mongoose schemas for managing different business entities.

Main collections include:

* Admin
* Employee
* Customer
* Supplier
* Category
* Unit
* Product
* Warehouse
* Inventory
* Purchase Order
* Attendance
* Leave
* Payroll

Relationships between collections are managed using MongoDB ObjectId references through Mongoose.

For example:

```text
Admin
  │
  ├── Employees
  ├── Customers
  ├── Suppliers
  ├── Products
  └── Warehouses
```

---

## 🎯 Project Objectives

The main objectives of this project are:

* Build a practical full-stack MERN application
* Implement a modular ERP architecture
* Practice REST API development
* Implement JWT authentication
* Implement protected routes and middleware
* Work with MongoDB relationships using Mongoose
* Implement CRUD operations
* Manage business entities and inventory
* Track employee attendance
* Demonstrate real-world backend and frontend integration

---

## 🔮 Future Enhancements

Possible future improvements include:

* Advanced inventory reports
* Low-stock notifications
* Email notifications
* Real-time dashboard updates
* Advanced payroll calculations
* Production planning and manufacturing workflows
* Sales order management
* Financial and accounting modules
* Data export to Excel/PDF
* Advanced analytics and reporting

---

## 👨‍💻 Author

**Rushikesh Idhate**

Full Stack Developer | MERN Stack Developer

---

## ⭐ Project

If you find this project useful for learning or reference, consider giving the repository a ⭐.
