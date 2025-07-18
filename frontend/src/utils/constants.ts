// Recipe names and colors
export const recipeNames = ['Jollof Rice', 'Grilled Chicken', 'Shawarma', 'Fried Rice', 'Beef Kebab'];
export const recipeColors = [
  'rgb(37, 99, 235)', // blue (Jollof Rice)
  'rgb(16, 185, 129)', // green (Grilled Chicken)
  'rgb(234, 179, 8)', // yellow (Shawarma)
  'rgb(20, 184, 166)', // teal (Fried Rice)
  'rgb(251, 146, 60)', // orange (Beef Kebab)
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
export const MOCK_USERS = [
  { username: 'director', password: 'director123', role: ROLES.DIRECTOR, name: 'MaxGate Director' },
  { username: 'manager', password: 'manager123', role: ROLES.MANAGER, name: 'Sarah Manager' },
  { username: 'mis', password: 'mis123', role: ROLES.MIS_OFFICER, name: 'Mike MIS Officer' },
  { username: 'warehouse', password: 'warehouse123', role: ROLES.WAREHOUSE_MANAGER, name: 'Lisa Warehouse Manager' },
  { username: 'stores', password: 'stores123', role: ROLES.STORES_MANAGER, name: 'Tom Stores Manager' },
  { username: 'inventory', password: 'inventory123', role: ROLES.INVENTORY_PERSONNEL, name: 'Anna Inventory Personnel' },
  { username: 'chef', password: 'chef123', role: ROLES.KITCHEN_CHEF, name: 'Yaw Asumang Chef' },
  { username: 'bartender', password: 'bartender123', role: ROLES.BARTENDER, name: 'Emma Bartender' },
]; 