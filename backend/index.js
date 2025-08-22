import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Login route
app.post('/api/login', (req, res) => {
  console.log('Login route hit');

  const { username, password } = req.body;
  console.log('Received:', username, password);

  try {
    const stmt = db.prepare('SELECT * FROM logins WHERE Username = ?');
    const user = stmt.get(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    // TEMPORARY plain-text check
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Get employee details including role
    const employeeStmt = db.prepare('SELECT e.*, r.role_name FROM employees e JOIN roles r ON e.role_id = r.role_id WHERE e.employee_id = ?');
    const employee = employeeStmt.get(user.employee_id);

    res.status(200).json({
      message: 'Login successful',
      user: {
        login_id: user.Login_ID,
        employee_id: user.employee_id,
        username: user.Username,
        name: `${employee.first_name} ${employee.Last_name}`,
        role: employee.role_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  // In a real app, you'd invalidate JWT tokens here
  res.status(200).json({ message: 'Logout successful' });
});

// Inventory endpoints
app.get('/api/inventory', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new inventory item
app.post('/api/inventory', (req, res) => {
  try {
    const { Product_name, Unit, cost_price, current_stock, reorder_level } = req.body;
    
    if (!Product_name || !Unit || !cost_price || !current_stock || !reorder_level) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const stmt = db.prepare('INSERT INTO products (Product_name, Unit, cost_price, current_stock, reorder_level) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(Product_name, Unit, cost_price, current_stock, reorder_level);
    
    res.status(201).json({ 
      message: 'Inventory item added successfully',
      id: result.lastInsertRowid 
    });
  } catch (error) {
    console.error('Add inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update inventory item
app.put('/api/inventory/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { Product_name, Unit, cost_price, current_stock, reorder_level } = req.body;
    
    const stmt = db.prepare('UPDATE products SET Product_name = ?, Unit = ?, cost_price = ?, current_stock = ?, reorder_level = ? WHERE product_ID = ?');
    const result = stmt.run(Product_name, Unit, cost_price, current_stock, reorder_level, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    
    res.json({ message: 'Inventory item updated successfully' });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete inventory item
app.delete('/api/inventory/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM products WHERE product_ID = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Recipes endpoints
app.get('/api/recipes', (req, res) => {
  try {
    // Get recipes with product names and menu item names
    const stmt = db.prepare(`
      SELECT 
        mr.menu_recipe_id,
        mr.menu_item_id,
        mr.product_id,
        mr.quantity,
        mi.name as menu_item_name,
        p.Product_name as product_name,
        p.Unit as unit
      FROM menurecipes mr
      JOIN menuitems mi ON mr.menu_item_id = mi.menu_item_id
      JOIN products p ON mr.product_id = p.product_ID
      ORDER BY mr.menu_item_id, mr.product_id
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get menu items
app.get('/api/menu-items', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM menuitems ORDER BY name');
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new recipe
app.post('/api/recipes', (req, res) => {
  try {
    const { menu_item_id, product_id, quantity } = req.body;
    
    if (!menu_item_id || !product_id || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const stmt = db.prepare('INSERT INTO menurecipes (menu_item_id, product_id, quantity) VALUES (?, ?, ?)');
    const result = stmt.run(menu_item_id, product_id, quantity);
    
    res.status(201).json({ 
      message: 'Recipe added successfully',
      id: result.lastInsertRowid 
    });
  } catch (error) {
    console.error('Add recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update recipe
app.put('/api/recipes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { menu_item_id, product_id, quantity } = req.body;
    
    const stmt = db.prepare('UPDATE menurecipes SET menu_item_id = ?, product_id = ?, quantity = ? WHERE menu_recipe_id = ?');
    const result = stmt.run(menu_item_id, product_id, quantity, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete recipe
app.delete('/api/recipes/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM menurecipes WHERE menu_recipe_id = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Users endpoints
app.get('/api/users', (req, res) => {
  try {
    // Get all employees with their roles
    const stmt = db.prepare(`
      SELECT 
        e.employee_id,
        e.first_name,
        e.Last_name,
        e.phone,
        e.email,
        e.status,
        r.role_name,
        r.access_level
      FROM employees e
      JOIN roles r ON e.role_id = r.role_id
      ORDER BY e.employee_id
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new user/employee
app.post('/api/users', (req, res) => {
  try {
    const { first_name, Last_name, phone, email, role_name, username, password } = req.body;
    
    if (!first_name || !Last_name || !email || !role_name || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // First, get the role_id for the role_name
    const roleStmt = db.prepare('SELECT role_id FROM roles WHERE role_name = ?');
    const role = roleStmt.get(role_name);
    
    if (!role) {
      return res.status(400).json({ message: 'Invalid role name' });
    }
    
    // Insert employee
    const employeeStmt = db.prepare('INSERT INTO employees (first_name, Last_name, phone, email, role_id) VALUES (?, ?, ?, ?, ?)');
    const employeeResult = employeeStmt.run(first_name, Last_name, phone, email, role.role_id);
    
    // Insert login credentials
    const loginStmt = db.prepare('INSERT INTO logins (employee_id, Username, password) VALUES (?, ?, ?)');
    loginStmt.run(employeeResult.lastInsertRowid, username, password);
    
    res.status(201).json({ 
      message: 'User added successfully',
      employee_id: employeeResult.lastInsertRowid,
      username: username
    });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available roles
app.get('/api/roles', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM roles ORDER BY role_name');
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Roles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Goods issuance endpoints
app.get('/api/goods-issuance', (req, res) => {
  try {
    // Get goods issuance with employee and product names
    const stmt = db.prepare(`
      SELECT 
        sil.issue_id,
        sil.employee_id,
        sil.product_id,
        sil.quantity,
        sil.issue_date,
        sil.purpose,
        sil.approved_by,
        e.first_name,
        e.Last_name,
        p.Product_name,
        p.Unit
      FROM storeissuelog sil
      JOIN employees e ON sil.employee_id = e.employee_id
      JOIN products p ON sil.product_id = p.product_ID
      ORDER BY sil.issue_date DESC
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Goods issuance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new goods issuance
app.post('/api/goods-issuance', (req, res) => {
  try {
    const { employee_id, product_id, quantity, purpose } = req.body;
    
    if (!employee_id || !product_id || !quantity || !purpose) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const stmt = db.prepare('INSERT INTO storeissuelog (employee_id, product_id, quantity, issue_date, purpose) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(employee_id, product_id, quantity, new Date().toISOString(), purpose);
    
    res.status(201).json({ 
      message: 'Goods issuance logged successfully',
      id: result.lastInsertRowid 
    });
  } catch (error) {
    console.error('Add goods issuance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update goods issuance
app.put('/api/goods-issuance/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, product_id, quantity, purpose, approved_by } = req.body;
    
    const stmt = db.prepare('UPDATE storeissuelog SET employee_id = ?, product_id = ?, quantity = ?, purpose = ?, approved_by = ? WHERE issue_id = ?');
    const result = stmt.run(employee_id, product_id, quantity, purpose, approved_by, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Goods issuance record not found' });
    }
    
    res.json({ message: 'Goods issuance updated successfully' });
  } catch (error) {
    console.error('Update goods issuance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete goods issuance
app.delete('/api/goods-issuance/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM storeissuelog WHERE issue_id = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Goods issuance record not found' });
    }
    
    res.json({ message: 'Goods issuance deleted successfully' });
  } catch (error) {
    console.error('Delete goods issuance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Daily usage endpoint
app.get('/api/daily-usage', (req, res) => {
  try {
    // Get daily usage from storeissuelog aggregated by date
    const stmt = db.prepare(`
      SELECT 
        DATE(issue_date) as date,
        SUM(quantity) as total_quantity,
        COUNT(*) as total_issues
      FROM storeissuelog 
      WHERE issue_date >= DATE('now', '-30 days')
      GROUP BY DATE(issue_date)
      ORDER BY date DESC
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Daily usage error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Waste log endpoints
app.get('/api/waste-log', (req, res) => {
  try {
    // Get waste log with employee and product names
    const stmt = db.prepare(`
      SELECT 
        wl.waste_id,
        wl.product_id,
        wl.quantity,
        wl.waste_date,
        wl.reason,
        wl.employee_id,
        e.first_name,
        e.Last_name,
        p.Product_name,
        p.Unit
      FROM wastagelog wl
      JOIN employees e ON wl.employee_id = e.employee_id
      JOIN products p ON wl.product_id = p.product_ID
      ORDER BY wl.waste_date DESC
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    console.error('Waste log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new waste log entry
app.post('/api/waste-log', (req, res) => {
  try {
    const { product_id, quantity, reason, employee_id } = req.body;
    
    if (!product_id || !quantity || !reason || !employee_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const stmt = db.prepare('INSERT INTO wastagelog (product_id, quantity, waste_date, reason, employee_id) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(product_id, quantity, new Date().toISOString(), reason, employee_id);
    
    res.status(201).json({ 
      message: 'Waste logged successfully',
      id: result.lastInsertRowid 
    });
  } catch (error) {
    console.error('Add waste log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update waste log entry
app.put('/api/waste-log/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity, reason, employee_id } = req.body;
    
    const stmt = db.prepare('UPDATE wastagelog SET product_id = ?, quantity = ?, reason = ?, employee_id = ? WHERE waste_id = ?');
    const result = stmt.run(product_id, quantity, reason, employee_id, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Waste log entry not found' });
    }
    
    res.json({ message: 'Waste log updated successfully' });
  } catch (error) {
    console.error('Update waste log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete waste log entry
app.delete('/api/waste-log/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM wastagelog WHERE waste_id = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Waste log entry not found' });
    }
    
    res.json({ message: 'Waste log deleted successfully' });
  } catch (error) {
    console.error('Delete waste log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Analytics endpoint for chart data
app.get('/api/analytics', (req, res) => {
  try {
  // Get analytics data from various tables
    const stmt = db.prepare(`
    SELECT 
        DATE(sil.issue_date) as date,
        p.Product_name as item_name,
        SUM(sil.quantity) as total_issued
      FROM storeissuelog sil
      JOIN products p ON sil.product_id = p.product_ID
      WHERE sil.issue_date >= DATE('now', '-30 days')
      GROUP BY DATE(sil.issue_date), p.Product_name
    ORDER BY date DESC
    `);
    const results = stmt.all();
    
    // Transform data for charts
    const chartData = {
      labels: results.map(item => item.date),
      datasets: [{
        label: 'Items Issued',
        data: results.map(item => item.total_issued),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
    
    res.json({
      raw: results,
      chartData: chartData
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Backend server running on http://localhost:5000');
  console.log('📝 API endpoints:');
  console.log('   🔐 Authentication:');
  console.log('      POST /api/login - Login');
  console.log('      POST /api/logout - Logout');
  console.log('   📦 Inventory Management:');
  console.log('      GET    /api/inventory - Get inventory items');
  console.log('      POST   /api/inventory - Add inventory item');
  console.log('      PUT    /api/inventory/:id - Update inventory item');
  console.log('      DELETE /api/inventory/:id - Delete inventory item');
  console.log('   🍳 Recipe Management:');
  console.log('      GET    /api/recipes - Get recipes');
  console.log('      GET    /api/menu-items - Get menu items');
  console.log('      POST   /api/recipes - Add recipe');
  console.log('      PUT    /api/recipes/:id - Update recipe');
  console.log('      DELETE /api/recipes/:id - Delete recipe');
  console.log('   👥 User Management:');
  console.log('      GET /api/users - Get users');
  console.log('   📤 Goods Issuance:');
  console.log('      GET    /api/goods-issuance - Get goods issuance logs');
  console.log('      POST   /api/goods-issuance - Add goods issuance');
  console.log('      PUT    /api/goods-issuance/:id - Update goods issuance');
  console.log('      DELETE /api/goods-issuance/:id - Delete goods issuance');
  console.log('   📊 Analytics & Reports:');
  console.log('      GET /api/daily-usage - Get daily usage data');
  console.log('      GET /api/waste-log - Get waste logs');
  console.log('      GET /api/analytics - Get analytics data for charts');
  console.log('   🗑️  Waste Management:');
  console.log('      GET    /api/waste-log - Get waste logs');
  console.log('      POST   /api/waste-log - Add waste log');
  console.log('      PUT    /api/waste-log/:id - Update waste log');
  console.log('      DELETE /api/waste-log/:id - Delete waste log');
  console.log('   🏥 Health Check:');
  console.log('      GET /api/health - Health check');
});
