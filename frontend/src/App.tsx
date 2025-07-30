import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ReportsPage from './pages/ReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RecipesPage from './pages/RecipesPage';
import IssueGoodsPage from './pages/IssueGoodsPage';
import WastePage from './pages/WastePage';
import ReconcilePage from './pages/ReconcilePage';
import UserManagementPage from './pages/UserManagementPage';
import SettingsPage from './pages/SettingsPage';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar';
import { alertIcons } from './components/AlertIcons';
import { ROLES, MOCK_USERS } from './utils/constants';
import { downloadReport } from './utils/helpers';
import { generateAnalyticsDataWeek, analyticsOptions } from './utils/chartConfig';
import { useAuth } from './hooks/useAuth';
import type { Recipe } from './types';
import DirectorPage from './pages/DirectorPage';
import ManagerPage from './pages/ManagerPage';
import MISOfficerPage from './pages/MISOfficerPage';
import WarehouseManagerPage from './pages/WarehouseManagerPage';
import StoresManagerPage from './pages/StoresManagerPage';
import InventoryPersonnelPage from './pages/InventoryPersonnelPage';
import KitchenChefPage from './pages/KitchenChefPage';
import BartenderPage from './pages/BartenderPage';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Role-based navigation items
const getNavItemsByRole = (role: string) => {
  const allNavItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER, ROLES.MIS_OFFICER, ROLES.WAREHOUSE_MANAGER, ROLES.STORES_MANAGER, ROLES.INVENTORY_PERSONNEL, ROLES.KITCHEN_CHEF, ROLES.BARTENDER]
    },
    {
      name: 'Inventory',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER, ROLES.MIS_OFFICER, ROLES.WAREHOUSE_MANAGER, ROLES.STORES_MANAGER, ROLES.INVENTORY_PERSONNEL]
    },
    {
      name: 'Recipes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19c0-2.21 3.582-4 8-4s8 1.79 8 4" /><path d="M7 10c0-2.21 2.686-4 6-4s6 1.79 6 4" /><ellipse cx="12" cy="10" rx="6" ry="3" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER, ROLES.KITCHEN_CHEF, ROLES.BARTENDER]
    },
    {
      name: 'Issue Goods',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
      ),
      roles: [ROLES.STORES_MANAGER, ROLES.KITCHEN_CHEF, ROLES.BARTENDER]
    },
    {
      name: 'Reconcile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-9-9" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
      ),
      roles: [ROLES.MIS_OFFICER]
    },
    {
      name: 'Waste',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M19 6l-1.5 14a2 2 0 01-2 2H8.5a2 2 0 01-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
      ),
      roles: [ROLES.KITCHEN_CHEF, ROLES.BARTENDER]
    },
    {
      name: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="8" /><rect x="9" y="8" width="4" height="12" /><rect x="15" y="4" width="4" height="16" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER, ROLES.MIS_OFFICER]
    },
    {
      name: 'Reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER, ROLES.MIS_OFFICER]
    },
    {
      name: 'User Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER]
    },
    {
      name: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.38 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l-.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 01.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.38-1.51 1z"/></svg>
      ),
      roles: [ROLES.DIRECTOR, ROLES.MANAGER]
    }
  ];

  return allNavItems.filter(item => item.roles.includes(role));
};



