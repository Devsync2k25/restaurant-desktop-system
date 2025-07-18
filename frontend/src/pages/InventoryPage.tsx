
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
  handleAddDailyUsage
}: any) => {
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
    </>
  );
};

export default InventoryPage; 