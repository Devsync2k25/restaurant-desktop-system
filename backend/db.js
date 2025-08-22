import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create SQLite database file in the backend directory
const dbPath = path.join(__dirname, 'restaurant.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables if they don't exist
const createTables = () => {
  // Employees table
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      Last_name TEXT,
      phone TEXT,
      email TEXT UNIQUE,
      role_id INTEGER,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'on_leave', 'inactive'))
    )
  `);

  // Roles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      role_id INTEGER PRIMARY KEY AUTOINCREMENT,
      role_name TEXT UNIQUE NOT NULL,
      access_level INTEGER NOT NULL
    )
  `);

  // Logins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS logins (
      Login_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER,
      Username TEXT UNIQUE,
      password TEXT,
      logintime DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )
  `);

  // Products table (inventory)
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      product_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Product_name TEXT UNIQUE NOT NULL,
      Unit TEXT NOT NULL,
      cost_price REAL,
      current_stock REAL,
      reorder_level REAL
    )
  `);

  // Menu items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menuitems (
      menu_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL
    )
  `);

  // Menu recipes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menurecipes (
      menu_recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_item_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      FOREIGN KEY (menu_item_id) REFERENCES menuitems(menu_item_id),
      FOREIGN KEY (product_id) REFERENCES products(product_ID)
    )
  `);

  // Store issue log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS storeissuelog (
      issue_id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      issue_date DATETIME NOT NULL,
      purpose TEXT,
      approved_by INTEGER,
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
      FOREIGN KEY (product_id) REFERENCES products(product_ID),
      FOREIGN KEY (approved_by) REFERENCES employees(employee_id)
    )
  `);

  // Waste log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS wastagelog (
      waste_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      waste_date DATETIME NOT NULL,
      reason TEXT,
      employee_id INTEGER,
      FOREIGN KEY (product_id) REFERENCES products(product_ID),
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )
  `);

  console.log('✅ SQLite database tables created successfully');
};

// Insert only essential roles (no sample data)
const insertSampleData = () => {
  // Insert only the basic roles structure
  const roleCount = db.prepare('SELECT COUNT(*) as count FROM roles').get();
  if (roleCount.count === 0) {
    const insertRole = db.prepare('INSERT INTO roles (role_name, access_level) VALUES (?, ?)');
    insertRole.run('Director', 1);
    insertRole.run('Manager', 2);
    insertRole.run('MIS Officer', 3);
    insertRole.run('Warehouse Manager', 4);
    insertRole.run('Stores Manager', 5);
    insertRole.run('Inventory Personnel', 6);
    insertRole.run('Kitchen Chef', 7);
    insertRole.run('Bartender', 8);
    console.log('✅ Basic roles structure created');
  }
  
  // Insert one default user for client to login initially
  const employeeCount = db.prepare('SELECT COUNT(*) as count FROM employees').get();
  if (employeeCount.count === 0) {
    const insertEmployee = db.prepare('INSERT INTO employees (first_name, Last_name, phone, email, role_id) VALUES (?, ?, ?, ?, ?)');
    insertEmployee.run('Kingsley', 'Ofori-Atta', '0549812843', 'Kingsleyoforiatta70@gmail.com', 1); // Director role
    console.log('✅ Default user created');
  }

  // Insert login for default user
  const loginCount = db.prepare('SELECT COUNT(*) as count FROM logins').get();
  if (loginCount.count === 0) {
    const insertLogin = db.prepare('INSERT INTO logins (employee_id, Username, password) VALUES (?, ?, ?)');
    insertLogin.run(1, 'Quophy2k1', '5555');
    console.log('✅ Default login created');
  }
  
  // No sample products, recipes, or other data
  // Client will add their own business data from scratch
  console.log('✅ Database ready for client use - minimal setup data only');
};

// Initialize database
try {
  createTables();
  insertSampleData();
  console.log('✅ SQLite database initialized successfully');
} catch (error) {
  console.error('❌ Database initialization failed:', error.message);
  }
  
export default db;