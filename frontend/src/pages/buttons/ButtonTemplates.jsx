import React from 'react';
import {
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  Send,
  Mail,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Github,
  Facebook,
  Twitter
} from 'lucide-react';

const ButtonTemplates = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Button Templates</h1>
      </div>

      {/* Default Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Default Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Primary
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Secondary
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Success
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Danger
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            Warning
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Info
          </button>
        </div>
      </div>

      {/* Light Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Light Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
            Primary
          </button>
          <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
            Secondary
          </button>
          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
            Success
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
            Danger
          </button>
          <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100">
            Warning
          </button>
          <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
            Info
          </button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Outline Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            Primary
          </button>
          <button className="px-4 py-2 border-2 border-gray-500 text-gray-500 rounded-lg hover:bg-gray-50">
            Secondary
          </button>
          <button className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-50">
            Success
          </button>
          <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50">
            Danger
          </button>
          <button className="px-4 py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50">
            Warning
          </button>
          <button className="px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50">
            Info
          </button>
        </div>
      </div>

      {/* Rounded Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Rounded Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Primary
          </button>
          <button className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600">
            Secondary
          </button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            Success
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
            Danger
          </button>
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
            Warning
          </button>
          <button className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600">
            Info
          </button>
        </div>
      </div>

      {/* Gradient Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Gradient Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700">
            Primary
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700">
            Secondary
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700">
            Success
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700">
            Danger
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700">
            Warning
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700">
            Info
          </button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Icon Buttons</h2>
        <div className="space-y-4">
          {/* Leading Icons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus size={16} />
              <span>Add New</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Edit2 size={16} />
              <span>Edit</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>

          {/* Trailing Icons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <span>Download</span>
              <Download size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              <span>Upload</span>
              <Upload size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <span>Send</span>
              <Send size={16} />
            </button>
          </div>

          {/* Icon Only Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Mail size={20} />
            </button>
            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <Heart size={20} />
            </button>
            <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              <AlertCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Button States */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed">
            Disabled
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg">
            <CheckCircle2 size={16} />
            <span>Success</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg">
            <XCircle size={16} />
            <span>Error</span>
          </button>
        </div>
      </div>

      {/* Block Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Block Buttons</h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Block Button Primary
          </button>
          <button className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Block Button Secondary
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <CheckCircle2 size={20} />
            <span>Block Button with Icon</span>
          </button>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Social Media Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            <Github size={16} />
            <span>GitHub</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Facebook size={16} />
            <span>Facebook</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
            <Twitter size={16} />
            <span>Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonTemplates;