# Restaurant Express + MySQL Backend

Minimal Express backend wired for your MySQL schema (tables detected: employees, roles, products, menuitems, menurecipes, sales, kitchenstock, storeissuelog, wastagelog, mealpreparationlog, endofdayreconciliation).

## Setup

1) Install deps:
```bash
npm install
```

2) Copy env and configure DB:
```bash
cp .env.example .env
# edit .env
```

3) Start server:
```bash
npm run dev
# server runs on http://localhost:4000
```

## Routes (sample)
- GET /api/health
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

- GET /api/employees
- POST /api/employees

- GET /api/menu-items
- GET /api/menu-items/:id/recipe

- GET /api/sales
- POST /api/sales

- GET /api/roles
- GET /api/kitchen-stock
- GET /api/wastage-log
- GET /api/store-issues
- GET /api/eod
- GET /api/meal-prep

> You can add more CRUD endpoints as needed. All queries are parameterized.
