import React from 'react';
import { BarChart3, Users, ShoppingCart, DollarSign, TrendingUp, Package, Clock, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trend.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value} {trend.type === 'up' ? '↑' : '↓'}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
    <div className="space-y-4">
      {[
        { time: '2 minutes ago', text: 'New order #1234 received', icon: ShoppingCart },
        { time: '5 minutes ago', text: 'User John Doe updated their profile', icon: Users },
        { time: '10 minutes ago', text: 'Product "iPhone 13" stock updated', icon: Package },
        { time: '15 minutes ago', text: 'New user registration: jane@example.com', icon: Users },
      ].map((activity, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <activity.icon size={16} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{activity.text}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$54,239"
          icon={DollarSign}
          trend={{ type: 'up', value: '12%' }}
          color="bg-green-500"
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          icon={ShoppingCart}
          trend={{ type: 'up', value: '8%' }}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Users"
          value="892"
          icon={Users}
          trend={{ type: 'up', value: '15%' }}
          color="bg-purple-500"
        />
        <StatCard
          title="Conversion Rate"
          value="2.4%"
          icon={TrendingUp}
          trend={{ type: 'down', value: '3%' }}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <BarChart3 size={48} />
            <p className="ml-2">Chart will be implemented here</p>
          </div>
        </div>
        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { id: '#1234', customer: 'John Doe', amount: '$129.99', status: 'Processing' },
              { id: '#1235', customer: 'Jane Smith', amount: '$79.99', status: 'Pending' },
              { id: '#1236', customer: 'Bob Johnson', amount: '$199.99', status: 'Processing' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <p className="text-sm text-orange-500">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">System Alerts</h2>
            <AlertCircle size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { title: 'Low Stock Alert', message: '5 products are running low on stock', severity: 'high' },
              { title: 'System Update', message: 'New update available for the system', severity: 'medium' },
              { title: 'Backup Reminder', message: 'Last backup was 7 days ago', severity: 'low' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 py-3 border-b last:border-0">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'high' ? 'bg-red-50' :
                  alert.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <AlertCircle size={16} className={
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  } />
                </div>
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-gray-500">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;