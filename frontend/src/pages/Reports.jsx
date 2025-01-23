import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';

const Reports = () => {
  const navigate = useNavigate();

  const reportTypes = [
    { id: 'sales', name: 'Sales Report' },
    { id: 'analytics', name: 'Analytics Report' },
    { id: 'export', name: 'Export Data' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
        <p className="mt-2 text-gray-600">View and generate various system reports.</p>
      </div>
      
      <div className="flex space-x-4 mb-6">
        {reportTypes.map(report => (
          <button
            key={report.id}
            onClick={() => navigate(`/reports/${report.id}`)}
            className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
          >
            {report.name}
          </button>
        ))}
      </div>

      <Routes>
        <Route path="/*" element={<p>Select a report type to view details</p>} />
        <Route path="/sales" element={<SalesReport />} />
        <Route path="/analytics" element={<AnalyticsReport />} />
        <Route path="/export" element={<ExportData />} />
      </Routes>
    </div>
  );
};

const SalesReport = () => (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
    {/* Add sales report content */}
  </div>
);

const AnalyticsReport = () => (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Analytics Report</h3>
    {/* Add analytics report content */}
  </div>
);

const ExportData = () => (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Export Data</h3>
    {/* Add export data content */}
  </div>
);

export default Reports;