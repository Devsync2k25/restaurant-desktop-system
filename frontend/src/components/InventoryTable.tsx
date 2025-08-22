import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest, handleApiResponse, handleApiError } from '../utils/api';

interface InventoryItem {
  product_ID: number;
  Product_name: string;
  Unit: string;
  cost_price: number;
  current_stock: number;
  reorder_level: number;
}

const InventoryTable = ({ inventoryItems, onEdit }: { inventoryItems: any[]; onEdit: (item: any) => void }) => {
  const [realInventory, setRealInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false); // Start with false since we have no data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call for now and show empty state directly
    setLoading(false);
    setRealInventory([]);
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      console.log('Fetching inventory from:', API_ENDPOINTS.INVENTORY);
      const response = await apiRequest(API_ENDPOINTS.INVENTORY);
      console.log('Inventory response:', response);
      const data = await handleApiResponse<InventoryItem[]>(response);
      console.log('Inventory data:', data);
      setRealInventory(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
      setRealInventory([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Use real data if available, otherwise fall back to passed props
  const displayItems = realInventory.length > 0 ? realInventory : inventoryItems;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading inventory...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">Error loading inventory</div>
          <div className="text-gray-400 text-sm mb-4">{error}</div>
          <button 
            onClick={fetchInventory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show message when no items
  if (displayItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">No inventory items found</div>
          <div className="text-gray-400 text-sm">Start by adding your first inventory item</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-blue-700 text-base font-bold pb-2">Item</th>
            <th className="text-left text-blue-700 text-base font-bold pb-2">Category</th>
            <th className="text-left text-blue-700 text-base font-bold pb-2">Unit</th>
            <th className="text-left text-blue-700 text-base font-bold pb-2">Current Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayItems.map((item) => (
            <tr key={item.product_ID || item.item} className="border-t border-gray-100">
              <td className="py-2 text-black font-medium">{item.Product_name || item.item}</td>
              <td className="py-2 text-black">{item.Unit || item.unit}</td>
              <td className="py-2 text-black">{item.Unit || item.unit}</td>
              <td className="py-2 text-black">{item.current_stock || item.stock}</td>
              <td className="py-2">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold hover:bg-blue-200 transition" onClick={() => onEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable; 