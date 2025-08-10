import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

// Mock data for testing without database
const mockUsers = [
  {
    username: 'Quophy2k1',
    password: '5555',
    employee_id: 1,
    first_name: 'John',
    last_name: 'Director',
    email: 'director@restaurant.com',
    role_id: 1,
    role_name: 'Director',
    access_level: 1
  },
  {
    username: 'test',
    password: 'test',
    employee_id: 2,
    first_name: 'Test',
    last_name: 'User',
    email: 'test@restaurant.com',
    role_id: 2,
    role_name: 'Manager',
    access_level: 2
  }
];

const mockProducts = [
  { product_id: 1, product_name: 'Rice', current_stock: 100, reorder_level: 20, unit: 'kg' },
  { product_id: 2, product_name: 'Chicken', current_stock: 50, reorder_level: 30, unit: 'kg' },
  { product_id: 3, product_name: 'Tomatoes', current_stock: 15, reorder_level: 25, unit: 'kg' }
];

const mockMenuItems = [
  { menu_item_id: 1, item_name: 'Chicken Rice', price: 15.99, category: 'Main Course' },
  { menu_item_id: 2, item_name: 'Beef Steak', price: 25.99, category: 'Main Course' },
  { menu_item_id: 3, item_name: 'Caesar Salad', price: 12.99, category: 'Appetizer' }
];

// Login route - updated to match frontend expectations
app.post('/api/auth/login', (req, res) => {
  console.log('Login route hit');

  const { username, password } = req.body;
  console.log('Received:', username, password);

  try {
    // Find user in mock data
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a simple token (in production, use JWT)
    const token = `token_${Date.now()}_${user.employee_id}`;

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        employee_id: user.employee_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role_id,
        role_name: user.role_name,
        access_level: user.access_level
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Keep the old login route for backward compatibility
app.post('/api/login', (req, res) => {
  console.log('Old login route hit');
  res.status(200).json({ message: 'Use /api/auth/login instead' });
});

// Profile endpoint for frontend
app.get('/api/auth/profile', (req, res) => {
  // This would normally validate the token
  // For now, return a mock response
  res.status(200).json({
    message: 'Profile retrieved',
    employee: {
      employee_id: 1,
      username: 'demo_user',
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@example.com',
      role_id: 1,
      role_name: 'Director',
      access_level: 1
    }
  });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

// Inventory endpoints
app.get('/api/inventory/products', (req, res) => {
  res.json({ message: 'Products retrieved', data: mockProducts });
});

app.get('/api/inventory/products/low-stock', (req, res) => {
  const lowStock = mockProducts.filter(p => p.current_stock <= p.reorder_level);
  res.json({ message: 'Low stock products retrieved', data: lowStock });
});

// Sales endpoints
app.get('/api/sales/menu-items', (req, res) => {
  res.json({ message: 'Menu items retrieved', data: mockMenuItems });
});

// Employee endpoints
app.get('/api/employees/employees', (req, res) => {
  res.json({ message: 'Employees retrieved', data: mockUsers });
});

app.get('/api/employees/roles', (req, res) => {
  const roles = [
    { role_id: 1, role_name: 'Director', access_level: 1 },
    { role_id: 2, role_name: 'Manager', access_level: 2 },
    { role_id: 3, role_name: 'MIS Officer', access_level: 3 }
  ];
  res.json({ message: 'Roles retrieved', data: roles });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Backend server running on http://localhost:5000');
  console.log('📝 API endpoints:');
  console.log('   POST /api/auth/login - Login');
  console.log('   GET  /api/auth/profile - Get profile');
  console.log('   POST /api/auth/logout - Logout');
  console.log('   GET  /api/inventory/products - Get products');
  console.log('   GET  /api/inventory/products/low-stock - Get low stock products');
  console.log('   GET  /api/sales/menu-items - Get menu items');
  console.log('   GET  /api/employees/employees - Get employees');
  console.log('   GET  /api/employees/roles - Get roles');
  console.log('   GET  /api/test - Test endpoint');
  console.log('');
  console.log('🧪 Test credentials:');
  console.log('   Username: Quophy2k1, Password: 5555');
  console.log('   Username: test, Password: test');
});
