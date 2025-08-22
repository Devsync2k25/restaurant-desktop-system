import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest, handleApiResponse, handleApiError } from '../utils/api';

interface Role {
  role_id: number;
  role_name: string;
  access_level: number;
}

interface User {
  employee_id: number;
  first_name: string;
  Last_name: string;
  phone: string;
  email: string;
  status: string;
  role_name: string;
  access_level: number;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    Last_name: '',
    phone: '',
    email: '',
    role_name: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        apiRequest(API_ENDPOINTS.USERS),
        apiRequest(API_ENDPOINTS.ROLES)
      ]);

      const [usersData, rolesData] = await Promise.all([
        handleApiResponse<User[]>(usersRes),
        handleApiResponse<Role[]>(rolesRes)
      ]);

      setUsers(usersData);
      setRoles(rolesData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await apiRequest(API_ENDPOINTS.USERS, {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`User added successfully! Username: ${result.username}`);
        setShowAddForm(false);
        resetForm();
        fetchData(); // Refresh the user list
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert('Failed to add user. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      Last_name: '',
      phone: '',
      email: '',
      role_name: '',
      username: '',
      password: ''
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add New User
          </button>
        </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Add New User</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
      </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                value={formData.Last_name}
                onChange={(e) => setFormData({...formData, Last_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                value={formData.role_name}
                onChange={(e) => setFormData({...formData, role_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                  ))}
                </select>
              </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Add User
              </button>
                <button 
                  type="button" 
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Current Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-blue-700 text-base font-bold pb-2">Name</th>
                <th className="text-left text-blue-700 text-base font-bold pb-2">Email</th>
                <th className="text-left text-blue-700 text-base font-bold pb-2">Phone</th>
                <th className="text-left text-blue-700 text-base font-bold pb-2">Role</th>
                <th className="text-left text-blue-700 text-base font-bold pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.employee_id} className="border-t border-gray-100">
                  <td className="py-2 text-black font-medium">
                    {user.first_name} {user.Last_name}
                  </td>
                  <td className="py-2 text-black">{user.email}</td>
                  <td className="py-2 text-black">{user.phone}</td>
                  <td className="py-2 text-black">{user.role_name}</td>
                  <td className="py-2 text-black">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage; 