const App = () => {
  // User management state (needed for authentication)
  const [users, setUsers] = useState(MOCK_USERS);
  
  // Authentication state
  const {
    isAuthenticated,
    currentUser,
    loginError,
    isLoading,
    preloaderStep,
    setPreloaderStep,
    handleLogin,
    handleLogout,

  } = useAuth(users);
  
  // Navigation state
  const [activePage, setActivePage] = useState('Dashboard');
  // Modal state for each action (except analytics)
  const [modal, setModal] = useState<null | 'issueGoods' | 'logWaste' | 'reconcile'>(null);
  
  // Inventory state
  const [inventoryItems, setInventoryItems] = useState([
    { item: 'Tilapia', category: 'Fish', unit: 'kg', stock: '5' },
    { item: 'Eggs', category: 'Poultry', unit: 'pcs', stock: '8' },
    { item: 'Tomatoes', category: 'Vegetable', unit: 'kg', stock: '25' },
    { item: 'Vodka', category: 'Beverage', unit: 'L', stock: '2' },
    { item: 'Rice', category: 'Grain', unit: 'kg', stock: '50' },
    { item: 'Chicken', category: 'Poultry', unit: 'kg', stock: '12' },
    { item: 'Oil', category: 'Condiment', unit: 'L', stock: '7' },
    { item: 'Salt', category: 'Condiment', unit: 'kg', stock: '20' },
  ]);

  // Add state for week selection
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    return start.toISOString().slice(0, 10);
  });



  // Generate mock data for the selected week
  const analyticsDataWeek = generateAnalyticsDataWeek(weekStart);

  // Recipes state
  const [recipes, setRecipes] = useState([
    { id: '1', name: 'Jollof Rice', portionSize: '1 plate', ingredients: [ { name: 'Rice', quantity: '0.2', unit: 'kg' }, { name: 'Tomatoes', quantity: '0.1', unit: 'kg' }, { name: 'Oil', quantity: '0.02', unit: 'L' } ] },
    { id: '2', name: 'Grilled Chicken', portionSize: '1 piece', ingredients: [ { name: 'Chicken', quantity: '0.25', unit: 'kg' }, { name: 'Salt', quantity: '0.01', unit: 'kg' }, { name: 'Oil', quantity: '0.01', unit: 'L' } ] },
    { id: '3', name: 'Shawarma', portionSize: '1 wrap', ingredients: [ { name: 'Chicken', quantity: '0.15', unit: 'kg' }, { name: 'Oil', quantity: '0.01', unit: 'L' }, { name: 'Salt', quantity: '0.005', unit: 'kg' } ] },
    { id: '4', name: 'Fried Rice', portionSize: '1 plate', ingredients: [ { name: 'Rice', quantity: '0.2', unit: 'kg' }, { name: 'Eggs', quantity: '1', unit: 'pcs' }, { name: 'Oil', quantity: '0.02', unit: 'L' } ] },
    { id: '5', name: 'Beef Kebab', portionSize: '1 stick', ingredients: [ { name: 'Beef', quantity: '0.1', unit: 'kg' }, { name: 'Salt', quantity: '0.002', unit: 'kg' } ] },
    { id: '6', name: 'Vodka Tonic', portionSize: '1 glass', ingredients: [ { name: 'Vodka', quantity: '0.05', unit: 'L' } ] },
    { id: '7', name: 'Tomato Soup', portionSize: '1 bowl', ingredients: [ { name: 'Tomatoes', quantity: '0.15', unit: 'kg' }, { name: 'Salt', quantity: '0.003', unit: 'kg' } ] },
    { id: '8', name: 'Egg Omelette', portionSize: '1 serving', ingredients: [ { name: 'Eggs', quantity: '2', unit: 'pcs' }, { name: 'Salt', quantity: '0.002', unit: 'kg' }, { name: 'Oil', quantity: '0.01', unit: 'L' } ] },
  ]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Issue Goods state
  const [issueRecipeId, setIssueRecipeId] = useState<string>('');
  const [issueQuantity, setIssueQuantity] = useState<number>(1);
  const [issueError, setIssueError] = useState<string>('');
  const [issueSuccess, setIssueSuccess] = useState<string>('');
  const [customRecipeName, setCustomRecipeName] = useState<string>('');
  const [useCustomRecipe, setUseCustomRecipe] = useState<boolean>(false);

  // Add these state hooks at the top of App component, after inventoryItems state:
  const [issueItemName, setIssueItemName] = useState('');
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [inventoryForm, setInventoryForm] = useState({ item: '', category: '', unit: '', stock: '' });
  const [inventoryFormError, setInventoryFormError] = useState('');

  // Add these state hooks at the top of App component, after inventoryItems state:
  const [showGoodsIssuanceModal, setShowGoodsIssuanceModal] = useState(false);
  const [goodsIssuanceForm, setGoodsIssuanceForm] = useState({ date: '', department: '', item: '', issued: '' });
  const [goodsIssuanceFormError, setGoodsIssuanceFormError] = useState('');
  const [goodsIssuance, setGoodsIssuance] = useState([
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Tilapia', issued: 2 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Eggs', issued: 6 },
    { date: '04/23/2024', department: 'Kitchen', item: 'Tomatoes', issued: 4 },
    { date: new Date().toISOString().slice(0, 10), department: 'Bar', item: 'Vodka', issued: 1 },
    { date: '04/22/2024', department: 'Kitchen', item: 'Rice', issued: 10 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Chicken', issued: 3 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Oil', issued: 2 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Salt', issued: 1 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Beef', issued: 5 },
    { date: new Date().toISOString().slice(0, 10), department: 'Kitchen', item: 'Flatbread', issued: 7 },
  ]);

  // Add these state hooks at the top of App component, after inventoryItems state:
  const [showDailyUsageModal, setShowDailyUsageModal] = useState(false);
  const [dailyUsageForm, setDailyUsageForm] = useState({ item: '', expected: '', diff: '' });
  const [dailyUsageFormError, setDailyUsageFormError] = useState('');
  const [dailyUsage, setDailyUsage] = useState([
    { item: 'Eggs', expected: '40 g', diff: '8.3 g' },
    { item: 'Tomatoes', expected: '40 g', diff: '4.3 g' },
    { item: 'Vodka', expected: '40 g', diff: '5.4 g' },
    { item: 'Rice', expected: '40 g', diff: '2.1 g' },
    { item: 'Chicken', expected: '40 g', diff: '3.7 g' },
    { item: 'Oil', expected: '40 g', diff: '1.2 g' },
    { item: 'Salt', expected: '40 g', diff: '0.8 g' },
    { item: 'Beef', expected: '40 g', diff: '6.5 g' },
    { item: 'Flatbread', expected: '40 g', diff: '2.9 g' },
    { item: 'Spices', expected: '40 g', diff: '0.5 g' },
  ]);

  // Add at the top of App component, after other state hooks:
  const [alertModal, setAlertModal] = useState<null | 'lowStock' | 'issued' | 'waste'>(null);

  // Order notifications state
  const [orderNotifications, setOrderNotifications] = useState<any[]>([]);

  // Add after orderNotifications state
  const [restockRequests, setRestockRequests] = useState<any[]>([]);

  const handleRequestRestock = (item: any) => {
    const existing = restockRequests.find(r => r.item === item.item && r.status === 'requested');
    if (existing) return; // Prevent duplicate requests for same item
    setRestockRequests(prev => [
      {
        id: Date.now().toString(),
        item: item.item,
        quantity: item.requestedQuantity || item.stock,
        urgency: item.urgency || 'low_stock',
        notes: item.notes || '',
        requestedBy: currentUser.name,
        date: new Date().toISOString().slice(0, 10),
        status: 'requested',
      },
      ...prev,
    ]);
  };

  const handleRestockStatus = (id: string, status: string) => {
    setRestockRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // User management state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userForm, setUserForm] = useState({ name: '', username: '', password: '', role: '' });
  const [userFormError, setUserFormError] = useState('');

  // Helper to get low stock items (e.g., stock < 10, adjust as needed)
  const lowStockItems = inventoryItems.filter(item => {
    const num = parseFloat(item.stock);
    return !isNaN(num) && num < 10;
  });

  // Helper to get today's issued items
  const today = new Date().toISOString().slice(0, 10);
  const todaysIssued = goodsIssuance.filter(g => {
    // Accept both YYYY-MM-DD and MM/DD/YYYY
    if (!g.date) return false;
    if (g.date.includes('-')) return g.date === today;
    // Convert MM/DD/YYYY to YYYY-MM-DD
    const [mm, dd, yyyy] = g.date.split('/');
    if (!mm || !dd || !yyyy) return false;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}` === today;
  });

  // Helper: get selected recipe
  const selectedRecipe = recipes.find(r => r.id === issueRecipeId);

  // Helper: calculate required ingredients
  const requiredIngredients = selectedRecipe
    ? selectedRecipe.ingredients.map(ing => ({
        ...ing,
        total: Number(ing.quantity) * issueQuantity,
      }))
    : [];

  // Helper: check inventory (assume inventory state exists as inventory: { name: string, quantity: number, unit: string }[])
  const inventoryMap = new Map(inventoryItems.map(item => [item.item, item]));
  const insufficient = requiredIngredients.filter(ing => {
    const inv = inventoryMap.get(ing.name);
    // Parse numeric value from stock string (e.g., '50 kg' -> 50)
    const invQty = inv ? parseFloat(inv.stock) : 0;
    return !inv || invQty < ing.total;
  });

  // Handler: Issue Goods
  const handleIssueGoods = () => {
    setIssueError('');
    setIssueSuccess('');
    
    if (useCustomRecipe) {
      if (!customRecipeName.trim()) {
        setIssueError('Please enter a custom recipe name.');
        return;
      }
      if (issueQuantity < 1) {
        setIssueError('Quantity must be at least 1.');
        return;
      }
      
      // For custom recipes, we don't check ingredients since they're not predefined
      // Create order notification for Warehouse Manager and Stores Manager
      const newNotification = {
        id: Date.now().toString(),
        orderId: `ORDER-${Date.now()}`,
        recipeName: customRecipeName,
        quantity: issueQuantity,
        orderedBy: currentUser.name,
        timestamp: new Date(),
        status: 'new' as const
      };
      setOrderNotifications(prev => [newNotification, ...prev]);

      setIssueSuccess('Custom recipe order sent successfully! Order notification sent to warehouse and stores managers.');
      setCustomRecipeName('');
      setUseCustomRecipe(false);
      setIssueQuantity(1);
      return;
    }
    
    if (!selectedRecipe) {
      setIssueError('Please select a recipe or enter a custom recipe name.');
      return;
    }
    if (issueQuantity < 1) {
      setIssueError('Quantity must be at least 1.');
      return;
    }
    if (insufficient.length > 0) {
      setIssueError('Insufficient stock for: ' + insufficient.map(i => i.name).join(', '));
      return;
    }
    // Deduct from inventory
    setInventoryItems(prev => prev.map(item => {
      const ingredient = selectedRecipe.ingredients.find(ing => ing.name === item.item);
      if (ingredient) {
        const currentStock = parseFloat(item.stock);
        const requiredQty = parseFloat(ingredient.quantity) * issueQuantity;
        const newStock = Math.max(0, currentStock - requiredQty);
        return {
          ...item,
          stock: newStock + ' ' + item.unit
        };
      }
      return item;
    }));

    // Create order notification for Warehouse Manager and Stores Manager
    const newNotification = {
      id: Date.now().toString(),
      orderId: `ORDER-${Date.now()}`,
      recipeName: selectedRecipe.name,
      quantity: issueQuantity,
      orderedBy: currentUser.name,
      timestamp: new Date(),
      status: 'new' as const
    };
    setOrderNotifications(prev => [newNotification, ...prev]);

    setIssueSuccess('Goods issued successfully! Order notification sent to warehouse and stores managers.');
    setIssueRecipeId('');
    setIssueQuantity(1);
  };

  // Handlers for each button
  const handleAddRecipe = () => {
    setEditingRecipe({ id: '', name: '', portionSize: '', ingredients: [{ name: '', quantity: '', unit: '' }] });
    setShowRecipeModal(true);
  };

  const handleCloseModal = () => setModal(null);
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe({ ...recipe });
    setShowRecipeModal(true);
  };
  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };
  const handleRecipeModalClose = () => {
    setShowRecipeModal(false);
    setEditingRecipe(null);
  };
  const handleRecipeModalSave = () => {
    if (!editingRecipe) return;
    if (editingRecipe.id) {
      setRecipes(recipes.map(r => r.id === editingRecipe.id ? editingRecipe : r));
    } else {
      setRecipes([...recipes, { ...editingRecipe, id: Date.now().toString() }]);
    }
    setShowRecipeModal(false);
    setEditingRecipe(null);
  };

  // Add after other state declarations in App component
  const [wasteLog, setWasteLog] = useState([
    { date: new Date().toISOString().slice(0, 10), item: 'Eggs', quantity: 2, unit: 'pcs', reason: 'Spoilage', staff: 'John' },
    { date: new Date().toISOString().slice(0, 10), item: 'Tilapia', quantity: 1, unit: 'kg', reason: 'Overcooked', staff: 'Mary' },
    { date: '04/22/2024', item: 'Tomatoes', quantity: 3, unit: 'kg', reason: 'Expired', staff: 'Jane' },
  ]);
  const [wasteForm, setWasteForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    item: '',
    quantity: 1,
    unit: '',
    reason: 'Spoilage',
    staff: '',
  });
  const [wasteReasons, setWasteReasons] = useState<string[]>(['Spoilage', 'Overcooked', 'Expired', 'Accident', 'Other']);
  const [newReason, setNewReason] = useState('');
  const addReason = () => {
    if (newReason && !wasteReasons.includes(newReason)) {
      setWasteReasons([...wasteReasons, newReason]);
      setNewReason('');
    }
  };
  const removeReason = (reason: string) => {
    setWasteReasons(wasteReasons.filter(r => r !== reason));
    if (wasteForm.reason === reason) setWasteForm(f => ({ ...f, reason: wasteReasons[0] || '' }));
  };
  const [wasteError, setWasteError] = useState('');
  const [wasteSuccess, setWasteSuccess] = useState('');

  // Helper: get selected inventory item for waste
  const wasteInventoryItem = inventoryItems.find(i => i.item === wasteForm.item);

  // Handler: Log Waste
  const handleWasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWasteError('');
    setWasteSuccess('');
    if (!wasteForm.item) {
      setWasteError('Please select an item.');
      return;
    }
    if (wasteForm.quantity < 1) {
      setWasteError('Quantity must be at least 1.');
      return;
    }
    if (!wasteInventoryItem) {
      setWasteError('Item not found in inventory.');
      return;
    }
    // Parse numeric value from stock string (e.g., '50 kg' -> 50)
    const invQty = parseFloat(wasteInventoryItem.stock);
    if (invQty < wasteForm.quantity) {
      setWasteError('Insufficient stock for this waste event.');
      return;
    }
    // Deduct from inventory
    setInventoryItems(prev => prev.map(item => 
      item.item === wasteForm.item 
        ? { ...item, stock: (invQty - wasteForm.quantity) + ' ' + item.unit }
        : item
    ));
    setWasteLog(prev => [
      {
        date: wasteForm.date,
        item: wasteForm.item,
        quantity: wasteForm.quantity,
        unit: wasteInventoryItem.unit,
        reason: wasteForm.reason,
        staff: wasteForm.staff,
      },
      ...prev,
    ]);
    setWasteSuccess('Waste event logged.');
    setWasteForm({
      date: new Date().toISOString().slice(0, 10),
      item: '',
      quantity: 1,
      unit: '',
      reason: 'Spoilage',
      staff: '',
    });
  };

  // Waste analytics helpers
  const totalEvents = wasteLog.length;
  const totalQuantity = wasteLog.reduce((sum, w) => sum + w.quantity, 0);

  const wasteByReason = wasteLog.reduce((acc, w) => {
    acc[w.reason] = (acc[w.reason] || 0) + w.quantity;
    return acc;
  }, {} as Record<string, number>);

  // Add state and handlers for editing reasons in App component
  const [editingReasonIdx, setEditingReasonIdx] = useState<number | null>(null);
  const [editingReasonValue, setEditingReasonValue] = useState('');
  const startEditReason = (idx: number, value: string) => {
    setEditingReasonIdx(idx);
    setEditingReasonValue(value);
  };
  const saveEditedReason = (idx: number) => {
    const trimmed = editingReasonValue.trim();
    if (!trimmed || wasteReasons.includes(trimmed)) {
      setEditingReasonIdx(null);
      setEditingReasonValue('');
      return;
    }
    setWasteReasons(wasteReasons.map((r, i) => (i === idx ? trimmed : r)));
    if (wasteForm.reason === wasteReasons[idx]) setWasteForm(f => ({ ...f, reason: trimmed }));
    setEditingReasonIdx(null);
    setEditingReasonValue('');
  };
  const cancelEditReason = () => {
    setEditingReasonIdx(null);
    setEditingReasonValue('');
  };

  // Add state for reconciliation
  const [reconcileRows, setReconcileRows] = useState(() =>
    inventoryItems.map(item => ({
      item: item.item,
      systemStock: item.stock,
      physicalCount: '',
      discrepancy: '',
      note: '',
      updated: false,
    }))
  );
  const [reconcileSuccess, setReconcileSuccess] = useState('');
  const [reconcileError, setReconcileError] = useState('');

  // Handler for physical count input
  const handleReconcileInput = (idx: number, value: string) => {
    setReconcileRows(rows => rows.map((row, i) =>
      i === idx ? {
        ...row,
        physicalCount: value,
        discrepancy: value !== '' ? (parseFloat(value) - parseFloat(row.systemStock)).toString() : '',
        updated: false,
      } : row
    ));
  };

  // Handler for note input
  const handleReconcileNote = (idx: number, value: string) => {
    setReconcileRows(rows => rows.map((row, i) =>
      i === idx ? { ...row, note: value } : row
    ));
  };

  // Handler to update inventory with reconciled values
  const handleReconcileUpdate = (idx: number) => {
    setInventoryItems((items: typeof inventoryItems) => items.map((item: typeof inventoryItems[0]) =>
      item.item === reconcileRows[idx].item && reconcileRows[idx].physicalCount !== ''
        ? { ...item, stock: reconcileRows[idx].physicalCount + (item.unit ? ' ' + item.unit : '') }
        : item
    ));
    setReconcileRows(rows => rows.map((row, i) =>
      i === idx ? { ...row, updated: true } : row
    ));
    setReconcileSuccess('Inventory updated for ' + reconcileRows[idx].item);
    setTimeout(() => setReconcileSuccess(''), 2000);
  };

  // Handler to reset reconciliation
  const handleReconcileReset = () => {
    setReconcileRows(inventoryItems.map(item => ({
      item: item.item,
      systemStock: item.stock,
      physicalCount: '',
      discrepancy: '',
      note: '',
      updated: false,
    })));
    setReconcileSuccess('');
    setReconcileError('');
  };

  // Add state for report options
  const [reportFormat, setReportFormat] = useState<'csv' | 'json' | 'txt' | 'pdf'>('pdf');




  // Add state for settings
  const [settings, setSettings] = useState({
    restaurantName: 'Coral Gardens',
    logo: '',
    contactEmail: '',
    contactPhone: '',
    unit: 'kg',
    currency: '₵',
    language: 'English',
    theme: 'light',
  });
  const [settingsSuccess, setSettingsSuccess] = useState('');


  const [importError, setImportError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Handler: Update settings field
  const handleSettingsChange = (field: string, value: string) => {
    setSettings(s => ({ ...s, [field]: value }));
  };

  // Handler: Save settings (simulate save)
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess('Settings saved!');
    setTimeout(() => setSettingsSuccess(''), 2000);
  };

  // Handler: Theme toggle
  const toggleTheme = () => {
    setSettings(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }));
  };

  // Handler: Export data (JSON)
  const exportData = () => {
    const data = {
      inventoryItems,
      recipes,
      wasteLog,
      settings,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coral-gardens-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handler: Import data (JSON)
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.inventoryItems && data.recipes && data.wasteLog && data.settings) {
          setInventoryItems(data.inventoryItems);
          setRecipes(data.recipes);
          setWasteLog(data.wasteLog);
          setSettings(data.settings);
          setImportError('');
          setSettingsSuccess('Data imported!');
          setTimeout(() => setSettingsSuccess(''), 2000);
        } else {
          setImportError('Invalid backup file.');
        }
      } catch {
        setImportError('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Handler: Reset all data
  const resetAllData = () => {
    setInventoryItems([]);
    setRecipes([]);
    setWasteLog([]);
    setOrderNotifications([]);
    setSettings({
      restaurantName: '',
      logo: '',
      contactEmail: '',
      contactPhone: '',
      unit: 'kg',
      currency: '₵',
      language: 'English',
      theme: 'light',
    });
    setShowResetConfirm(false);
    setSettingsSuccess('All data reset!');
    setTimeout(() => setSettingsSuccess(''), 2000);
  };

  // Notification handlers
  const handleAcknowledgeNotification = (notificationId: string) => {
    setOrderNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: 'acknowledged' as const,
              approvedBy: currentUser.name,
              approvedAt: new Date()
            }
          : notification
      )
    );
  };

  const handleCompleteNotification = (notificationId: string) => {
    setOrderNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: 'completed' as const,
              completedBy: currentUser.name,
              completedAt: new Date()
            }
          : notification
      )
    );
  };

  // Handler for Warehouse/Stores managers to approve orders from Chef/Bartender
  const handleApproveOrder = (notificationId: string) => {
    setOrderNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: 'acknowledged' as const,
              approvedBy: currentUser.name,
              approvedAt: new Date()
            }
          : notification
      )
    );
  };

  // Handler for Warehouse/Stores managers to complete orders
  const handleCompleteOrder = (notificationId: string) => {
    setOrderNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: 'completed' as const,
              completedBy: currentUser.name,
              completedAt: new Date()
            }
          : notification
      )
    );
  };



  // Login form state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(loginForm.username, loginForm.password);
    setActivePage('Dashboard');
  };

  // Add these handlers in App component:
  const handleAddInventory = () => {
    setEditingInventoryItem(null);
    setInventoryForm({ item: '', category: '', unit: '', stock: '' });
    setInventoryFormError('');
    setShowInventoryModal(true);
  };
  const handleEditInventory = (item: any) => {
    setEditingInventoryItem(item);
    setInventoryForm({ ...item });
    setInventoryFormError('');
    setShowInventoryModal(true);
  };
  const handleInventoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryForm({ ...inventoryForm, [e.target.name]: e.target.value });
  };
  const handleInventoryFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inventoryForm.item || !inventoryForm.category || !inventoryForm.unit || !inventoryForm.stock) {
      setInventoryFormError('All fields are required.');
      return;
    }
    if (editingInventoryItem) {
      setInventoryItems(prev => prev.map((i: any) => i.item === (editingInventoryItem as any).item ? { ...inventoryForm } : i));
    } else {
      setInventoryItems(prev => [...prev, { ...inventoryForm }]);
    }
    setShowInventoryModal(false);
  };



  // Add these handlers in App component:
  const handleAddGoodsIssuance = () => {
    setGoodsIssuanceForm({ date: new Date().toISOString().slice(0, 10), department: '', item: '', issued: '' });
    setGoodsIssuanceFormError('');
    setShowGoodsIssuanceModal(true);
  };
  const handleGoodsIssuanceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGoodsIssuanceForm({ ...goodsIssuanceForm, [e.target.name]: e.target.value });
  };
  const handleGoodsIssuanceFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!goodsIssuanceForm.date || !goodsIssuanceForm.department || !goodsIssuanceForm.item || !goodsIssuanceForm.issued) {
      setGoodsIssuanceFormError('All fields are required.');
      return;
    }
    
    // Add to goods issuance log
    setGoodsIssuance(prev => [
      { ...goodsIssuanceForm, issued: Number(goodsIssuanceForm.issued) },
      ...prev,
    ]);
    
    // If Stores Manager is issuing goods, notify Warehouse Manager
    if (currentUser.role === 'Stores Manager') {
      const newNotification = {
        id: Date.now().toString(),
        orderId: `ISSUANCE-${Date.now()}`,
        recipeName: `Goods Issuance: ${goodsIssuanceForm.item}`,
        quantity: Number(goodsIssuanceForm.issued),
        orderedBy: currentUser.name,
        timestamp: new Date(),
        status: 'new' as const
      };
      setOrderNotifications(prev => [newNotification, ...prev]);
    }
    
    setShowGoodsIssuanceModal(false);
  };

  // Add these handlers in App component:
  const handleAddDailyUsage = () => {
    setDailyUsageForm({ item: '', expected: '', diff: '' });
    setDailyUsageFormError('');
    setShowDailyUsageModal(true);
  };
  const handleDailyUsageFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyUsageForm({ ...dailyUsageForm, [e.target.name]: e.target.value });
  };
  const handleDailyUsageFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dailyUsageForm.item || !dailyUsageForm.expected || !dailyUsageForm.diff) {
      setDailyUsageFormError('All fields are required.');
      return;
    }
    setDailyUsage(prev => [
      { ...dailyUsageForm },
      ...prev,
    ]);
    setShowDailyUsageModal(false);
  };

  // 1. Add state for uploaded logo
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  // 2. Add handler for file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setUploadedLogo(ev.target?.result as string);
      // Optionally clear the URL field if you want to prioritize upload
      // setSettings(s => ({ ...s, logo: '' }));
    };
    reader.readAsDataURL(file);
  };

  // User management handlers
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', username: '', password: '', role: '' });
    setUserFormError('');
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserForm({ ...user });
    setUserFormError('');
    setShowUserModal(true);
  };

  const handleDeleteUser = (username: string) => {
    if (username === currentUser.username) {
      setUserFormError('You cannot delete your own account.');
      return;
    }
    setUsers(prev => prev.filter(user => user.username !== username));
  };

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserFormError('');

    if (!userForm.name || !userForm.username || !userForm.password || !userForm.role) {
      setUserFormError('All fields are required.');
      return;
    }

    // Check if username already exists (for new users)
    if (!editingUser && users.some(user => user.username === userForm.username)) {
      setUserFormError('Username already exists.');
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.username === editingUser.username 
          ? { ...userForm }
          : user
      ));
    } else {
      // Add new user
      setUsers(prev => [...prev, { ...userForm }]);
    }

    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({ name: '', username: '', password: '', role: '' });
  };



  // Login page component
  if (isLoading && currentUser) return <Preloader name={currentUser.name.split(' ')[0]} preloaderStep={preloaderStep} setPreloaderStep={setPreloaderStep} />;
  if (!isAuthenticated) {
    return (
      <LoginPage
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLoginSubmit={handleLoginSubmit}
        loginError={loginError}
      />
    );
  }

  // Get navigation items based on user role
  const navItems = getNavItemsByRole(currentUser.role);

  return (
    <div className="bg-blue-50 min-h-screen">
      <Sidebar
        currentUser={currentUser}
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={() => { handleLogout(); setActivePage('Dashboard'); }}
        navItems={navItems}
        uploadedLogo={uploadedLogo}
        settingsLogo={settings.logo}
      />
      <main className="ml-60 p-8 overflow-y-scroll h-screen bg-blue-50 text-black">
        {activePage === 'Dashboard' ? (
          currentUser.role === ROLES.DIRECTOR ? (
            <DirectorPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              recipes={recipes}
              MOCK_USERS={MOCK_USERS}
              lowStockItems={lowStockItems}
              todaysIssued={todaysIssued}
              orderNotifications={orderNotifications}
              restockRequests={restockRequests}
              handleRestockStatus={handleRestockStatus}
            />
          ) : currentUser.role === ROLES.MANAGER ? (
            <ManagerPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              recipes={recipes}
              MOCK_USERS={MOCK_USERS}
              lowStockItems={lowStockItems}
              orderNotifications={orderNotifications}
              restockRequests={restockRequests}
              handleRestockStatus={handleRestockStatus}
              setActivePage={setActivePage}
            />
          ) : currentUser.role === ROLES.MIS_OFFICER ? (
            <MISOfficerPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              goodsIssuance={goodsIssuance}
              wasteLog={wasteLog}
              lowStockItems={lowStockItems}
              setActivePage={setActivePage}
            />
          ) : currentUser.role === ROLES.WAREHOUSE_MANAGER ? (
            <WarehouseManagerPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              lowStockItems={lowStockItems}
              goodsIssuance={goodsIssuance}
              setActivePage={setActivePage}
              restockRequests={restockRequests}
              handleRequestRestock={handleRequestRestock}
              orderNotifications={orderNotifications}
              handleApproveOrder={handleApproveOrder}
              handleCompleteOrder={handleCompleteOrder}
            />
          ) : currentUser.role === ROLES.STORES_MANAGER ? (
            <StoresManagerPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              lowStockItems={lowStockItems}
              goodsIssuance={goodsIssuance}
              setActivePage={setActivePage}
              orderNotifications={orderNotifications}
              handleApproveOrder={handleApproveOrder}
              handleCompleteOrder={handleCompleteOrder}
            />
          ) : currentUser.role === ROLES.INVENTORY_PERSONNEL ? (
            <InventoryPersonnelPage
              currentUser={currentUser}
              inventoryItems={inventoryItems}
              lowStockItems={lowStockItems}
              goodsIssuance={goodsIssuance}
              setActivePage={setActivePage}
            />
          ) : currentUser.role === ROLES.KITCHEN_CHEF ? (
            <KitchenChefPage
              currentUser={currentUser}
              recipes={recipes}
              setActivePage={setActivePage}
            />
          ) : currentUser.role === ROLES.BARTENDER ? (
            <BartenderPage
              currentUser={currentUser}
              recipes={recipes}
              setActivePage={setActivePage}
            />
          ) : null
        ) : activePage === 'Reports' ? (
          <ReportsPage
            reportFormat={reportFormat}
            setReportFormat={setReportFormat}
            downloadReport={(data: any[], filename: string) => downloadReport(data, filename, reportFormat)}

            currentUser={currentUser}
            orderNotifications={orderNotifications}
            goodsIssuance={goodsIssuance}
            wasteLog={wasteLog}
            inventoryItems={inventoryItems}
            recipes={recipes}
            restockRequests={restockRequests}
          />
        ) : activePage === 'Analytics' ? (
          <AnalyticsPage
            weekStart={weekStart}
            setWeekStart={setWeekStart}
            analyticsDataWeek={analyticsDataWeek}
            analyticsOptions={analyticsOptions}
          />
        ) : activePage === 'Recipes' ? (
          <RecipesPage
            currentUser={currentUser}
            ROLES={ROLES}
            recipes={recipes}
            handleAddRecipe={handleAddRecipe}
            handleEditRecipe={handleEditRecipe}
            handleDeleteRecipe={handleDeleteRecipe}
            showRecipeModal={showRecipeModal}
            editingRecipe={editingRecipe}
            setEditingRecipe={setEditingRecipe}
            handleRecipeModalClose={handleRecipeModalClose}
            handleRecipeModalSave={handleRecipeModalSave}
          />
        ) : activePage === 'Issue Goods' ? (
          <IssueGoodsPage
            currentUser={currentUser}
            ROLES={ROLES}
            issueRecipeId={issueRecipeId}
            setIssueRecipeId={setIssueRecipeId}
            issueQuantity={issueQuantity}
            setIssueQuantity={setIssueQuantity}
            recipes={recipes}
            selectedRecipe={selectedRecipe}
            requiredIngredients={requiredIngredients}
            inventoryMap={inventoryMap}
            insufficient={insufficient}
            handleIssueGoods={handleIssueGoods}
            issueError={issueError}
            issueSuccess={issueSuccess}
            customRecipeName={customRecipeName}
            setCustomRecipeName={setCustomRecipeName}
            useCustomRecipe={useCustomRecipe}
            setUseCustomRecipe={setUseCustomRecipe}
          />
        ) : activePage === 'Waste' ? (
          <WastePage
            currentUser={currentUser}
            ROLES={ROLES}
            wasteLog={wasteLog}
            wasteForm={wasteForm}
            setWasteForm={setWasteForm}
            wasteReasons={wasteReasons}
            newReason={newReason}
            setNewReason={setNewReason}
            addReason={addReason}
            removeReason={removeReason}
            editingReasonIdx={editingReasonIdx}
            editingReasonValue={editingReasonValue}
            setEditingReasonValue={setEditingReasonValue}
            startEditReason={startEditReason}
            saveEditedReason={saveEditedReason}
            cancelEditReason={cancelEditReason}
            handleWasteSubmit={handleWasteSubmit}
            wasteError={wasteError}
            wasteSuccess={wasteSuccess}
            totalEvents={totalEvents}
            totalQuantity={totalQuantity}
            wasteByReason={wasteByReason}
            inventoryItems={inventoryItems}
          />
        ) : activePage === 'Reconcile' ? (
          <ReconcilePage
            reconcileRows={reconcileRows}
            reconcileSuccess={reconcileSuccess}
            reconcileError={reconcileError}
            handleReconcileInput={handleReconcileInput}
            handleReconcileNote={handleReconcileNote}
            handleReconcileUpdate={handleReconcileUpdate}
            handleReconcileReset={handleReconcileReset}
          />
        ) : activePage === 'User Management' ? (
          <UserManagementPage
            MOCK_USERS={MOCK_USERS}
            ROLES={ROLES}
            currentUser={currentUser}
            users={users}
            setUsers={setUsers}
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            userForm={userForm}
            setUserForm={setUserForm}
            userFormError={userFormError}
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
            handleUserFormChange={handleUserFormChange}
            handleUserFormSubmit={handleUserFormSubmit}
          />
        ) : activePage === 'Settings' ? (
          <SettingsPage
            settings={settings}
            handleSettingsChange={handleSettingsChange}
            saveSettings={saveSettings}
            toggleTheme={toggleTheme}
            exportData={exportData}
            handleImport={handleImport}
            resetAllData={resetAllData}
            settingsSuccess={settingsSuccess}
            settingsError=""
            importError={importError}
            showResetConfirm={showResetConfirm}
            setShowResetConfirm={setShowResetConfirm}
            uploadedLogo={uploadedLogo}
            handleLogoUpload={handleLogoUpload}
          />
                  ) : (
            <InventoryPage
              currentUser={currentUser}
              ROLES={ROLES}
              inventoryItems={inventoryItems}
              recipes={recipes}
              wasteLog={wasteLog}
              goodsIssuance={goodsIssuance}
              dailyUsage={dailyUsage}
              lowStockItems={lowStockItems}
              todaysIssued={todaysIssued}
              alertIcons={alertIcons}
              setAlertModal={setAlertModal}
              handleIssueGoods={handleIssueGoods}
              handleAddInventory={handleAddInventory}
              handleEditInventory={handleEditInventory}
              handleAddRecipe={handleAddRecipe}
              handleEditRecipe={handleEditRecipe}
              handleAddGoodsIssuance={handleAddGoodsIssuance}
              handleAddDailyUsage={handleAddDailyUsage}
              restockRequests={restockRequests}
              handleRequestRestock={handleRequestRestock}
            />
        )}
        {/* Modals (placeholders) for non-analytics actions */}
        {modal === 'issueGoods' && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowInventoryModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowInventoryModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Issue Goods</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  // Find the selected item
                  const item = inventoryItems.find(i => i.item === issueItemName);
                  if (!item) {
                    setIssueError('Please select an item.');
                    return;
                  }
                  const currentStock = parseFloat(item.stock);
                  if (isNaN(currentStock)) {
                    setIssueError('Invalid stock value.');
                    return;
                  }
                  if (issueQuantity < 1) {
                    setIssueError('Quantity must be at least 1.');
                    return;
                  }
                  if (issueQuantity > currentStock) {
                    setIssueError('Not enough stock.');
                    return;
                  }
                  setInventoryItems(prev => prev.map(i =>
                    i.item === issueItemName
                      ? { ...i, stock: (parseFloat(i.stock) - issueQuantity) + ' ' + i.unit }
                      : i
                  ));
                  setIssueError('');
                  setModal(null);
                }}
              >
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Item</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={issueItemName}
                    onChange={e => setIssueItemName(e.target.value)}
                  >
                    <option value="">Select item</option>
                    {inventoryItems.map(item => (
                      <option key={item.item} value={item.item}>{item.item} ({item.stock})</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    min={1}
                    value={issueQuantity}
                    onChange={e => setIssueQuantity(Number(e.target.value))}
                  />
                </div>
                {issueError && <div className="text-red-600 mb-2">{issueError}</div>}
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={handleCloseModal}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Issue</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {modal === 'logWaste' && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowInventoryModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowInventoryModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Log Waste</h2>
              {/* Waste logging form goes here */}
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
        {modal === 'reconcile' && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowInventoryModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowInventoryModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Reconciliation</h2>
              {/* Reconciliation form goes here */}
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}

        {showInventoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowInventoryModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowInventoryModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">{editingInventoryItem ? 'Edit' : 'Add'} Inventory Item</h2>
              <form onSubmit={handleInventoryFormSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Item</label>
                  <input
                    type="text"
                    name="item"
                    className="w-full border rounded px-3 py-2"
                    value={inventoryForm.item}
                    onChange={handleInventoryFormChange}
                    disabled={!!editingInventoryItem}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="w-full border rounded px-3 py-2"
                    value={inventoryForm.category}
                    onChange={handleInventoryFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    className="w-full border rounded px-3 py-2"
                    value={inventoryForm.unit}
                    onChange={handleInventoryFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Current Stock</label>
                  <input
                    type="text"
                    name="stock"
                    className="w-full border rounded px-3 py-2"
                    value={inventoryForm.stock}
                    onChange={handleInventoryFormChange}
                  />
                </div>
                {inventoryFormError && <div className="text-red-600 mb-2">{inventoryFormError}</div>}
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowInventoryModal(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editingInventoryItem ? 'Save' : 'Add'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showGoodsIssuanceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowGoodsIssuanceModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowGoodsIssuanceModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Add Goods Issuance</h2>
              <form onSubmit={handleGoodsIssuanceFormSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border rounded px-3 py-2"
                    value={goodsIssuanceForm.date}
                    onChange={handleGoodsIssuanceFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    className="w-full border rounded px-3 py-2"
                    value={goodsIssuanceForm.department}
                    onChange={handleGoodsIssuanceFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Item</label>
                  <input
                    type="text"
                    name="item"
                    className="w-full border rounded px-3 py-2"
                    value={goodsIssuanceForm.item}
                    onChange={handleGoodsIssuanceFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Issued</label>
                  <input
                    type="number"
                    name="issued"
                    className="w-full border rounded px-3 py-2"
                    value={goodsIssuanceForm.issued}
                    onChange={handleGoodsIssuanceFormChange}
                    min={1}
                  />
                </div>
                {goodsIssuanceFormError && <div className="text-red-600 mb-2">{goodsIssuanceFormError}</div>}
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowGoodsIssuanceModal(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDailyUsageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowDailyUsageModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowDailyUsageModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Track Daily Usage</h2>
              <form onSubmit={handleDailyUsageFormSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Item</label>
                  <input
                    type="text"
                    name="item"
                    className="w-full border rounded px-3 py-2"
                    value={dailyUsageForm.item}
                    onChange={handleDailyUsageFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Expected Usage</label>
                  <input
                    type="text"
                    name="expected"
                    className="w-full border rounded px-3 py-2"
                    value={dailyUsageForm.expected}
                    onChange={handleDailyUsageFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Difference</label>
                  <input
                    type="text"
                    name="diff"
                    className="w-full border rounded px-3 py-2"
                    value={dailyUsageForm.diff}
                    onChange={handleDailyUsageFormChange}
                  />
                </div>
                {dailyUsageFormError && <div className="text-red-600 mb-2">{dailyUsageFormError}</div>}
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDailyUsageModal(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div style={{ height: '80px' }} aria-hidden="true"></div>
        {/* Move the recipe modal here, inside <main> */}
        {showRecipeModal && editingRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowRecipeModal(false); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={handleRecipeModalClose}>&times;</button>
              <h2 className="text-2xl font-bold mb-4">{editingRecipe.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-blue-800 mb-1">Recipe Name</label>
                  <input className="w-full border rounded px-3 py-2" value={editingRecipe.name} onChange={e => editingRecipe && setEditingRecipe({ ...editingRecipe, name: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold text-blue-800 mb-1">Portion Size</label>
                  <input className="w-full border rounded px-3 py-2" value={editingRecipe.portionSize} onChange={e => editingRecipe && setEditingRecipe({ ...editingRecipe, portionSize: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold text-blue-800 mb-1">Ingredients</label>
                  {editingRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input className="flex-1 border rounded px-2 py-1" placeholder="Name" value={ing.name} onChange={e => {
                        if (!editingRecipe) return;
                        const newIngs = [...editingRecipe.ingredients];
                        newIngs[idx].name = e.target.value;
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                      }} />
                      <input className="w-20 border rounded px-2 py-1" placeholder="Qty" value={ing.quantity} onChange={e => {
                        if (!editingRecipe) return;
                        const newIngs = [...editingRecipe.ingredients];
                        newIngs[idx].quantity = e.target.value;
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                      }} />
                      <input className="w-20 border rounded px-2 py-1" placeholder="Unit" value={ing.unit} onChange={e => {
                        if (!editingRecipe) return;
                        const newIngs = [...editingRecipe.ingredients];
                        newIngs[idx].unit = e.target.value;
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                      }} />
                      <button className="text-red-500 px-2" onClick={e => {
                        e.preventDefault();
                        if (!editingRecipe) return;
                        const newIngs = editingRecipe.ingredients.filter((_, i) => i !== idx);
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngs.length ? newIngs : [{ name: '', quantity: '', unit: '' }] });
                      }}>✕</button>
                    </div>
                  ))}
                  <button className="mt-1 px-2 py-1 bg-blue-200 text-blue-800 rounded" onClick={e => {
                    e.preventDefault();
                    if (!editingRecipe) return;
                    setEditingRecipe({ ...editingRecipe, ingredients: [...editingRecipe.ingredients, { name: '', quantity: '', unit: '' }] });
                  }}>+ Add Ingredient</button>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={e => { e.preventDefault(); handleRecipeModalClose(); }}>Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={e => { e.preventDefault(); handleRecipeModalSave(); }}>{editingRecipe.id ? 'Save' : 'Add'}</button>
              </div>
            </div>
          </div>
        )}
        {/* Alert Details Modal */}
        {alertModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setAlertModal(null); }}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setAlertModal(null)}>&times;</button>
              {alertModal === 'lowStock' && (
                <>
                  <h2 className="text-xl font-bold mb-4 text-blue-900">Low Stock Alerts</h2>
                  {lowStockItems.length === 0 ? (
                    <div className="text-gray-500">No low stock items.</div>
                  ) : (
                    <ul className="divide-y">
                      {lowStockItems.map(item => (
                        <li key={item.item} className="py-2 flex justify-between">
                          <span>{item.item}</span>
                          <span className="text-red-600 font-semibold">{item.stock}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              {alertModal === 'issued' && (
                <>
                  <h2 className="text-xl font-bold mb-4 text-blue-900">Daily Issued Items</h2>
                  {todaysIssued.length === 0 ? (
                    <div className="text-gray-500">No items issued today.</div>
                  ) : (
                    <ul className="divide-y">
                      {todaysIssued.map((g, idx) => (
                        <li key={idx} className="py-2 flex justify-between">
                          <span>{g.item}</span>
                          <span className="text-blue-800 font-semibold">{g.issued}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              {alertModal === 'waste' && (
                <>
                  <h2 className="text-xl font-bold mb-4 text-blue-900">Waste Notifications</h2>
                  {wasteLog.length === 0 ? (
                    <div className="text-gray-500">No waste events logged.</div>
                  ) : (
                    <ul className="divide-y">
                      {wasteLog.slice(-10).reverse().map((w, idx) => (
                        <li key={idx} className="py-2">
                          <div className="flex justify-between">
                            <span>{w.item}</span>
                            <span className="text-red-600 font-semibold">{w.quantity} {w.unit}</span>
                          </div>
                          <div className="text-xs text-gray-500">{w.date} &middot; {w.reason}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;










