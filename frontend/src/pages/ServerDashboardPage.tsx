import React from 'react';
import NotificationBell from '../components/NotificationBell';

interface OrderNotification {
  id: string;
  orderId: string;
  recipeName: string;
  quantity: number;
  orderedBy: string;
  timestamp: Date;
  status: 'new' | 'acknowledged' | 'completed';
}

interface OrderDashboardPageProps {
  currentUser: any;
  notifications: OrderNotification[];
  onAcknowledge: (notificationId: string) => void;
  onComplete: (notificationId: string) => void;
}

const OrderDashboardPage: React.FC<OrderDashboardPageProps> = ({
  currentUser,
  notifications,
  onAcknowledge,
  onComplete
}) => {
  const newOrders = notifications.filter(n => n.status === 'new');
  const pendingOrders = notifications.filter(n => n.status === 'acknowledged');
  const completedOrders = notifications.filter(n => n.status === 'completed');

  const getDashboardTitle = () => {
    switch (currentUser.role) {
      case 'Warehouse Manager':
        return 'Warehouse Dashboard';
      case 'Stores Manager':
        return 'Stores Dashboard';
      default:
        return 'Order Dashboard';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900">{getDashboardTitle()}</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Welcome, {currentUser.name}</div>
          <NotificationBell
            notifications={notifications}
            onAcknowledge={onAcknowledge}
            onComplete={onComplete}
            currentUserRole={currentUser.role}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{newOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{completedOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Today</p>
              <p className="text-2xl font-semibold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* New Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-blue-900">New Orders</h2>
            <p className="text-sm text-gray-600">Orders waiting to be acknowledged</p>
          </div>
          <div className="p-6">
            {newOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No new orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {newOrders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-blue-900">{order.recipeName}</h3>
                        <p className="text-sm text-blue-700">Quantity: {order.quantity}</p>
                        <p className="text-sm text-blue-600">Ordered by: {order.orderedBy}</p>
                        <p className="text-xs text-blue-500 mt-1">
                          {order.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onAcknowledge(order.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-yellow-900">Pending Orders</h2>
            <p className="text-sm text-gray-600">Orders being prepared</p>
          </div>
          <div className="p-6">
            {pendingOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No pending orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-yellow-900">{order.recipeName}</h3>
                        <p className="text-sm text-yellow-700">Quantity: {order.quantity}</p>
                        <p className="text-sm text-yellow-600">Ordered by: {order.orderedBy}</p>
                        <p className="text-xs text-yellow-500 mt-1">
                          {order.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onComplete(order.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Completed Orders */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Completed Orders</h2>
        </div>
        <div className="p-6">
          {completedOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No completed orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Recipe</th>
                    <th className="text-left py-2 px-4">Quantity</th>
                    <th className="text-left py-2 px-4">Ordered By</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.slice(-10).reverse().map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 font-medium">{order.recipeName}</td>
                      <td className="py-2 px-4">{order.quantity}</td>
                      <td className="py-2 px-4">{order.orderedBy}</td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {order.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDashboardPage; 