const WarehouseManagerPage = ({
  currentUser,
  inventoryItems,
  lowStockItems,
  goodsIssuance,
  setActivePage,
  restockRequests,
  handleRequestRestock
}: any) => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-blue-900">Welcome, {currentUser.name}</h1>
      <div className="text-sm text-gray-600">Role: {currentUser.role}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Warehouse Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{inventoryItems.length}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
          <div className="text-sm text-gray-600">Low Stock Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{goodsIssuance.length}</div>
          <div className="text-sm text-gray-600">Issuance Records</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setActivePage('Inventory')}
          className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
        >
          <div className="font-semibold text-blue-900">Add Items to Warehouse</div>
          <div className="text-sm text-gray-600">Add new inventory items</div>
        </button>
        <button 
          onClick={() => setActivePage('Analytics')}
          className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
        >
          <div className="font-semibold text-green-900">View Analytics</div>
          <div className="text-sm text-gray-600">Monitor warehouse performance</div>
        </button>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Low Stock Items</h4>
        {lowStockItems.length === 0 ? (
          <div className="text-gray-500">No low stock items.</div>
        ) : (
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-2 px-3 text-left">Item</th>
                <th className="py-2 px-3 text-left">Stock</th>
                <th className="py-2 px-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item: any) => (
                <tr key={item.item} className="border-t">
                  <td className="py-2 px-3">{item.item}</td>
                  <td className="py-2 px-3">{item.stock}</td>
                  <td className="py-2 px-3">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                      onClick={() => handleRequestRestock(item)}
                      disabled={restockRequests.some((r: any) => r.item === item.item && r.status === 'requested')}
                    >
                      {restockRequests.some((r: any) => r.item === item.item && r.status === 'requested') ? 'Requested' : 'Request Restock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-8">
        <h4 className="font-semibold text-gray-800 mb-2">My Restock Requests</h4>
        {restockRequests.length === 0 ? (
          <div className="text-gray-500">No restock requests yet.</div>
        ) : (
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-2 px-3 text-left">Item</th>
                <th className="py-2 px-3 text-left">Quantity</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {restockRequests.filter((r: any) => r.requestedBy === currentUser.name).map((r: any) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 px-3">{r.item}</td>
                  <td className="py-2 px-3">{r.quantity}</td>
                  <td className="py-2 px-3">{r.date}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded text-xs ${r.status === 'requested' ? 'bg-yellow-100 text-yellow-800' : r.status === 'purchased' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
);

export default WarehouseManagerPage; 