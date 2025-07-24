# 🛒 E-commerce Admin Panel (GraphQL)

This project contains the **backend and frontend** of an e-commerce admin panel built with:

- **Backend**: Node.js, Express.js, Apollo Server, MongoDB, JWT
- **Frontend**: React, Apollo Client, Redux Toolkit

---

## 🔧 Backend Setup

1. Clone the Repository
   
```
git clone https://github.com/Suprabha47/Admin_Panel_Backend_GQL.git
cd ecommerce-admin/backend
```

2. Install Dependencies
   
```
npm install
```

4. Create Environment Variables
Create a .env file in the backend/ directory and add the following:

```
MONGODB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PORT=4000
```

(⚠️ Replace values above with your own secure configurations.)

4. Run the Backend Server
   
```
npm run dev
```

Server will be running at:
📍 http://localhost:4000

GraphQL Playground available at:
🧪 http://localhost:4000/graphql
