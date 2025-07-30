const ManagerPage = ({
  currentUser,
  inventoryItems,
  recipes,
  MOCK_USERS,
  lowStockItems,
  orderNotifications,
  restockRequests,
  handleRestockStatus,
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
        {restockRequests.filter((request: any) => request.status === 'requested').length > 0 && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded">
            <p className="text-sm text-yellow-800">
              ⚠️ {restockRequests.filter((request: any) => request.status === 'requested').length} pending restock requests
            </p>
          </div>
        )}
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

    {/* Restock Requests Section */}
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Restock Requests from Warehouse</h3>
      <p className="text-sm text-gray-600 mb-4">Review and approve requests for purchasing items</p>
      
      {/* Pending Requests */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Pending Requests</h4>
        {restockRequests.filter((request: any) => request.status === 'requested').length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No pending requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {restockRequests.filter((request: any) => request.status === 'requested').map((request: any) => (
              <div key={request.id} className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">{request.item}</p>
                  <p className="text-sm text-yellow-700">Requested: {request.date} | By: {request.requestedBy}</p>
                  <p className="text-sm text-yellow-700">Quantity: {request.quantity}</p>
                  {request.urgency && (
                    <p className={`text-sm ${request.urgency === 'finished' ? 'text-red-700 font-medium' : 'text-yellow-700'}`}>
                      Urgency: {request.urgency === 'low_stock' ? 'Low Stock' : 'Finished (Out of Stock)'}
                    </p>
                  )}
                  {request.notes && (
                    <p className="text-sm text-yellow-600 italic">"{request.notes}"</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestockStatus(request.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Approve for Purchase
                  </button>
                  <button
                    onClick={() => handleRestockStatus(request.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Requests */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Approved for Purchase</h4>
        {restockRequests.filter((request: any) => request.status === 'approved').length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No approved requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {restockRequests.filter((request: any) => request.status === 'approved').map((request: any) => (
              <div key={request.id} className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">{request.item}</p>
                  <p className="text-sm text-green-700">Approved: {request.date} | By: {request.requestedBy}</p>
                  <p className="text-sm text-green-700">Ready for market purchase</p>
                </div>
                <span className="px-3 py-1 bg-green-600 text-white rounded text-sm">Purchase at Market</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejected Requests */}
      <div>
        <h4 className="font-medium text-gray-800 mb-3">Rejected Requests</h4>
        {restockRequests.filter((request: any) => request.status === 'rejected').length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No rejected requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {restockRequests.filter((request: any) => request.status === 'rejected').map((request: any) => (
              <div key={request.id} className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">{request.item}</p>
                  <p className="text-sm text-red-700">Rejected: {request.date} | By: {request.requestedBy}</p>
                  <p className="text-sm text-red-700">Request denied</p>
                </div>
                <span className="px-3 py-1 bg-red-600 text-white rounded text-sm">Rejected</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ManagerPage; 