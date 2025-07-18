import React, { useState } from 'react';

interface OrderNotification {
  id: string;
  orderId: string;
  recipeName: string;
  quantity: number;
  orderedBy: string;
  timestamp: Date;
  status: 'new' | 'acknowledged' | 'completed';
}

interface NotificationBellProps {
  notifications: OrderNotification[];
  onAcknowledge: (notificationId: string) => void;
  onComplete: (notificationId: string) => void;
  currentUserRole: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onAcknowledge,
  onComplete,
  currentUserRole
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Only show for Warehouse Manager and Stores Manager roles
  if (!['Warehouse Manager', 'Stores Manager'].includes(currentUserRole)) {
    return null;
  }

  const newNotifications = notifications.filter(n => n.status === 'new');
  const pendingNotifications = notifications.filter(n => n.status === 'acknowledged');

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        
        {/* Notification Badge */}
        {newNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {newNotifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Kitchen/Bar Orders</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="divide-y">
                {/* New Notifications */}
                {newNotifications.map(notification => (
                  <div key={notification.id} className="p-4 bg-blue-50 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900">New Order: {notification.recipeName}</h4>
                        <p className="text-sm text-blue-700">
                          Quantity: {notification.quantity} | Ordered by: {notification.orderedBy}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onAcknowledge(notification.id)}
                        className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                ))}

                {/* Acknowledged Notifications */}
                {pendingNotifications.map(notification => (
                  <div key={notification.id} className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-yellow-900">Pending: {notification.recipeName}</h4>
                        <p className="text-sm text-yellow-700">
                          Quantity: {notification.quantity} | Ordered by: {notification.orderedBy}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onComplete(notification.id)}
                        className="ml-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Completed Notifications (show last 5) */}
                {notifications
                  .filter(n => n.status === 'completed')
                  .slice(-5)
                  .map(notification => (
                    <div key={notification.id} className="p-4 bg-gray-50 border-l-4 border-gray-400">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700">Completed: {notification.recipeName}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {notification.quantity} | Ordered by: {notification.orderedBy}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 