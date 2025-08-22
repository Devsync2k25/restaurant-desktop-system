# Backend Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- Git

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
1. Start MySQL server
2. Create database:
   ```sql
   CREATE DATABASE resturant_db;
   ```
3. Import schema:
   ```bash
   mysql -u root -p resturant_db < ../database/restaurant_schema.sql
   ```

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Infinity@123
DB_NAME=resturant_db
DB_PORT=3306
```

### 4. Start Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 5. Test Connection
```bash
node test-connection.js
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/login` | POST | User authentication |
| `/api/logout` | POST | User logout |
| `/api/inventory` | GET | Get inventory items |
| `/api/recipes` | GET | Get recipes |
| `/api/users` | GET | Get users |
| `/api/goods-issuance` | GET | Get goods issuance logs |
| `/api/daily-usage` | GET | Get daily usage data |
| `/api/waste-log` | GET | Get waste logs |
| `/api/analytics` | GET | Get analytics data |

## Database Tables
- `employees` - Staff information
- `logins` - User credentials
- `products` - Inventory items
- `menurecipes` - Recipe ingredients
- `storeissuelog` - Goods issuance tracking
- `wastagelog` - Waste tracking
- `roles` - User role definitions

## Troubleshooting

### Connection Issues
- Verify MySQL server is running
- Check database credentials in `.env`
- Ensure database `resturant_db` exists

### Port Issues
- Check if port 5000 is available
- Change port in `index.js` if needed

### Import Errors
- Verify all dependencies are installed
- Check Node.js version compatibility



