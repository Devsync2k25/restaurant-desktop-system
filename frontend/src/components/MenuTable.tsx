const MenuTable = ({ recipes, onEdit }: { recipes: any[]; onEdit: (recipe: any) => void }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Menu Item</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Output</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((item) => (
          <tr key={item.id} className="border-t border-gray-100">
            <td className="py-2 text-black font-medium flex items-center">
              {item.name}
            </td>
            <td className="py-2 text-black">{item.portionSize}</td>
            <td className="py-2">
              <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-md font-semibold hover:bg-blue-200 transition" onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MenuTable; 