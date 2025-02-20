import React, { useState, useEffect, useRef, useContext } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronRight, Save } from 'lucide-react';
import * as Icons from 'lucide-react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css'; 
import 'datatables.net-select-dt/css/select.dataTables.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const MenuManagement = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [formData, setFormData] = useState({
    menuId: '',
    name: '',
    parent_id: '',
    route: '',
    icon: '',
    is_active: true,
    created_by: user ? user.userId : '',
    creator_username: user ? user.username : '',
    parent_order: '',
    submenu_order: ''
  });
  const [menuList, setMenuList] = useState([]);
  const [parentMenuList, setParentMenuList] = useState([]);

  // Fetch menu list from backend
  const fetchMenuList = async () => {
    try {
      const response = await axios.get('http://168.138.173.100:5000/menu/get-all-menu-rows');
      setMenuList(response.data.data);
    } catch (error) {
      console.error('Error fetching menu list:', error);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  // Fetch parent menu list from backend
  useEffect(() => {
    const fetchParentMenuList = async () => {
      try {
        const response = await axios.get('http://168.138.173.100:5000/menu/get-parent-menu');
        setParentMenuList(response.data.data);
      } catch (error) {
        console.error('Error fetching parent menu list:', error);
      }
    };

    fetchParentMenuList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure created_by is always set to the current user's ID
    const dataToSubmit = {
      menu_id: formData.menuId,
      name: formData.name,
      is_active: formData.is_active,
      created_by: user ? user.userId : formData.created_by,
    };

    if (formData.parent_id) dataToSubmit.parent_id = formData.parent_id;
    if (formData.route) dataToSubmit.route = formData.route;
    if (formData.icon) dataToSubmit.icon = formData.icon;
    if (formData.parent_order) dataToSubmit.parent_order = formData.parent_order;
    if (formData.submenu_order) dataToSubmit.submenu_order = formData.submenu_order;

    try {
      const response = await axios.post('http://168.138.173.100:5000/menu/upsert-menu', dataToSubmit, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log('Form submitted successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      // Refresh the menu list
      fetchMenuList();
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting the form. Please try again.',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Ensure created_by is always set to the current user's ID
      created_by: user ? user.userId : prev.created_by
    }));
  };

  // Get all available Lucide icons
  const iconList = Object.keys(Icons).filter(key => 
    typeof Icons[key] === 'function' && key !== 'createLucideIcon'
  );

  useEffect(() => {
    if (menuList.length > 0) {
      // Initialize DataTable
      dataTableRef.current = $(tableRef.current).DataTable({
        data: menuList,
        columns: [
          { data: 'menu_id', title: 'Menu ID' },
          { data: 'name', title: 'Name' },
          { data: 'parent_id', title: 'Parent ID' },
          { data: 'route', title: 'Route' },
          { data: 'icon', title: 'Icon' },
          { data: 'is_active', title: 'Active', render: data => data ? 'Yes' : 'No' },
          { data: 'creator.username', title: 'Created By' },
          { data: 'created_by', title: 'Created By (Hidden)', visible: false },
          { data: 'parent_order', title: 'Parent Order' },
          { data: 'submenu_order', title: 'Submenu Order' }
        ],
        responsive: true,
        dom: '<"flex flex-col sm:flex-row sm:items-center sm:justify-between"<"flex items-center gap-4"l<"custom-filter">>f>rt<"flex items-center justify-between border-t border-gray-200 pt-3"<"flex items-center text-gray-600"i><"flex items-center gap-2"p>>',
        pageLength: 10,
        language: {
          search: '',
          searchPlaceholder: 'Search...',
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          paginate: {
            first: '«',
            previous: '‹',
            next: '›',
            last: '»'
          }
        }
      });

      // Add row click event
      $(tableRef.current).on('click', 'tr', function () {
        const data = dataTableRef.current.row(this).data();
        if (data) {
          setFormData({
            menuId: data.menu_id,
            name: data.name,
            parent_id: data.parent_id || '',
            route: data.route,
            icon: data.icon,
            is_active: data.is_active,
            created_by: data.created_by,
            creator_username: data.creator.username,
            parent_order: data.parent_order || '',
            submenu_order: data.submenu_order || ''
          });
        }
      });

      // Cleanup
      return () => {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
        }
      };
    }
  }, [menuList]);

  const resetForm = () => {
    setFormData({
      menuId: '',
      name: '',
      parent_id: '',
      route: '',
      icon: '',
      is_active: true,
      created_by: user ? user.userId : '',
      creator_username: user ? user.username : '',
      parent_order: '',
      submenu_order: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Menu Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system menu structure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-1">
          <h2 className="text-lg font-medium mb-4">Menu Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Menu ID</label>
                <input
                  type="text"
                  name="menuId"
                  value={formData.menuId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter Menu ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter menu name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Menu</label>
                <select
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">None</option>
                  {parentMenuList.map(menu => (
                    <option key={menu.menu_id} value={menu.menu_id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Route</label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="/example/route"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter icon name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created By</label>
                <select
                  name="created_by"
                  value={formData.created_by}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  disabled
                >
                  <option value={formData.created_by}>
                    {formData.creator_username}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Order</label>
                <input
                  type="text"
                  name="parent_order"
                  value={formData.parent_order}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter parent order"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Submenu Order</label>
                <input
                  type="text"
                  name="submenu_order"
                  value={formData.submenu_order}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter submenu order"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Menu List Section */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <h2 className="text-lg font-medium p-4 border-b border-gray-200">Menu List</h2>
          <div className="overflow-x-auto p-4">
            <table ref={tableRef} className="w-full">
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;