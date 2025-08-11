import React from 'react';
import AlertCard from '../components/AlertCard';
import { alertIcons } from '../components/AlertIcons';

const DirectorPage = ({
  currentUser,
  ROLES,
  users,
  lowStockItems,
  todaysIssued,
  wasteLog,
  setAlertModal
}: any) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome, {currentUser.name}!</h1>
        <p className="text-xl opacity-90">You have full system access as the Director.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">Total Users</div>
          <span className="font-semibold">{users ? users.length : 0}</span>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">Low Stock Items</div>
          <span className="font-semibold">{lowStockItems ? lowStockItems.length : 0}</span>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">Today's Issued</div>
          <span className="font-semibold">{todaysIssued ? todaysIssued.length : 0}</span>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">Waste Items</div>
          <span className="font-semibold">{wasteLog ? wasteLog.length : 0}</span>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => setAlertModal('lowStock')} className="cursor-pointer">
          <AlertCard title="Low Stock Alerts" count={lowStockItems ? lowStockItems.length : 0} />
        </div>
        <div onClick={() => setAlertModal('issued')} className="cursor-pointer">
          <AlertCard title="Daily Issued Items" count={todaysIssued ? todaysIssued.length : 0} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer" onClick={() => setAlertModal('waste')}>
          {alertIcons.trash}
          <div>
            <div className="font-semibold text-gray-700">Waste Notifications</div>
            <div className="text-sm text-gray-500">{wasteLog ? wasteLog.length : 0} items</div>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">User Management</h3>
            <p className="text-gray-600 mb-4">As Director, you have full access to manage all users in the system.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">Total Active Users: {users ? users.length : 0}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">System Monitoring</h3>
            <p className="text-gray-600 mb-4">Monitor inventory levels, waste tracking, and daily operations.</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium">System Status: Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorPage;