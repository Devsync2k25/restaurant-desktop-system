

const IssueGoodsPage = ({
  currentUser,
  ROLES,
  issueRecipeId,
  setIssueRecipeId,
  issueQuantity,
  setIssueQuantity,
  recipes,
  selectedRecipe,
  requiredIngredients,
  inventoryMap,
  insufficient,
  handleIssueGoods,
  issueError,
  issueSuccess,
  customRecipeName,
  setCustomRecipeName,
  useCustomRecipe,
  setUseCustomRecipe
}: any) => {
  const isDirector = currentUser?.role === ROLES?.DIRECTOR;
  
  return (
    <div className="mx-auto bg-white rounded-2xl shadow-md p-8 w-full" style={{ maxWidth: '600px', minHeight: 'calc(100vh - 4rem)' }}>
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Issue Goods {isDirector && '(View Only)'}
      </h1>
      {isDirector ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-4">
            Directors can view but cannot issue goods. This function is restricted to operational staff.
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Available Recipes:</h3>
            <ul className="text-left space-y-1">
              {recipes.map((r: any) => (
                <li key={r.id} className="text-blue-800">• {r.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-blue-900 font-semibold mb-2">Recipe Selection</label>
            
            {/* Toggle between dropdown and custom input */}
            <div className="flex space-x-4 mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipeType"
                  checked={!useCustomRecipe}
                  onChange={() => {
                    setUseCustomRecipe(false);
                    setCustomRecipeName('');
                  }}
                  className="mr-2"
                />
                <span className="text-sm">Select from recipes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipeType"
                  checked={useCustomRecipe}
                  onChange={() => {
                    setUseCustomRecipe(true);
                    setIssueRecipeId('');
                  }}
                  className="mr-2"
                />
                <span className="text-sm">Custom recipe</span>
              </label>
            </div>

            {!useCustomRecipe ? (
              <select
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={issueRecipeId}
                onChange={e => setIssueRecipeId(e.target.value)}
              >
                <option value="">-- Select a recipe --</option>
                {recipes.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter custom recipe name..."
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={customRecipeName}
                onChange={e => setCustomRecipeName(e.target.value)}
              />
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-blue-900 font-semibold mb-2">Quantity to Issue</label>
            <input
              type="number"
              min={1}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={issueQuantity}
              onChange={e => setIssueQuantity(Number(e.target.value))}
            />
          </div>
          
          {selectedRecipe && !useCustomRecipe && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Required Ingredients</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-1 px-2">Ingredient</th>
                    <th className="py-1 px-2">Required</th>
                    <th className="py-1 px-2">In Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {requiredIngredients.map((ing: any) => {
                    const inv = inventoryMap.get(ing.name);
                    const invQty = inv ? parseFloat(inv.stock) : 0;
                    const isInsufficient = !inv || invQty < ing.total;
                    return (
                      <tr key={ing.name} className={isInsufficient ? 'bg-red-50' : ''}>
                        <td className="py-1 px-2">{ing.name}</td>
                        <td className="py-1 px-2">{ing.total} {ing.unit}</td>
                        <td className="py-1 px-2">{inv ? invQty : 0} {ing.unit}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {insufficient.length > 0 && (
                <div className="text-red-600 mt-2">Insufficient stock for: {insufficient.map((i: any) => i.name).join(', ')}</div>
              )}
            </div>
          )}
          
          {useCustomRecipe && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Custom Recipe Order:</strong> This will send a notification to warehouse and stores managers 
                for the custom recipe "{customRecipeName || '[Recipe Name]'}" with quantity {issueQuantity}.
              </p>
            </div>
          )}
          
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            onClick={handleIssueGoods}
            disabled={
              (!useCustomRecipe && !selectedRecipe) || 
              (useCustomRecipe && !customRecipeName.trim()) ||
              (!useCustomRecipe && insufficient.length > 0)
            }
          >
            {useCustomRecipe ? 'Send Order' : 'Issue'}
          </button>
          {issueError && <div className="text-red-600 mt-4">{issueError}</div>}
          {issueSuccess && <div className="text-green-600 mt-4">{issueSuccess}</div>}
        </>
      )}
    </div>
  );
};

export default IssueGoodsPage; 