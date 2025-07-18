const MISOfficerPage = ({
  currentUser,
  inventoryItems,
  goodsIssuance,
  wasteLog,
  lowStockItems,
  setActivePage
}: any) => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-blue-900">Welcome, {currentUser.name}</h1>
      <div className="text-sm text-gray-600">Role: {currentUser.role}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Sales & Inventory Tracking</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{goodsIssuance.length}</div>
          <div className="text-sm text-gray-600">Issuance Records</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{wasteLog.length}</div>
          <div className="text-sm text-gray-600">Waste Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
          <div className="text-sm text-gray-600">Low Stock Items</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setActivePage('Reconcile')}
          className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
        >
          <div className="font-semibold text-blue-900">Daily Reconciliation</div>
          <div className="text-sm text-gray-600">Verify sales vs inventory</div>
        </button>
        <button 
          onClick={() => setActivePage('Reports')}
          className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
        >
          <div className="font-semibold text-green-900">Generate Reports</div>
          <div className="text-sm text-gray-600">Create reports for management</div>
        </button>
      </div>
    </div>
  </div>
);

export default MISOfficerPage; 