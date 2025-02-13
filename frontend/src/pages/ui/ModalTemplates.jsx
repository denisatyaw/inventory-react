import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, Info, CheckCircle, X, Settings, User, FileText, Share2, Trash2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const ModalTemplates = () => {
  const [modals, setModals] = useState({
    basic: false,
    confirmation: false,
    form: false,
    alert: false,
    large: false,
    scrollable: false
  });

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Modal Templates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageSquare size={20} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-medium">Basic Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">A simple modal with a title and content.</p>
          <button
            onClick={() => openModal('basic')}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Open Modal
          </button>
        </div>

        {/* Confirmation Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h3 className="text-lg font-medium">Confirmation Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">Used for confirming destructive actions.</p>
          <button
            onClick={() => openModal('confirmation')}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Open Modal
          </button>
        </div>

        {/* Form Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText size={20} className="text-green-500" />
            </div>
            <h3 className="text-lg font-medium">Form Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">Modal containing a form for data input.</p>
          <button
            onClick={() => openModal('form')}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Open Modal
          </button>
        </div>

        {/* Alert Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Info size={20} className="text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium">Alert Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">Used for displaying important alerts.</p>
          <button
            onClick={() => openModal('alert')}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Open Modal
          </button>
        </div>

        {/* Large Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Settings size={20} className="text-purple-500" />
            </div>
            <h3 className="text-lg font-medium">Large Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">A larger modal for complex content.</p>
          <button
            onClick={() => openModal('large')}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Open Modal
          </button>
        </div>

        {/* Scrollable Modal */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <FileText size={20} className="text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium">Scrollable Modal</h3>
          </div>
          <p className="text-gray-600 mb-4">Modal with scrollable content.</p>
          <button
            onClick={() => openModal('scrollable')}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Open Modal
          </button>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={modals.basic}
        onClose={() => closeModal('basic')}
        title="Basic Modal"
      >
        <p className="text-gray-600">
          This is a basic modal example with simple content. You can put any content here.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => closeModal('basic')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modals.confirmation}
        onClose={() => closeModal('confirmation')}
        title="Delete Confirmation"
      >
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle size={24} />
          <h4 className="text-lg font-medium">Are you sure?</h4>
        </div>
        <p className="text-gray-600">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => closeModal('confirmation')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => closeModal('confirmation')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={modals.form}
        onClose={() => closeModal('form')}
        title="Edit Profile"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              rows="3"
              placeholder="Write something about yourself"
            ></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => closeModal('form')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Alert Modal */}
      <Modal
        isOpen={modals.alert}
        onClose={() => closeModal('alert')}
        title="System Update Required"
      >
        <div className="flex items-center gap-3 text-yellow-600 mb-4">
          <Info size={24} />
          <h4 className="text-lg font-medium">Important Notice</h4>
        </div>
        <p className="text-gray-600">
          A new system update is available. Please save your work and restart the application to install the latest updates.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => closeModal('alert')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Later
          </button>
          <button
            onClick={() => closeModal('alert')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Update Now
          </button>
        </div>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={modals.large}
        onClose={() => closeModal('large')}
        title="Project Details"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings size={32} className="text-purple-500" />
            </div>
            <div>
              <h4 className="text-lg font-medium">Project Name</h4>
              <p className="text-gray-500">Created on March 15, 2024</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-1">Status</h5>
              <p className="text-gray-600">Active</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-1">Team Members</h5>
              <p className="text-gray-600">8 members</p>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2">Description</h5>
            <p className="text-gray-600">
              This is a detailed description of the project. It can contain multiple paragraphs and extensive information about the project's goals, timeline, and requirements.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => closeModal('large')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => closeModal('large')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Edit Project
            </button>
          </div>
        </div>
      </Modal>

      {/* Scrollable Modal */}
      <Modal
        isOpen={modals.scrollable}
        onClose={() => closeModal('scrollable')}
        title="Terms of Service"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-600">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="text-gray-600">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => closeModal('scrollable')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Decline
            </button>
            <button
              onClick={() => closeModal('scrollable')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Accept
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalTemplates;