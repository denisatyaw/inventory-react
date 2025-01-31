import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ThemeCustomizer from './components/ThemeCustomizer';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';
import Unauthorized from './pages/Unauthorized';
import ServerError from './pages/ServerError';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import Security from './pages/Security';
import Settings from './pages/Settings';
import KanbanBoard from './pages/Kanban';

const MAX_TABS = 10;
//Test
// Simulated authentication check
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [openTabs, setOpenTabs] = useState([
    { id: 'dashboard', title: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' }
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState({
    primary: 'blue',
    accent: 'amber',
    mode: 'light'
  });

  // Simulated maintenance mode check
  const isMaintenanceMode = false;

  useEffect(() => {
    const root = document.documentElement;
    root.className = `${theme.mode === 'dark' ? 'dark' : ''} theme-${theme.primary} accent-${theme.accent}`;
  }, [theme]);

  const handleAddTab = (tab) => {
    if (openTabs.find(t => t.id === tab.id)) {
      setActiveTab(tab.id);
      return;
    }

    if (openTabs.length >= MAX_TABS) {
      alert(`Maximum ${MAX_TABS} tabs allowed`);
      return;
    }

    setOpenTabs(prev => [...prev, tab]);
    setActiveTab(tab.id);
  };

  const handleCloseTab = (tabId) => {
    setOpenTabs(prev => {
      const tabIndex = prev.findIndex(tab => tab.id === tabId);
      const newTabs = prev.filter(tab => tab.id !== tabId);

      if (activeTab === tabId) {
        if (tabIndex < prev.length - 1) {
          setActiveTab(prev[tabIndex + 1].id);
        } else if (tabIndex > 0) {
          setActiveTab(prev[tabIndex - 1].id);
        } else {
          const dashboardTab = { id: 'dashboard', title: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' };
          setOpenTabs([dashboardTab]);
          setActiveTab('dashboard');
          return [dashboardTab];
        }
      }

      return newTabs.length > 0 ? newTabs : [{ id: 'dashboard', title: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' }];
    });
  };

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <div className={`flex h-screen bg-gray-100`}>
              <Sidebar onMenuClick={handleAddTab} theme={theme} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar
                  tabs={openTabs}
                  activeTab={activeTab}
                  onTabClick={setActiveTab}
                  onCloseTab={handleCloseTab}
                  theme={theme}
                  maxTabs={MAX_TABS}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/reports/*" element={<Reports />} />
                    <Route path="/analytics/*" element={<Analytics />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/messages/*" element={<Messages />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/security/*" element={<Security />} />
                    <Route path="/settings/*" element={<Settings />} />
                    <Route path="/kanban" element={<KanbanBoard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              <ThemeCustomizer theme={theme} onThemeChange={setTheme} />
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;