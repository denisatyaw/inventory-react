import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/users/UsersList';
import Roles from './pages/users/Roles';
import Permissions from './pages/users/Permissions';
import TodoList from './pages/pages/TodoList';
import BasicTable from './pages/tables/BasicTable';
import DataTable from './pages/tables/DataTable';
import AdvancedTable from './pages/tables/AdvancedTable';
import BasicForm from './pages/forms/BasicForm';
import InputGroups from './pages/forms/InputGroups';
import CheckboxRadio from './pages/forms/CheckboxRadio';
import DateTimePicker from './pages/forms/DateTimePicker';
import ButtonTemplates from './pages/buttons/ButtonTemplates';
import CardTemplates from './pages/cards/CardTemplates';
import ModalTemplates from './pages/ui/ModalTemplates';
import NotificationTemplates from './pages/ui/NotificationTemplates';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './routes/protectedRoutes';
import MenuManagement from './pages/settings/MenuManagement';


// Placeholder pages
const Products = () => <div className="bg-white p-6 rounded-lg shadow-sm"><h1 className="text-2xl font-semibold">Products</h1></div>;
const Categories = () => <div className="bg-white p-6 rounded-lg shadow-sm"><h1 className="text-2xl font-semibold">Categories</h1></div>;
const Inventory = () => <div className="bg-white p-6 rounded-lg shadow-sm"><h1 className="text-2xl font-semibold">Inventory</h1></div>;
const Orders = () => <div className="bg-white p-6 rounded-lg shadow-sm"><h1 className="text-2xl font-semibold">Orders</h1></div>;
const Settings = () => <div className="bg-white p-6 rounded-lg shadow-sm"><h1 className="text-2xl font-semibold">Settings</h1></div>;

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          {/* Auth routes (Tanpa proteksi) */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/users" element={<Layout><UsersList /></Layout>} />
            <Route path="/roles" element={<Layout><Roles /></Layout>} />
            <Route path="/permissions" element={<Layout><Permissions /></Layout>} />
            <Route path="/pages/todo" element={<Layout><TodoList /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/categories" element={<Layout><Categories /></Layout>} />
            <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/tables/basic" element={<Layout><BasicTable /></Layout>} />
            <Route path="/tables/data" element={<Layout><DataTable /></Layout>} />
            <Route path="/tables/advanced" element={<Layout><AdvancedTable /></Layout>} />
            <Route path="/forms/basic" element={<Layout><BasicForm /></Layout>} />
            <Route path="/forms/input-groups" element={<Layout><InputGroups /></Layout>} />
            <Route path="/forms/checkbox-radio" element={<Layout><CheckboxRadio /></Layout>} />
            <Route path="/forms/datetime" element={<Layout><DateTimePicker /></Layout>} />
            <Route path="/buttons" element={<Layout><ButtonTemplates /></Layout>} />
            <Route path="/cards" element={<Layout><CardTemplates /></Layout>} />
            <Route path="/modals" element={<Layout><ModalTemplates /></Layout>} />
            <Route path="/notifications" element={<Layout><NotificationTemplates /></Layout>} />
            <Route path="/settings/menu" element={<Layout><MenuManagement /></Layout>} />
          </Route>

          {/* Redirect jika halaman tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
