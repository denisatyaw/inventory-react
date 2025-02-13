import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, Bookmark, MoreVertical, ExternalLink, ChevronRight, Star, Clock, User, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';

const CardTemplates = () => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Card Templates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">Basic Card</h2>
          <p className="text-gray-600">
            A simple card with basic text content. Perfect for displaying short information or messages.
          </p>
        </div>

        {/* Card with Image */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Team Meeting"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Card with Image</h2>
            <p className="text-gray-600">
              A card featuring an image header with text content below.
            </p>
          </div>
        </div>

        {/* Card with Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">Interactive Card</h2>
          <p className="text-gray-600 mb-4">
            A card with interactive elements and action buttons.
          </p>
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-3">
              <button className="text-gray-500 hover:text-red-500">
                <Heart size={20} />
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                <Share2 size={20} />
              </button>
              <button className="text-gray-500 hover:text-green-500">
                <MessageCircle size={20} />
              </button>
            </div>
            <button className="text-gray-500 hover:text-blue-500">
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">@johndoe</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Landscape"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Beautiful sunset captured during my recent travels. Nature never ceases to amaze! 🌅
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                  <Heart size={18} />
                  <span>2.5k</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                  <MessageCircle size={18} />
                  <span>482</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card with Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'stats'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('stats')}
              >
                Statistics
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'history'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </div>
          </div>
          <div className="p-4">
            {activeTab === 'details' && (
              <div className="space-y-3">
                <h3 className="font-medium">Project Details</h3>
                <p className="text-gray-600">
                  Comprehensive project information and description goes here.
                </p>
              </div>
            )}
            {activeTab === 'stats' && (
              <div className="space-y-3">
                <h3 className="font-medium">Project Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-semibold text-blue-600">89%</div>
                    <div className="text-sm text-gray-500">Completion</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-semibold text-green-600">12</div>
                    <div className="text-sm text-gray-500">Tasks</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'history' && (
              <div className="space-y-3">
                <h3 className="font-medium">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>Updated 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>Modified by John Doe</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Product"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">
                Sale
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1">Wireless Headphones</h3>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                  fill={i < 4 ? "currentColor" : "none"}
                />
              ))}
              <span className="text-sm text-gray-500">(4.0)</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-lg font-bold">$89.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$129.99</span>
              </div>
              <span className="text-sm text-green-500">30% OFF</span>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Event"
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">Tech Conference 2024</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span>March 15, 2024 • 9:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span>Convention Center, New York</span>
            </div>
            <p className="text-gray-600">
              Join us for the biggest tech conference of the year featuring industry leaders and innovators.
            </p>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Register Now
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <User size={40} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
          <p className="text-gray-500 mb-4">Senior Product Designer</p>
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-xl font-semibold">152</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">3.2k</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">892</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
          <button className="w-full py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            View Profile
          </button>
        </div>

        {/* File Card */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ImageIcon size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">presentation.pdf</h3>
                <p className="text-sm text-gray-500">2.5 MB • PDF File</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Updated 2 days ago</span>
            </div>
            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
              <ExternalLink size={16} />
              <span className="text-sm">Open</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTemplates;