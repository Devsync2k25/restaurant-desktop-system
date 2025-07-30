import React, { useState } from 'react';

const WarehouseManagerPage = ({
  currentUser,
  inventoryItems,
  lowStockItems,
  goodsIssuance,
  setActivePage,
  restockRequests,
  handleRequestRestock,
  orderNotifications,
  handleApproveOrder,
  handleCompleteOrder
}: any) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [restockForm, setRestockForm] = useState({
    item: '',
    quantity: '',
    urgency: 'low_stock', // 'low_stock' or 'finished'
    notes: ''
  });
  
  // Calculate metrics
  const newOrders = orderNotifications.filter((order: any) => order.status === 'new').length;
  const pendingOrders = orderNotifications.filter((order: any) => order.status === 'acknowledged').length;
  const completedOrders = orderNotifications.filter((order: any) => order.status === 'completed').length;
  const totalToday = orderNotifications.filter((order: any) => {
    const today = new Date().toISOString().slice(0, 10);
    return order.timestamp.toISOString().slice(0, 10) === today;
  }).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Warehouse Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, {currentUser.name} Warehouse Manager</span>
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {orderNotifications.filter((order: any) => order.status === 'new').length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {orderNotifications.filter((order: any) => order.status === 'new').length}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-[500px] bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Kitchen/Bar Orders</h3>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto">
                  {orderNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    <div className="divide-y">
                      {/* New Notifications */}
                      {orderNotifications.filter((order: any) => order.status === 'new').map((order: any) => (
                        <div key={order.id} className="p-6 bg-blue-50 border-l-4 border-blue-500">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <h4 className="font-semibold text-blue-900 text-lg mb-2">New Order: {order.recipeName}</h4>
                              <div className="space-y-1">
                                <p className="text-sm text-blue-700">
                                  <span className="font-medium">Quantity:</span> {order.quantity}
                                </p>
                                <p className="text-sm text-blue-700">
                                  <span className="font-medium">Ordered by:</span> {order.orderedBy}
                                </p>
                                <p className="text-xs text-blue-600">
                                  <span className="font-medium">Time:</span> {order.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}

                      {/* Acknowledged Notifications */}
                      {orderNotifications.filter((order: any) => order.status === 'acknowledged').map((order: any) => (
                        <div key={order.id} className="p-6 bg-yellow-50 border-l-4 border-yellow-500">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <h4 className="font-semibold text-yellow-900 text-lg mb-2">Pending: {order.recipeName}</h4>
                              <div className="space-y-1">
                                <p className="text-sm text-yellow-700">
                                  <span className="font-medium">Quantity:</span> {order.quantity}
                                </p>
                                <p className="text-sm text-yellow-700">
                                  <span className="font-medium">Ordered by:</span> {order.orderedBy}
                                </p>
                                <p className="text-xs text-yellow-600">
                                  <span className="font-medium">Time:</span> {order.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}


                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Orders</p>
              <p className="text-2xl font-bold text-gray-900">{newOrders}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Today</p>
              <p className="text-2xl font-bold text-gray-900">{totalToday}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* New Orders Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">New Orders</h3>
          <p className="text-sm text-gray-600 mb-4">Orders waiting to be acknowledged</p>
          {newOrders === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">No new orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderNotifications.filter((order: any) => order.status === 'new').map((order: any) => (
                <div key={order.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.recipeName}</p>
                      <p className="text-sm text-gray-600">Qty: {order.quantity} | By: {order.orderedBy}</p>
                    </div>
                    <button 
                      onClick={() => handleApproveOrder(order.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Orders Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">Pending Orders</h3>
          <p className="text-sm text-gray-600 mb-4">Orders being prepared</p>
          {pendingOrders === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500">No pending orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderNotifications.filter((order: any) => order.status === 'acknowledged').map((order: any) => (
                <div key={order.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.recipeName}</p>
                      <p className="text-sm text-gray-600">Qty: {order.quantity} | Approved by: {order.approvedBy}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Preparing</span>
                      <button 
                        onClick={() => handleCompleteOrder(order.id)}
                        className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Completed Orders Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Completed Orders</h3>
        {completedOrders === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No completed orders yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderNotifications.filter((order: any) => order.status === 'completed').slice(0, 5).map((order: any) => (
              <div key={order.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{order.recipeName}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
                        <p><span className="font-medium">Item Approved:</span> {order.recipeName}</p>
                        <p><span className="font-medium">Date:</span> {order.completedAt ? new Date(order.completedAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Time:</span> {order.completedAt ? new Date(order.completedAt).toLocaleTimeString() : 'N/A'}</p>
                        <p><span className="font-medium">Completed by:</span> {order.completedBy}</p>
                        <p><span className="font-medium">Qty:</span> {order.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Stock Requests</h3>
            <p className="text-sm text-gray-600">Request items for restocking</p>
          </div>
          <button
            onClick={() => {
              setSelectedItem(null);
              setRestockForm({ item: '', quantity: '', urgency: 'low_stock', notes: '' });
              setShowRestockModal(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Request Restock
          </button>
        </div>
        


        {/* Active Requests */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Active Requests</h4>
          {restockRequests.filter((request: any) => request.status === 'requested').length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">No active requests</p>
            </div>
          ) : (
            <div className="space-y-2">
              {restockRequests.filter((request: any) => request.status === 'requested').map((request: any) => (
                <div key={request.id} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">{request.item}</p>
                    <p className="text-sm text-blue-700">Requested: {request.date} | By: {request.requestedBy}</p>
                    {request.urgency && (
                      <p className="text-xs text-blue-600">
                        Urgency: {request.urgency === 'low_stock' ? 'Low Stock' : 'Finished'}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Pending Manager Approval</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Requests */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">Approved Requests</h4>
          {restockRequests.filter((request: any) => request.status === 'approved').length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">No approved requests</p>
            </div>
          ) : (
            <div className="space-y-2">
              {restockRequests.filter((request: any) => request.status === 'approved').map((request: any) => (
                <div key={request.id} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">{request.item}</p>
                    <p className="text-sm text-green-700">Approved: {request.date} | By: {request.requestedBy}</p>
                    {request.urgency && (
                      <p className="text-xs text-green-600">
                        Urgency: {request.urgency === 'low_stock' ? 'Low Stock' : 'Finished'}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white rounded text-sm">Manager Will Purchase</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default WarehouseManagerPage; 