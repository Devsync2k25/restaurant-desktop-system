import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest, handleApiResponse, handleApiError } from '../utils/api';

interface Recipe {
  menu_recipe_id: number;
  menu_item_id: number;
  product_id: number;
  quantity: number;
  menu_item_name: string;
  product_name: string;
  unit: string;
}

interface MenuItem {
  menu_item_id: number;
  name: string;
  price: number;
}

interface Product {
  product_ID: number;
  Product_name: string;
  Unit: string;
}

interface RecipesTableProps {
  userRole: string;
}

const RecipesTable: React.FC<RecipesTableProps> = ({ userRole }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formData, setFormData] = useState({
    menu_item_id: '',
    product_id: '',
    quantity: ''
  });

  const canEdit = ['Manager', 'Director', 'Kitchen Chef', 'MIS Officer'].includes(userRole);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recipesRes, menuItemsRes, productsRes] = await Promise.all([
        apiRequest(API_ENDPOINTS.RECIPES),
        apiRequest(API_ENDPOINTS.MENU_ITEMS),
        apiRequest(API_ENDPOINTS.INVENTORY)
      ]);

      const [recipesData, menuItemsData, productsData] = await Promise.all([
        handleApiResponse<Recipe[]>(recipesRes),
        handleApiResponse<MenuItem[]>(menuItemsRes),
        handleApiResponse<Product[]>(productsRes)
      ]);

      setRecipes(recipesData);
      setMenuItems(menuItemsData);
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        menu_item_id: parseInt(formData.menu_item_id),
        product_id: parseInt(formData.product_id),
        quantity: parseFloat(formData.quantity)
      };

      if (editingRecipe) {
        // Update existing recipe
        await apiRequest(`${API_ENDPOINTS.RECIPES}/${editingRecipe.menu_recipe_id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        // Add new recipe
        await apiRequest(API_ENDPOINTS.RECIPES, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      await fetchData();
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      menu_item_id: recipe.menu_item_id.toString(),
      product_id: recipe.product_id.toString(),
      quantity: recipe.quantity.toString()
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await apiRequest(`${API_ENDPOINTS.RECIPES}/${id}`, {
        method: 'DELETE'
      });
      await fetchData();
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const resetForm = () => {
    setFormData({
      menu_item_id: '',
      product_id: '',
      quantity: ''
    });
    setEditingRecipe(null);
  };

  const getMenuItemsByRecipe = (menuItemId: number) => {
    return recipes.filter(recipe => recipe.menu_item_id === menuItemId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recipe Management</h2>
        {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Recipe
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {menuItems.map((menuItem) => {
          const menuRecipes = getMenuItemsByRecipe(menuItem.menu_item_id);
          return (
            <div key={menuItem.menu_item_id} className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {menuItem.name}
                </h3>
                <p className="text-sm text-gray-600">Price: ${menuItem.price.toFixed(2)}</p>
              </div>
              
              {menuRecipes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ingredient
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit
                        </th>
                        {canEdit && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {menuRecipes.map((recipe) => (
                        <tr key={recipe.menu_recipe_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {recipe.product_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {recipe.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {recipe.unit}
                          </td>
                          {canEdit && (
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(recipe)}
                                  className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(recipe.menu_recipe_id)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
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
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No recipes defined for this menu item
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Item
                </label>
                <select
                  value={formData.menu_item_id}
                  onChange={(e) => setFormData({...formData, menu_item_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Menu Item</option>
                  {menuItems.map((item) => (
                    <option key={item.menu_item_id} value={item.menu_item_id}>
                      {item.name} - ${item.price}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredient
                </label>
                <select
                  value={formData.product_id}
                  onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Ingredient</option>
                  {products.map((product) => (
                    <option key={product.product_ID} value={product.product_ID}>
                      {product.Product_name} ({product.Unit})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {editingRecipe ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesTable;



