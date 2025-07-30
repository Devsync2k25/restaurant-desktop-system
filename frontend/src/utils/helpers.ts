import { saveAs } from 'file-saver';
import { recipeNames } from './constants';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper to get an array of date strings for the selected week
export function getWeekDates(startDate: string) {
  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

// Enhanced download function with multiple formats
export function downloadReport(data: any[], filename: string, format: 'csv' | 'json' | 'txt' | 'pdf') {
  console.log('Download Report - Data received:', data);
  console.log('Download Report - Restock requests in data:', data.filter(a => a.Activity === 'Restock Request'));
  
  let content = '';
  let mimeType = '';
  let extension = '';

  switch (format) {
    case 'csv':
      // CSV format
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(row => Object.values(row).join(','));
      content = [headers, ...rows].join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
      break;
    
    case 'json':
      // JSON format
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      extension = 'json';
      break;
    
    case 'txt':
      // Plain text format (readable)
      content = data.map(row => 
        Object.entries(row).map(([key, value]) => `${key}: ${value}`).join(' | ')
      ).join('\n');
      mimeType = 'text/plain';
      extension = 'txt';
      break;

    case 'pdf':
      // PDF format
      generatePDF(data, filename);
      return; // PDF is handled separately
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// PDF generation function
function generatePDF(data: any[], filename: string) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Worker Activity Report', 14, 22);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
  
  // Prepare table data
  const headers = Object.keys(data[0] || {});
  const tableData = data.map(row => Object.values(row).map(value => String(value)));
  
  // Add table
  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [59, 130, 246], // Blue color
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // Light gray
    },
    columnStyles: {
      0: { cellWidth: 20 }, // Date
      1: { cellWidth: 15 }, // Time
      2: { cellWidth: 25 }, // Activity
      3: { cellWidth: 20 }, // Worker
      4: { cellWidth: 35 }, // Details
      5: { cellWidth: 20 }, // OrderID
      6: { cellWidth: 15 }, // Status
      7: { cellWidth: 20 }, // ApprovedBy
      8: { cellWidth: 25 }, // ApprovedAt
      9: { cellWidth: 20 }, // CompletedBy
      10: { cellWidth: 25 }, // CompletedAt
    },
    margin: { top: 40 },
  });
  
  // Add summary at the end
  const totalActivities = data.length;
  const ordersPlaced = data.filter(a => a.Activity === 'Order Placed').length;
  const restockRequests = data.filter(a => a.Activity === 'Restock Request').length;
  const pendingApprovals = data.filter(a => a.ApprovedBy === 'Pending').length;
  const completedOrders = data.filter(a => a.CompletedBy !== 'Pending').length;
  
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.text('Summary:', 14, finalY);
  doc.setFontSize(10);
  doc.text(`Total Activities: ${totalActivities}`, 14, finalY + 8);
  doc.text(`Orders Placed: ${ordersPlaced}`, 14, finalY + 16);
  doc.text(`Restock Requests: ${restockRequests}`, 14, finalY + 24);
  doc.text(`Pending Approvals: ${pendingApprovals}`, 14, finalY + 32);
  doc.text(`Completed Orders: ${completedOrders}`, 14, finalY + 40);
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
}

// Legacy CSV download function
export function downloadCSV(analyticsData: any) {
  const headers = ['Day', ...recipeNames];
  const rows = analyticsData.labels.map((label: string, i: number) => {
    const row = [label];
    analyticsData.datasets.forEach((ds: any) => {
      row.push(String(ds.data[i]));
    });
    return row.join(',');
  });
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'recipe-usage-report.csv');
} 