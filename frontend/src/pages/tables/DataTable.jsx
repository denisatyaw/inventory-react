import React, { useEffect, useRef } from 'react';
import { Search, Download, Upload, Plus } from 'lucide-react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import './datatable.css';

const DataTable = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      lastLogin: '2024-03-10',
      location: 'New York',
      projects: ['Project A', 'Project B']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      department: 'HR',
      status: 'Inactive',
      lastLogin: '2024-03-09',
      location: 'London',
      projects: ['Project C']
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Editor',
      department: 'Marketing',
      status: 'Active',
      lastLogin: '2024-03-08',
      location: 'Paris',
      projects: ['Project A', 'Project D']
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'User',
      department: 'Sales',
      status: 'Active',
      lastLogin: '2024-03-07',
      location: 'Tokyo',
      projects: ['Project B']
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'User',
      department: 'IT',
      status: 'Inactive',
      lastLogin: '2024-03-06',
      location: 'Berlin',
      projects: ['Project C', 'Project D']
    }
  ];

  useEffect(() => {
    // Initialize DataTable
    dataTableRef.current = $(tableRef.current).DataTable({
      data: data,
      columns: [
        {
          data: null,
          defaultContent: '',
          orderable: false,
          className: 'select-checkbox',
          width: '30px'
        },
        { 
          data: 'name',
          title: 'Name',
          render: function(data, type, row) {
            return `
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-medium">${data.charAt(0)}</span>
                </div>
                <div>
                  <div class="font-medium">${data}</div>
                  <div class="text-sm text-gray-500">${row.email}</div>
                </div>
              </div>
            `;
          }
        },
        { 
          data: 'department',
          title: 'Department',
          render: function(data, type, row) {
            return `
              <div>
                <div class="font-medium">${data}</div>
                <div class="text-sm text-gray-500">${row.role}</div>
              </div>
            `;
          }
        },
        { 
          data: 'location',
          title: 'Location'
        },
        {
          data: 'status',
          title: 'Status',
          render: function(data) {
            const colorClass = data === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            return `<span class="px-2 py-1 text-xs font-medium rounded-full ${colorClass}">${data}</span>`;
          }
        },
        {
          data: 'projects',
          title: 'Projects',
          render: function(data) {
            return data.map(project => 
              `<span class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-1">${project}</span>`
            ).join('');
          }
        },
        {
          data: 'lastLogin',
          title: 'Last Login'
        }
      ],
      select: {
        style: 'multi',
        selector: 'td:first-child'
      },
      responsive: true,
      dom: '<"flex items-center justify-between mb-4"<"flex items-center gap-4"l<"custom-filter">>f>rtip',
      language: {
        search: '',
        searchPlaceholder: 'Search...',
        lengthMenu: 'Show _MENU_ entries'
      },
      initComplete: function() {
        // Add custom filter dropdown
        const filterHtml = `
          <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        `;
        $('.custom-filter').html(filterHtml);

        // Add custom filter functionality
        $('.custom-filter select').on('change', function() {
          const val = $(this).val();
          dataTableRef.current
            .column(2)
            .search(val)
            .draw();
        });
      }
    });

    // Cleanup
    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Data Table</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload size={16} />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} />
            <span>Import</span>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <table ref={tableRef} className="w-full">
        </table>
      </div>
    </div>
  );
};

export default DataTable;