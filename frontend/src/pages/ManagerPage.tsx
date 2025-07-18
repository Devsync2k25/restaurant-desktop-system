const ManagerPage = ({
  currentUser,
  inventoryItems,
  recipes,
  MOCK_USERS,
  lowStockItems,
  orderNotifications,
  setActivePage
}: any) => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-blue-900">Welcome, {currentUser.name}</h1>
      <div className="text-sm text-gray-600">Role: {currentUser.role}</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Operations Overview</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Inventory Items:</span>
            <span className="font-semibold">{inventoryItems.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Active Recipes:</span>
            <span className="font-semibold">{recipes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Active Users:</span>
            <span className="font-semibold">{MOCK_USERS.length}</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Order Statistics</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Orders:</span>
            <span className="font-semibold text-blue-600">{orderNotifications.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Approvals:</span>
            <span className="font-semibold text-yellow-600">{orderNotifications.filter((n: any) => n.status === 'new').length}</span>
          </div>
          <div className="flex justify-between">
            <span>Completed Orders:</span>
            <span className="font-semibold text-green-600">{orderNotifications.filter((n: any) => n.status === 'completed').length}</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Low Stock Alerts</h3>
        <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
        <p className="text-sm text-gray-600">Items need restocking</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setActivePage('User Management')}
            className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
          >
            Manage Users
          </button>
          <button 
            onClick={() => setActivePage('Reports')}
            className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded transition"
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ManagerPage; 