# Office Management System - Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

A NestJS backend for Office Management System with real-time WebSocket support. Provides RESTful APIs and WebSocket events for managing companies and employees.

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/MJaseer/Office-Management-BE.git
cd Office-Management-BE
npm install
```

### 2. Set up Environment
Create a `.env` file in project root:
```bash
MONGODB_URI=<add_your_mongo_uri>
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

**Note:** CORS_ORIGIN should match your frontend URL. Multiple origins can be comma-separated.

### 3. Run MongoDB
Ensure MongoDB is running:
```bash
# If using Docker (recommended)
docker run -d -p 27017:27017 --name office-mongodb mongo:latest

# Or using existing MongoDB
# Make sure MongoDB service is running
```

### 4. Start the Server
```bash
# Development mode (auto-reload)
npm run start:dev

# Production mode
npm run start:prod
```

## Project Structure
```
src/
├── companies/          # Company module (CRUD operations)
├── employees/          # Employee module (CRUD operations)
├── common/websocket/   # WebSocket gateway for real-time
├── shared/             # Constants and shared utilities
└── main.ts            # Application entry point
```

## API Endpoints

### Companies (`/api/companies`)
- `GET /` - Get all companies
- `GET /dropdown` - Get companies for dropdown
- `GET /:id` - Get company by ID
- `POST /` - Create new company
- `PUT /:id` - Update company
- `DELETE /:id` - Delete company

### Employees (`/api/employees`)
- `GET /` - Get all employees (with company details)
- `GET /:id` - Get employee by ID
- `POST /` - Create new employee
- `PUT /:id` - Update employee
- `DELETE /:id` - Delete employee

### WebSocket Events (`ws://localhost:3000/office-management`)
- `company_created` - New company created
- `company_updated` - Company updated
- `company_deleted` - Company deleted
- `employee_created` - New employee created
- `employee_updated` - Employee updated
- `employee_deleted` - Employee deleted

## Real-time Features

This backend provides real-time updates via WebSocket:
- **Instant Data Sync**: Changes in one client instantly reflect in all connected clients
- **Cross-tab Updates**: Multiple browser tabs stay synchronized
- **Event Broadcasting**: All CRUD operations broadcast to connected clients


## 🔧 Development

### Available Scripts
```bash
# Development with watch mode
npm run start:dev

# Production build
npm run build

# Run production build
npm run start:prod
```

## Dependencies

### Main Dependencies
- **@nestjs/common** - NestJS core
- **@nestjs/mongoose** - MongoDB integration
- **@nestjs/websockets** - WebSocket support
- **mongoose** - MongoDB ODM
- **socket.io** - Real-time communication
- **class-validator** - Request validation

## Troubleshooting

### Common Issues

**1. MongoDB Connection Failed:**
```bash
# Check if MongoDB is running
mongosh

# If using Docker
docker ps | grep mongo
```

**2. CORS Errors:**
- Ensure `.env` has correct `CORS_ORIGIN`
- Restart server after changing `.env`

**3. Port Already in Use:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

#kill port
npx kill-port 3000
```

**4. WebSocket Connection Failed:**
- Check if server is running
- Verify WebSocket URL: `ws://localhost:3000/office-management`

## Frontend Integration

This backend pairs with the frontend:
- Frontend Repo: [Office-Management-FE](https://github.com/MJaseer/Office-Management-FE)
- Frontend runs on: `http://localhost:4200`

## API Documentation

Full API documentation available via:
- Import Postman collection
- Check `/src` for detailed DTOs and interfaces
- WebSocket events documented in `events.gateway.ts`

<p align="center">
  Made using NestJS
</p>