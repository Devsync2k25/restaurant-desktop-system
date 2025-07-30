
import React, { useState } from 'react';
import AlertCard from '../components/AlertCard';
import InventoryTable from '../components/InventoryTable';
import MenuTable from '../components/MenuTable';
import GoodsIssuanceTable from '../components/GoodsIssuanceTable';
import DailyUsageTable from '../components/DailyUsageTable';

const InventoryPage = ({
  currentUser,
  ROLES,
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
}: any) => {
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockForm, setRestockForm] = useState({
    item: '',
    quantity: '',
    urgency: 'low_stock',
    notes: ''
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Inventory</h1>
        <button className="md:hidden p-2 rounded bg-blue-100 text-blue-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      
      {/* Role-based content */}
      {currentUser.role === ROLES.DIRECTOR && (
        <>
          {/* Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div onClick={() => setAlertModal('lowStock')} className="cursor-pointer">
              <AlertCard title="Low Stock Alerts" count={lowStockItems.length} />
            </div>
            <div onClick={() => setAlertModal('issued')} className="cursor-pointer">
              <AlertCard title="Daily Issued Items" count={todaysIssued.length} />
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer" onClick={() => setAlertModal('waste')}>
              {alertIcons.trash}
              <div>
                <div className="font-semibold text-gray-700">Waste Notifications</div>
                <div className="text-sm text-gray-500">{wasteLog.length} items</div>
              </div>
            </div>
          </div>
          {/* View-only access for Director */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Inventory Management (View Only)</h2>
              </div>
              <InventoryTable inventoryItems={inventoryItems} onEdit={() => {}} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Recipes (View Only)</h2>
              </div>
              <MenuTable recipes={recipes} onEdit={() => {}} />
            </div>
          </div>
          {/* Goods Issuance & Daily Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance (View Only)</h2>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Daily Usage (View Only)</h2>
              </div>
              <DailyUsageTable dailyUsage={dailyUsage} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.MANAGER && (
        <>
          {/* Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div onClick={() => setAlertModal('lowStock')} className="cursor-pointer">
              <AlertCard title="Low Stock Alerts" count={lowStockItems.length} />
            </div>
            <div onClick={() => setAlertModal('issued')} className="cursor-pointer">
              <AlertCard title="Daily Issued Items" count={todaysIssued.length} />
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer" onClick={() => setAlertModal('waste')}>
              {alertIcons.trash}
              <div>
                <div className="font-semibold text-gray-700">Waste Notifications</div>
                <div className="text-sm text-gray-500">{wasteLog.length} items</div>
              </div>
            </div>
          </div>
          {/* Full access for Manager (same as Director) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Inventory Management</h2>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleIssueGoods}>Issue Goods</button>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddInventory}>Add Item</button>
                </div>
              </div>
              <InventoryTable inventoryItems={inventoryItems} onEdit={handleEditInventory} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Recipes</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddRecipe}>Add Item</button>
              </div>
              <MenuTable recipes={recipes} onEdit={handleEditRecipe} />
            </div>
          </div>
          {/* Goods Issuance & Daily Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddGoodsIssuance}>Add Log</button>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Daily Usage</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddDailyUsage}>Track Usage</button>
              </div>
              <DailyUsageTable dailyUsage={dailyUsage} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.WAREHOUSE_MANAGER && (
        <>
          {/* Warehouse Manager - Focus on inventory and reconciliation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
              {lowStockItems.length > 0 && (
                <button
                  onClick={() => {
                    setShowRestockModal(true);
                    setRestockForm({ item: '', quantity: '', urgency: 'low_stock', notes: '' });
                  }}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Request Restock
                </button>
              )}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Today's Issuance</h3>
              <div className="text-2xl font-bold text-green-600">{todaysIssued.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Inventory Management</h2>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleIssueGoods}>Issue Goods</button>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddInventory}>Add Item</button>
                </div>
              </div>
              <InventoryTable inventoryItems={inventoryItems} onEdit={handleEditInventory} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddGoodsIssuance}>Add Log</button>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.STORES_MANAGER && (
        <>
          {/* Stores Manager - Focus on inventory and daily usage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Daily Usage Records</h3>
              <div className="text-2xl font-bold text-green-600">{dailyUsage.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Inventory Management</h2>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleIssueGoods}>Issue Goods</button>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddInventory}>Add Item</button>
                </div>
              </div>
              <InventoryTable inventoryItems={inventoryItems} onEdit={handleEditInventory} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Daily Usage</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddDailyUsage}>Track Usage</button>
              </div>
              <DailyUsageTable dailyUsage={dailyUsage} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.INVENTORY_PERSONNEL && (
        <>
          {/* Inventory Personnel - Focus on adding/editing inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock Alerts</h3>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-blue-800">Inventory Management</h2>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddInventory}>Add Item</button>
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
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddRecipe}>Add Item</button>
              </div>
              <MenuTable recipes={recipes} onEdit={handleEditRecipe} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleIssueGoods}>Issue Goods</button>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.BARTENDER && (
        <>
          {/* Bartender - Focus on recipes and waste */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Available Recipes</h3>
              <div className="text-2xl font-bold text-blue-600">{recipes.filter((r: any) => r.name.toLowerCase().includes('vodka') || r.name.toLowerCase().includes('drink')).length}</div>
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
                <h2 className="text-2xl font-bold text-blue-800">Bar Recipes</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleAddRecipe}>Add Item</button>
              </div>
              <MenuTable recipes={recipes.filter((r: any) => r.name.toLowerCase().includes('vodka') || r.name.toLowerCase().includes('drink'))} onEdit={handleEditRecipe} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Goods Issuance</h2>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={handleIssueGoods}>Issue Goods</button>
              </div>
              <GoodsIssuanceTable goodsIssuance={goodsIssuance} />
            </div>
          </div>
        </>
      )}

      {currentUser.role === ROLES.MIS_OFFICER && (
        <>
          {/* MIS Officer - Read-only access to all data */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Active Recipes</h3>
              <div className="text-2xl font-bold text-green-600">{recipes.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Waste Events</h3>
              <div className="text-2xl font-bold text-orange-600">{wasteLog.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Issuance Records</h3>
              <div className="text-2xl font-bold text-purple-600">{goodsIssuance.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Inventory Overview</h2>
              </div>
              <InventoryTable inventoryItems={inventoryItems} onEdit={() => {}} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-800">Recipes Overview</h2>
              </div>
              <MenuTable recipes={recipes} onEdit={() => {}} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      {/* Restock Request Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowRestockModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-blue-900 mb-4">Request Restock</h2>
            
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter item name"
                value={restockForm.item}
                onChange={(e) => setRestockForm({ ...restockForm, item: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Requested Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter quantity to request"
                value={restockForm.quantity}
                onChange={(e) => setRestockForm({ ...restockForm, quantity: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Urgency</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="low_stock"
                    checked={restockForm.urgency === 'low_stock'}
                    onChange={(e) => setRestockForm({ ...restockForm, urgency: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm">Low Stock</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="finished"
                    checked={restockForm.urgency === 'finished'}
                    onChange={(e) => setRestockForm({ ...restockForm, urgency: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-red-600 font-medium">Finished (Out of Stock)</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                className="w-full border rounded px-3 py-2 h-20 resize-none"
                placeholder="Add any additional notes for the manager..."
                value={restockForm.notes}
                onChange={(e) => setRestockForm({ ...restockForm, notes: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowRestockModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  if (restockForm.item && restockForm.quantity && parseInt(restockForm.quantity) > 0) {
                    handleRequestRestock({
                      item: restockForm.item,
                      stock: '0',
                      unit: '',
                      requestedQuantity: parseInt(restockForm.quantity),
                      urgency: restockForm.urgency,
                      notes: restockForm.notes
                    });
                    setShowRestockModal(false);
                  }
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryPage; 