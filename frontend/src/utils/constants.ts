/**
 * RESTAURANT MANAGEMENT SYSTEM - CONSTANTS & CONFIGURATION
 * =======================================================
 * 
 * BACKEND DEVELOPERS - READ THIS SECTION:
 * ======================================
 * 
 * ROLE-BASED ACCESS CONTROL (RBAC):
 * =================================
 * The system uses a hierarchical role system where:
 * - Director: Full system access, can manage all users
 * - Manager: Can manage users (except Director/Manager), full operational access
 * - MIS Officer: Analytics, reports, reconciliation
 * - Warehouse Manager: Inventory management, stock control
 * - Stores Manager: Order management, goods issuance
 * - Inventory Personnel: Add inventory from market
 * - Kitchen Chef: Recipe management, waste tracking
 * - Bartender: Order management, waste tracking
 * 
 * DATABASE SCHEMA MAPPING:
 * =======================
 * The ROLES enum should be stored in the database as:
 * CREATE TABLE roles (
 *   id INT PRIMARY KEY AUTO_INCREMENT,
 *   role_name VARCHAR(50) UNIQUE NOT NULL,
 *   access_level INT NOT NULL,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * USER AUTHENTICATION:
 * ===================
 * Current mock users should be migrated to database:
 * - Username: unique identifier
 * - Password: should be hashed using bcrypt
 * - Role: foreign key reference to roles table
 * - Name: display name for UI
 * 
 * API INTEGRATION POINTS:
 * =====================
 * 1. Replace MOCK_USERS with API calls to /api/users
 * 2. Implement role-based middleware for protected routes
 * 3. Use role constants for permission checking
 * 4. Validate user permissions on both frontend and backend
 */

// Recipe names and colors
export const recipeColors = [
  'rgb(59, 130, 246)', // blue (Jollof Rice)
  'rgb(16, 185, 129)', // green (Banku)
  'rgb(245, 158, 11)', // yellow (Fufu)
  'rgb(239, 68, 68)',  // red (Waakye)
  'rgb(139, 92, 246)', // purple (Tuo Zaafi)
  'rgb(236, 72, 153)', // pink (Kenkey)
  'rgb(34, 197, 94)',  // green (Yam)
  'rgb(249, 115, 22)', // orange (Plantain)
  'rgb(6, 182, 212)',  // cyan (Rice)
  'rgb(168, 85, 247)', // violet (Beans)
  'rgb(251, 146, 60)', // orange (Fried Rice)
];

// User roles and their permissions
export const ROLES = {
  DIRECTOR: 'Director',           // Owner - View only, no editing
  MANAGER: 'Manager',             // Overseer - View only, can manage users
  MIS_OFFICER: 'MIS Officer',     // Track sales and inventory, reconciliation
  WAREHOUSE_MANAGER: 'Warehouse Manager', // Add items to warehouse
  STORES_MANAGER: 'Stores Manager',       // Order from warehouse and kitchen
  INVENTORY_PERSONNEL: 'Inventory Personnel', // Add inventory from market
  KITCHEN_CHEF: 'Kitchen Chef',   // Order from stores
  BARTENDER: 'Bartender'          // Order from stores
};

// Mock users for demonstration
// TODO: Replace with database integration
export const MOCK_USERS = [
  { username: 'director', password: 'director123', role: ROLES.DIRECTOR, name: 'John Director' },
  { username: 'manager', password: 'manager123', role: ROLES.MANAGER, name: 'Sarah Manager' },
  { username: 'mis', password: 'mis123', role: ROLES.MIS_OFFICER, name: 'Mike MIS Officer' },
  { username: 'warehouse', password: 'warehouse123', role: ROLES.WAREHOUSE_MANAGER, name: 'Lisa Warehouse Manager' },
  { username: 'stores', password: 'stores123', role: ROLES.STORES_MANAGER, name: 'Tom Stores Manager' },
  { username: 'inventory', password: 'inventory123', role: ROLES.INVENTORY_PERSONNEL, name: 'Anna Inventory Personnel' },
  { username: 'chef', password: 'chef123', role: ROLES.KITCHEN_CHEF, name: 'Yaw Asumang Chef' },
  { username: 'bartender', password: 'bartender123', role: ROLES.BARTENDER, name: 'Alex Bartender' }
]; 