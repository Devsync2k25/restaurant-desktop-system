const InventoryTable = ({ inventoryItems, onEdit }: { inventoryItems: any[]; onEdit: (item: any) => void }) => (
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
        {inventoryItems.map((item) => (
          <tr key={item.item} className="border-t border-gray-100">
            <td className="py-2 text-black font-medium">{item.item}</td>
            <td className="py-2 text-black">{item.category}</td>
            <td className="py-2 text-black">{item.unit}</td>
            <td className="py-2 text-black">{item.stock}</td>
            <td className="py-2">
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold hover:bg-blue-200 transition" onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InventoryTable; 