const UserManagementPage = ({
  ROLES,
  currentUser,
  users,
  showUserModal,
  setShowUserModal,
  editingUser,
  userForm,
  userFormError,
  handleAddUser,
  handleEditUser,
  handleDeleteUser,
  handleUserFormChange,
  handleUserFormSubmit
}: any) => {
  
  // Director and Manager can manage users (with different permissions)
  const canManageUsers = currentUser?.role === ROLES.DIRECTOR || currentUser?.role === ROLES.MANAGER;
  
  // Filter available roles based on current user's role
  const getAvailableRoles = () => {
    const allRoles = Object.values(ROLES);
    if (currentUser?.role === ROLES.DIRECTOR) {
      // Director can create any role
      return allRoles;
    } else if (currentUser?.role === ROLES.MANAGER) {
      // Manager can create any role except Director and Manager
      return allRoles.filter(role => role !== ROLES.DIRECTOR && role !== ROLES.MANAGER);
    }
    // Other roles cannot manage users
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">User Management</span>
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
      </h2>
      
      {canManageUsers ? (
        <div className="mb-6">
          <button 
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New User
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Only Directors and Managers can manage users. You are currently logged in as {currentUser?.role}.
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 font-semibold text-blue-900">Name</th>
              <th className="py-3 px-4 font-semibold text-blue-900">Username</th>
              <th className="py-3 px-4 font-semibold text-blue-900">Role</th>
              <th className="py-3 px-4 font-semibold text-blue-900">Status</th>
              {canManageUsers && (
                <th className="py-3 px-4 font-semibold text-blue-900">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === ROLES.DIRECTOR ? 'bg-purple-100 text-purple-800' :
                    user.role === ROLES.MANAGER ? 'bg-blue-100 text-blue-800' :
                    user.role === ROLES.MIS_OFFICER ? 'bg-green-100 text-green-800' :
                    user.role === ROLES.WAREHOUSE_MANAGER ? 'bg-orange-100 text-orange-800' :
                    user.role === ROLES.STORES_MANAGER ? 'bg-yellow-100 text-yellow-800' :
                    user.role === ROLES.INVENTORY_PERSONNEL ? 'bg-indigo-100 text-indigo-800' :
                    user.role === ROLES.KITCHEN_CHEF ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                {canManageUsers && (
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        disabled={
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.DIRECTOR) ||
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.MANAGER)
                        }
                        className={`text-sm ${
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.DIRECTOR) ||
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.MANAGER)
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.username)}
                        disabled={
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.DIRECTOR) ||
                          (currentUser?.role === ROLES.MANAGER && user.username === currentUser?.username)
                        }
                        className={`text-sm ${
                          (currentUser?.role === ROLES.MANAGER && user.role === ROLES.DIRECTOR) ||
                          (currentUser?.role === ROLES.MANAGER && user.username === currentUser?.username)
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-800'
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" 
              onClick={() => setShowUserModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleUserFormSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded px-3 py-2"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full border rounded px-3 py-2"
                  value={userForm.username}
                  onChange={handleUserFormChange}
                  required
                  disabled={!!editingUser}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full border rounded px-3 py-2"
                  value={userForm.password}
                  onChange={handleUserFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Role</label>
                <select
                  name="role"
                  className="w-full border rounded px-3 py-2"
                  value={userForm.role}
                  onChange={handleUserFormChange}
                  required
                >
                  <option value="">Select Role</option>
                  {getAvailableRoles().map((role: any) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              {userFormError && <div className="text-red-600 mb-2">{userFormError}</div>}
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-200 rounded" 
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingUser ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage; 