const KitchenChefPage = ({
  currentUser,
  recipes,
  setActivePage
}: any) => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-blue-900">Welcome, {currentUser.name}</h1>
      <div className="text-sm text-gray-600">Role: {currentUser.role}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Kitchen Operations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Available Recipes</h4>
          <div className="space-y-2">
            {recipes.slice(0, 5).map((recipe: any) => (
              <div key={recipe.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{recipe.name}</span>
                <span className="text-sm text-gray-600">{recipe.portionSize}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
          <div className="space-y-2">
            <button 
              onClick={() => setActivePage('Issue Goods')}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
            >
              Order from Stores
            </button>
            <button 
              onClick={() => setActivePage('Waste')}
              className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded transition"
            >
              Log Waste
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default KitchenChefPage; 