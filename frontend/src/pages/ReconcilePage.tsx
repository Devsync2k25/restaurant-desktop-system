

const ReconcilePage = ({
  reconcileRows,
  reconcileSuccess,
  reconcileError,
  handleReconcileInput,
  handleReconcileNote,
  handleReconcileUpdate,
  handleReconcileReset
}: any) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-900 flex items-center">
          <span className="mr-2">Reconcile Inventory</span>
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M9 12l2 2l4 -4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </h2>
        <p className="text-blue-700 mb-4">Enter the actual physical count for each inventory item, compare with system stock, and update as needed. Add notes for discrepancies.</p>
        {reconcileSuccess && <div className="mb-2 text-green-700 font-semibold">{reconcileSuccess}</div>}
        {reconcileError && <div className="mb-2 text-red-700 font-semibold">{reconcileError}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="px-3 py-2 text-left">Item</th>
                <th className="px-3 py-2 text-left">System Stock</th>
                <th className="px-3 py-2 text-left">Physical Count</th>
                <th className="px-3 py-2 text-left">Discrepancy</th>
                <th className="px-3 py-2 text-left">Note</th>
                <th className="px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reconcileRows.map((row: any, idx: number) => (
                <tr key={row.item} className={row.updated ? 'bg-green-50' : ''}>
                  <td className="px-3 py-2 font-medium">{row.item}</td>
                  <td className="px-3 py-2">{row.systemStock}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="border border-blue-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={row.physicalCount}
                      min="0"
                      onChange={e => handleReconcileInput(idx, e.target.value)}
                    />
                  </td>
                  <td className={parseFloat(row.discrepancy) !== 0 ? 'px-3 py-2 text-red-600 font-semibold' : 'px-3 py-2'}>
                    {row.discrepancy}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="border border-blue-300 rounded px-2 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={row.note}
                      onChange={e => handleReconcileNote(idx, e.target.value)}
                      placeholder="Optional note"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className={`bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded ${row.updated ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={row.updated || row.physicalCount === ''}
                      onClick={() => handleReconcileUpdate(idx)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={handleReconcileReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReconcilePage; 