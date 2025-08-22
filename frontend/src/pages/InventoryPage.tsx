
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import AlertCard from '../components/AlertCard';
import InventoryTable from '../components/InventoryTable';
import MenuTable from '../components/MenuTable';
import GoodsIssuanceTable from '../components/GoodsIssuanceTable';
import DailyUsageTable from '../components/DailyUsageTable';
import Modal from '../components/Modal';

interface InventoryPageProps {
  currentUser: any;
  inventoryItems: any[];
  recipes: any[];
  wasteLog: any[];
  goodsIssuance: any[];
  dailyUsage: any[];
  lowStockItems: any[];
  todaysIssued: any[];
  alertIcons: any;
  setAlertModal: any;
  handleIssueGoods: any;
  handleAddInventory: any;
  handleEditInventory: any;
  handleAddRecipe: any;
  handleEditRecipe: any;
  handleAddGoodsIssuance: any;
  handleAddDailyUsage: any;
  restockRequests: any[];
  handleRequestRestock: any;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ 
  currentUser, 
  inventoryItems, 
  recipes, 
  wasteLog, 
  goodsIssuance, 
  dailyUsage, 
  lowStockItems, 
  todaysIssued, 
  alertIcons, 
  setAlertModal, 
  handleIssueGoods, 
  handleAddInventory, 
  handleEditInventory, 
  handleAddRecipe, 
  handleEditRecipe, 
  handleAddGoodsIssuance, 
  handleAddDailyUsage, 
  restockRequests, 
  handleRequestRestock 
}: InventoryPageProps) => {
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockRequest, setRestockRequest] = useState({
    item: '',
    quantity: '',
    priority: 'medium',
    notes: ''
  });

  // DEBUG: Log props received
  console.log('=== INVENTORY PAGE DEBUG ===');
  console.log('currentUser:', currentUser);
  console.log('inventoryItems:', inventoryItems);
  console.log('lowStockItems:', lowStockItems);
  console.log('===========================');

  // Remove local empty arrays - use props instead
  // const inventoryItems: any[] = [];
  // const recipes: any[] = [];
  // const goodsIssuance: any[] = [];
  // const dailyUsage: any[] = [];
  // const wasteLog: any[] = [];

  // const lowStockItems = inventoryItems.filter(item => item.stock <= item.minStock);
  // const todaysIssued = goodsIssuance.filter(item => item.date === '2024-01-15');

  const handleRestockRequest = () => {
    console.log('Restock request:', restockRequest);
    setShowRestockModal(false);
    setRestockRequest({ item: '', quantity: '', priority: 'medium', notes: '' });
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>
      
      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <AlertCard
          title="Low Stock Alert"
          count={lowStockItems.length}
        />
      )}

      {currentUser.role === ROLES.INVENTORY_PERSONNEL && (
        <>
          {/* Inventory Personnel - Full inventory management */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock Items</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Today's Issuance</h3>
              <div className="text-2xl font-bold text-green-600">{todaysIssued.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Waste Events</h3>
              <div className="text-2xl font-bold text-red-600">{wasteLog.length}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-blue-800">Inventory Management</h2>
              <div className="flex gap-2">
                <button 
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  onClick={handleAddInventory}
                >
                  Add Item
                </button>
              </div>
            </div>
            <InventoryTable inventoryItems={inventoryItems} onEdit={handleEditInventory} />
          </div>
        </>
      )}

      {currentUser.role === ROLES.KITCHEN_CHEF && (
        <>
          {/* Kitchen Chef - Focus on recipes and waste */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Available Recipes</h3>
              <div className="text-2xl font-bold text-blue-600">{recipes.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Waste Events</h3>
              <div className="text-2xl font-bold text-red-600">{wasteLog.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Today's Issuance</h3>
              <div className="text-2xl font-bold text-green-600">{todaysIssued.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Recipes</h2>
                <button 
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  onClick={handleAddRecipe}
                >
                  Add Item
                </button>
              </div>
              <MenuTable recipes={recipes} onEdit={handleEditRecipe} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Waste Log</h2>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {wasteLog.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵{item.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.STORES_MANAGER && (
        <>
          {/* Stores Manager - Focus on goods issuance and daily usage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Today's Issuance</h3>
              <div className="text-2xl font-bold text-green-600">{todaysIssued.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock Items</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </div>
          
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Inventory</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance</h2>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Daily Usage</h2>
              </div>
              <DailyUsageTable dailyUsage={dailyUsage} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.WAREHOUSE_MANAGER && (
        <>
          {/* Warehouse Manager - Focus on stock levels and restocking */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock Items</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Today's Issuance</h3>
              <div className="text-2xl font-bold text-green-600">{todaysIssued.length}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-blue-800">Inventory Overview</h2>
              <div className="flex gap-2">
                <button 
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => setShowRestockModal(true)}
                >
                  Request Restock
                </button>
              </div>
            </div>
            <InventoryTable inventoryItems={inventoryItems} onEdit={handleEditInventory} />
          </div>
        </>
      )}

      {/* Restock Request Modal */}
      <Modal
        isOpen={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        title="Request Restock"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <select
              value={restockRequest.item}
              onChange={(e) => setRestockRequest({...restockRequest, item: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an item</option>
              {lowStockItems.map(item => (
                <option key={item.id} value={item.item}>{item.item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Needed</label>
            <input
              type="number"
              value={restockRequest.quantity}
              onChange={(e) => setRestockRequest({...restockRequest, quantity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={restockRequest.priority}
              onChange={(e) => setRestockRequest({...restockRequest, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={restockRequest.notes}
              onChange={(e) => setRestockRequest({...restockRequest, notes: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowRestockModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleRestockRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryPage; 