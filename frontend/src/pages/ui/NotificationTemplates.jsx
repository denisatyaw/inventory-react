import React from 'react';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const NotificationTemplates = () => {
  const { success, error, warning, info } = useNotification();

  const showNotification = (type) => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred while processing your request.',
      warning: 'Please review your input before proceeding.',
      info: 'New updates are available for your system.'
    };

    switch (type) {
      case 'success':
        success(messages.success);
        break;
      case 'error':
        error(messages.error);
        break;
      case 'warning':
        warning(messages.warning);
        break;
      case 'info':
        info(messages.info);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Notification Templates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Success Notification */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <h3 className="text-lg font-medium">Success</h3>
          </div>
          <p className="text-gray-600 mb-4">Display success messages and confirmations.</p>
          <button
            onClick={() => showNotification('success')}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Show Notification
          </button>
        </div>

        {/* Error Notification */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle size={20} className="text-red-500" />
            </div>
            <h3 className="text-lg font-medium">Error</h3>
          </div>
          <p className="text-gray-600 mb-4">Display error messages and failures.</p>
          <button
            onClick={() => showNotification('error')}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Show Notification
          </button>
        </div>

        {/* Warning Notification */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle size={20} className="text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium">Warning</h3>
          </div>
          <p className="text-gray-600 mb-4">Display warning messages and alerts.</p>
          <button
            onClick={() => showNotification('warning')}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Show Notification
          </button>
        </div>

        {/* Info Notification */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Info size={20} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-medium">Info</h3>
          </div>
          <p className="text-gray-600 mb-4">Display informational messages.</p>
          <button
            onClick={() => showNotification('info')}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Show Notification
          </button>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Usage Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Form Submission</h3>
            <div className="space-y-2">
              <button
                onClick={() => success('Form submitted successfully!')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Submit Form
              </button>
              <button
                onClick={() => error('Please fill in all required fields.')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Invalid Form
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Data Operations</h3>
            <div className="space-y-2">
              <button
                onClick={() => warning('This action will delete all selected items.')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Delete Items
              </button>
              <button
                onClick={() => info('Your session will expire in 5 minutes.')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Session Warning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTemplates;