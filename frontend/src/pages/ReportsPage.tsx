

const ReportsPage = ({
  reportFormat,
  setReportFormat,
  downloadReport,
  orderNotifications,
  goodsIssuance,
  wasteLog,
  inventoryItems
}: any) => {
  
  // Generate comprehensive worker activity report
  const generateWorkerActivityReport = () => {
    const activities: any[] = [];
    
    // Add order notifications with approval/completion tracking
    orderNotifications.forEach((notification: any) => {
      activities.push({
        Date: notification.timestamp.toLocaleDateString(),
        Time: notification.timestamp.toLocaleTimeString(),
        Activity: 'Order Placed',
        Worker: notification.orderedBy,
        Details: `${notification.recipeName} - Qty: ${notification.quantity}`,
        OrderID: notification.orderId,
        Status: notification.status,
        ApprovedBy: notification.approvedBy || 'Pending',
        ApprovedAt: notification.approvedAt ? notification.approvedAt.toLocaleString() : 'Pending',
        CompletedBy: notification.completedBy || 'Pending',
        CompletedAt: notification.completedAt ? notification.completedAt.toLocaleString() : 'Pending'
      });
    });
    
    // Add goods issuance activities
    goodsIssuance.forEach((issuance: any) => {
      activities.push({
        Date: issuance.date,
        Time: 'N/A',
        Activity: 'Goods Issuance',
        Worker: 'Stores Manager', // This is typically done by Stores Manager
        Details: `${issuance.item} - Qty: ${issuance.issued} - Dept: ${issuance.department}`,
        OrderID: 'N/A',
        Status: 'Completed',
        ApprovedBy: 'N/A',
        ApprovedAt: 'N/A',
        CompletedBy: 'N/A',
        CompletedAt: 'N/A'
      });
    });
    
    // Add waste logging activities
    wasteLog.forEach((waste: any) => {
      activities.push({
        Date: waste.date,
        Time: 'N/A',
        Activity: 'Waste Logged',
        Worker: waste.staff,
        Details: `${waste.item} - Qty: ${waste.quantity} ${waste.unit} - Reason: ${waste.reason}`,
        OrderID: 'N/A',
        Status: 'Completed',
        ApprovedBy: 'N/A',
        ApprovedAt: 'N/A',
        CompletedBy: 'N/A',
        CompletedAt: 'N/A'
      });
    });
    
    // Add inventory changes (when items are added/edited)
    inventoryItems.forEach((item: any) => {
      if (item.lastModified) {
        activities.push({
          Date: item.lastModified.toLocaleDateString(),
          Time: item.lastModified.toLocaleTimeString(),
          Activity: 'Inventory Updated',
          Worker: item.modifiedBy || 'System',
          Details: `${item.item} - Stock: ${item.stock} - Category: ${item.category}`,
          OrderID: 'N/A',
          Status: 'Completed',
          ApprovedBy: 'N/A',
          ApprovedAt: 'N/A',
          CompletedBy: 'N/A',
          CompletedAt: 'N/A'
        });
      }
    });
    
    // Sort by date (most recent first)
    return activities.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
  };

  const workerActivities = generateWorkerActivityReport();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Reports</h1>
      
      {/* Worker Activity Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Worker Activity Report</h2>
        <p className="mb-4 text-gray-700">
          Comprehensive report of all activities by workers (excluding Manager and Director roles).
          Includes order approvals, completions, and all operational activities.
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-blue-900">Format:</label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value as 'csv' | 'pdf')}
              className="border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="pdf">PDF (Recommended)</option>
              <option value="csv">Excel (CSV)</option>
            </select>
          </div>
          <button
            onClick={() => downloadReport(workerActivities, 'worker-activity-report')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </button>
        </div>
        
        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Total Activities</h3>
            <p className="text-2xl font-bold text-blue-600">{workerActivities.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Orders Placed</h3>
            <p className="text-2xl font-bold text-green-600">
              {workerActivities.filter(a => a.Activity === 'Order Placed').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900">Pending Approvals</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {workerActivities.filter(a => a.ApprovedBy === 'Pending').length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Completed Orders</h3>
            <p className="text-2xl font-bold text-purple-600">
              {workerActivities.filter(a => a.CompletedBy !== 'Pending').length}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReportsPage; 