import React, { useState } from 'react';

const CheckboxRadio = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Checkbox & Radio</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-8">
          {/* Basic Checkboxes */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Basic Checkboxes</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Subscribe to newsletter</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  disabled
                />
                <span className="text-gray-500">Disabled option</span>
              </label>
            </div>
          </div>

          {/* Basic Radio Buttons */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Basic Radio Buttons</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Female</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  disabled
                />
                <span className="text-gray-500">Other (Disabled)</span>
              </label>
            </div>
          </div>

          {/* Card Radio Buttons */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Card Radio Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className={`relative flex cursor-pointer rounded-lg border p-4 ${
                selectedPlan === 'monthly' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  className="sr-only"
                  checked={selectedPlan === 'monthly'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="text-lg font-medium text-gray-900">Monthly</span>
                    <span className="text-sm text-gray-500">$29/mo</span>
                  </span>
                </span>
                <span className={`h-5 w-5 shrink-0 rounded-full border ${
                  selectedPlan === 'monthly' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                }`} aria-hidden="true" />
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border p-4 ${
                selectedPlan === 'quarterly' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="plan"
                  value="quarterly"
                  className="sr-only"
                  checked={selectedPlan === 'quarterly'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="text-lg font-medium text-gray-900">Quarterly</span>
                    <span className="text-sm text-gray-500">$79/quarter</span>
                  </span>
                </span>
                <span className={`h-5 w-5 shrink-0 rounded-full border ${
                  selectedPlan === 'quarterly' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                }`} aria-hidden="true" />
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border p-4 ${
                selectedPlan === 'annual' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="plan"
                  value="annual"
                  className="sr-only"
                  checked={selectedPlan === 'annual'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="text-lg font-medium text-gray-900">Annual</span>
                    <span className="text-sm text-gray-500">$290/year</span>
                  </span>
                </span>
                <span className={`h-5 w-5 shrink-0 rounded-full border ${
                  selectedPlan === 'annual' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                }`} aria-hidden="true" />
              </label>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Toggle Switches</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Email notifications</span>
                  <span className="text-sm text-gray-500">Get notified when someone mentions you</span>
                </span>
                <button
                  type="button"
                  className={`${
                    notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                >
                  <span
                    className={`${
                      notifications.email ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">SMS notifications</span>
                  <span className="text-sm text-gray-500">Get notified about important updates</span>
                </span>
                <button
                  type="button"
                  className={`${
                    notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                >
                  <span
                    className={`${
                      notifications.sms ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Push notifications</span>
                  <span className="text-sm text-gray-500">Get notified about new messages</span>
                </span>
                <button
                  type="button"
                  className={`${
                    notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                >
                  <span
                    className={`${
                      notifications.push ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxRadio;