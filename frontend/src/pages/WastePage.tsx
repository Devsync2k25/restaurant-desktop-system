

const WastePage = ({
  currentUser,
  ROLES,
  wasteLog,
  wasteForm,
  setWasteForm,
  wasteReasons,
  newReason,
  setNewReason,
  addReason,
  removeReason,
  editingReasonIdx,
  editingReasonValue,
  setEditingReasonValue,
  startEditReason,
  saveEditedReason,
  cancelEditReason,
  handleWasteSubmit,
  wasteError,
  wasteSuccess,
  totalEvents,
  totalQuantity,
  wasteByReason,
  inventoryItems
}: any) => {
  const isDirector = currentUser?.role === ROLES?.DIRECTOR;
  
  return (
    <div className="mx-auto bg-white rounded-2xl shadow-md p-8 w-full" style={{ maxWidth: '700px', minHeight: 'calc(100vh - 4rem)' }}>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Waste Tracking {isDirector && '(View Only)'}
      </h1>
      
      {isDirector ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-4">
            Directors can view waste data but cannot log waste. This function is restricted to operational staff.
          </div>
        </div>
      ) : null}
      
      {/* Waste Analytics Summary */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 shadow flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-800">{totalEvents}</div>
          <div className="text-blue-700">Total Waste Events</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 shadow flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-800">{totalQuantity}</div>
          <div className="text-blue-700">Total Quantity Wasted</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 shadow flex flex-col items-center">
          <div className="text-lg font-bold text-blue-800 mb-1">By Reason</div>
          <ul className="text-blue-700 text-sm">
            {Object.entries(wasteByReason).length === 0 && <li>No data</li>}
            {Object.entries(wasteByReason).map(([reason, qty]) => (
              <li key={reason}>{reason}: {String(qty)}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Editable Waste Reasons - Only for non-directors */}
      {!isDirector && (
        <div className="mb-6">
          <label className="block font-semibold text-blue-800 mb-1">Edit Waste Reasons</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {wasteReasons.map((reason: string, idx: number) => (
              <span key={reason} className="inline-flex items-center bg-blue-100 text-blue-900 rounded px-4 py-2 mr-3 mb-2 relative">
                {editingReasonIdx === idx ? (
                  <input
                    className="bg-blue-50 border border-blue-300 rounded px-2 py-1 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={editingReasonValue}
                    autoFocus
                    onChange={e => setEditingReasonValue(e.target.value)}
                    onBlur={() => saveEditedReason(idx)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEditedReason(idx);
                      if (e.key === 'Escape') cancelEditReason();
                    }}
                    style={{ minWidth: 60 }}
                  />
                ) : (
                  <>
                    <span>{reason}</span>
                    <button
                      className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
                      title="Edit reason"
                      onClick={() => startEditReason(idx, reason)}
                    >
                      <svg className="inline w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M16 8l-8 8M8 16h4v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button
                      className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                      title="Remove reason"
                      onClick={() => removeReason(reason)}
                    >
                      ×
                    </button>
                  </>
                )}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="border rounded px-2 py-1" placeholder="Add reason" value={newReason} onChange={e => setNewReason(e.target.value)} />
            <button type="button" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={addReason}>Add</button>
          </div>
        </div>
      )}
      
      {/* Waste Form - Only for non-directors */}
      {!isDirector && (
        <form className="mb-8 space-y-4" onSubmit={handleWasteSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Date</label>
              <input type="date" className="w-full border rounded px-3 py-2" value={wasteForm.date} onChange={e => setWasteForm((f: any) => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Item</label>
              <select className="w-full border rounded px-3 py-2" value={wasteForm.item} onChange={e => {
                const item = e.target.value;
                const inv = inventoryItems.find((i: any) => i.item === item);
                setWasteForm((f: any) => ({ ...f, item, unit: inv ? inv.unit : '' }));
              }}>
                <option value="">-- Select item --</option>
                {inventoryItems.map((i: any) => (
                  <option key={i.item} value={i.item}>{i.item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Quantity</label>
              <input type="number" min={1} className="w-full border rounded px-3 py-2" value={wasteForm.quantity} onChange={e => setWasteForm((f: any) => ({ ...f, quantity: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Unit</label>
              <input className="w-full border rounded px-3 py-2" value={wasteForm.unit} readOnly />
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Reason</label>
              <select className="w-full border rounded px-3 py-2" value={wasteForm.reason} onChange={e => setWasteForm((f: any) => ({ ...f, reason: e.target.value }))}>
                {wasteReasons.map((r: string) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Staff (optional)</label>
              <input className="w-full border rounded px-3 py-2" value={wasteForm.staff} onChange={e => setWasteForm((f: any) => ({ ...f, staff: e.target.value }))} />
            </div>
          </div>
          <button className="mt-4 px-6 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition" type="submit">Log Waste</button>
          {wasteError && <div className="text-red-600 mt-2">{wasteError}</div>}
          {wasteSuccess && <div className="text-green-600 mt-2">{wasteSuccess}</div>}
        </form>
      )}
      
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Recent Waste Events</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Item</th>
              <th className="py-2 px-2">Quantity</th>
              <th className="py-2 px-2">Unit</th>
              <th className="py-2 px-2">Reason</th>
              <th className="py-2 px-2">Staff</th>
            </tr>
          </thead>
          <tbody>
            {wasteLog.length === 0 && <tr><td colSpan={6} className="text-gray-500 py-4">No waste events logged yet.</td></tr>}
            {wasteLog.map((w: any, i: number) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="py-2 px-2">{w.date}</td>
                <td className="py-2 px-2">{w.item}</td>
                <td className="py-2 px-2">{w.quantity}</td>
                <td className="py-2 px-2">{w.unit}</td>
                <td className="py-2 px-2">{w.reason}</td>
                <td className="py-2 px-2">{w.staff || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WastePage; 