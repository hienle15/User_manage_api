# User Management API

## Description
A RESTful API for user management built with Node.js, Express, and TypeScript.

## Prerequisites
- Node.js
- MySQL
- TypeScript

## Installation
1. Clone the repository:
```bash
git clone https://github.com/hienle15/user_api.git
cd user_api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration:
```env
PORT=3000
HOST=localhost
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306
API_VERSION=/api/v1
```

## Running the Application
Development mode:
```bash
npm run dev
```

Build and run:
```bash
npm run build
npm start
```

## API Documentation
Access Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints
- GET /api/v1/users - Get all users
- GET /api/v1/users/:id - Get user by ID
- POST /api/v1/users - Create new user
- PUT /api/v1/users/:id - Update user
- DELETE /api/v1/users/:id - Delete user

## Project Structure
```
src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
└── utils/
```