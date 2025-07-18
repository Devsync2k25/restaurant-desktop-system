

const SettingsPage = ({
  settings,
  handleSettingsChange,
  saveSettings,
  toggleTheme,
  exportData,
  handleImport,
  resetAllData,
  settingsSuccess,
  importError,
  showResetConfirm,
  setShowResetConfirm,
  uploadedLogo,
  handleLogoUpload
}: any) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">Settings</span>
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.38 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 01.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.38-1.51 1z"/></svg>
      </h2>
      <form onSubmit={saveSettings} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Restaurant Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={settings.restaurantName} onChange={e => handleSettingsChange('restaurantName', e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Logo (URL or Upload)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Paste image URL or leave blank"
            value={settings.logo}
            onChange={e => handleSettingsChange('logo', e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2 mb-2"
            onChange={handleLogoUpload}
          />
          {(uploadedLogo || settings.logo) && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={uploadedLogo || settings.logo}
                alt="Logo Preview"
                className="h-10 w-auto object-contain rounded border"
                style={{ maxHeight: 40 }}
              />
              <span className="text-gray-500 text-xs">Preview</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Contact Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" value={settings.contactEmail} onChange={e => handleSettingsChange('contactEmail', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Contact Phone</label>
            <input type="tel" className="w-full border rounded px-3 py-2" value={settings.contactPhone} onChange={e => handleSettingsChange('contactPhone', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Default Unit</label>
            <select className="w-full border rounded px-3 py-2" value={settings.unit} onChange={e => handleSettingsChange('unit', e.target.value)}>
              <option value="kg">Kilograms (kg)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="L">Liters (L)</option>
              <option value="gal">Gallons (gal)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Currency</label>
            <select className="w-full border rounded px-3 py-2" value={settings.currency} onChange={e => handleSettingsChange('currency', e.target.value)}>
              <option value="₵">Cedis (₵)</option>
              <option value="$">Dollar ($)</option>
              <option value="€">Euro (€)</option>
              <option value="£">Pound (£)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Language</label>
            <select className="w-full border rounded px-3 py-2" value={settings.language} onChange={e => handleSettingsChange('language', e.target.value)}>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold">Theme</label>
          <button type="button" className={`px-4 py-2 rounded ${settings.theme === 'light' ? 'bg-blue-100 text-blue-900' : 'bg-blue-900 text-white'}`} onClick={toggleTheme}>
            {settings.theme === 'light' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Settings</button>
          {settingsSuccess && <span className="text-green-600 font-semibold ml-2">{settingsSuccess}</span>}
        </div>
      </form>
      <hr className="my-8" />
      <div className="mb-6">
        <h3 className="font-bold mb-2">Data Management</h3>
        <div className="flex gap-4 items-center">
          <button className="bg-blue-100 text-blue-900 px-4 py-2 rounded hover:bg-blue-200" onClick={exportData}>Export Data</button>
          <label className="bg-blue-100 text-blue-900 px-4 py-2 rounded hover:bg-blue-200 cursor-pointer">
            Import Data
            <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
          </label>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200" onClick={() => setShowResetConfirm(true)}>Reset All Data</button>
          {importError && <span className="text-red-600 ml-2">{importError}</span>}
        </div>
        {showResetConfirm && (
          <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded">
            <p className="mb-2 text-red-700 font-semibold">Are you sure you want to reset all data? This cannot be undone.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={resetAllData}>Yes, Reset</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => setShowResetConfirm(false)}>Cancel</button>
          </div>
        )}
      </div>
      <hr className="my-8" />
      <div>
        <h3 className="font-bold mb-2">About</h3>
        <p>Coral Gardens Inventory Dashboard v1.0</p>
        <p>For support, contact <a href="mailto:support@coralgardens.com" className="text-blue-600 underline">support@coralgardens.com</a></p>
      </div>
    </div>
  );
};

export default SettingsPage; 