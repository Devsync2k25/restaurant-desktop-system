

const RecipesPage = ({
  currentUser,
  ROLES,
  recipes,
  handleAddRecipe,
  handleEditRecipe,
  handleDeleteRecipe,
  showRecipeModal,
  editingRecipe,
  setEditingRecipe,
  handleRecipeModalClose,
  handleRecipeModalSave
}: any) => {
  const isDirector = currentUser?.role === ROLES?.DIRECTOR;
  
  return (
    <div className="mx-auto bg-white rounded-2xl shadow-md p-8 w-full" style={{ maxWidth: '900px', minHeight: 'calc(100vh - 4rem)' }}>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Recipes {isDirector && '(View Only)'}
      </h1>
      {!isDirector && (
        <button className="mb-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800" onClick={handleAddRecipe}>Add Recipe</button>
      )}
      <div className="space-y-6">
        {recipes.length === 0 && <div className="text-gray-500">No recipes yet.</div>}
        {recipes.map((recipe: any) => (
          <div key={recipe.id} className="border rounded-lg p-4 flex flex-col gap-2 bg-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-semibold text-blue-900">{recipe.name}</div>
                <div className="text-gray-700">Portion Size: {recipe.portionSize}</div>
              </div>
              {!isDirector && (
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleEditRecipe(recipe)}>Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="font-medium text-blue-800">Ingredients:</div>
              <ul className="list-disc ml-6">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <li key={i} className="text-gray-800">{ing.name} - {ing.quantity} {ing.unit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* Recipe Modal */}
      {showRecipeModal && editingRecipe && !isDirector && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) handleRecipeModalClose(); }}>
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={handleRecipeModalClose}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">{editingRecipe.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Recipe Name</label>
                <input className="w-full border rounded px-3 py-2" value={editingRecipe.name} onChange={e => editingRecipe && setEditingRecipe({ ...editingRecipe, name: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Portion Size</label>
                <input className="w-full border rounded px-3 py-2" value={editingRecipe.portionSize} onChange={e => editingRecipe && setEditingRecipe({ ...editingRecipe, portionSize: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Ingredients</label>
                {editingRecipe.ingredients.map((ing: any, idx: number) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input className="flex-1 border rounded px-2 py-1" placeholder="Name" value={ing.name} onChange={e => {
                      if (!editingRecipe) return;
                      const newIngs = [...editingRecipe.ingredients];
                      newIngs[idx].name = e.target.value;
                      setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                    }} />
                    <input className="w-20 border rounded px-2 py-1" placeholder="Qty" value={ing.quantity} onChange={e => {
                      if (!editingRecipe) return;
                      const newIngs = [...editingRecipe.ingredients];
                      newIngs[idx].quantity = e.target.value;
                      setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                    }} />
                    <input className="w-20 border rounded px-2 py-1" placeholder="Unit" value={ing.unit} onChange={e => {
                      if (!editingRecipe) return;
                      const newIngs = [...editingRecipe.ingredients];
                      newIngs[idx].unit = e.target.value;
                      setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                    }} />
                    <button className="text-red-500 px-2" onClick={e => {
                      e.preventDefault();
                      if (!editingRecipe) return;
                      const newIngs = editingRecipe.ingredients.filter((_: any, i: number) => i !== idx);
                      setEditingRecipe({ ...editingRecipe, ingredients: newIngs.length ? newIngs : [{ name: '', quantity: '', unit: '' }] });
                    }}>✕</button>
                  </div>
                ))}
                <button className="mt-1 px-2 py-1 bg-blue-200 text-blue-800 rounded" onClick={e => {
                  e.preventDefault();
                  if (!editingRecipe) return;
                  setEditingRecipe({ ...editingRecipe, ingredients: [...editingRecipe.ingredients, { name: '', quantity: '', unit: '' }] });
                }}>+ Add Ingredient</button>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={e => { e.preventDefault(); handleRecipeModalClose(); }}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={e => { e.preventDefault(); handleRecipeModalSave(); }}>{editingRecipe.id ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPage; 