import React, { useState } from 'react';
import { Palette, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ThemeCustomizer = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions = {
    primary: [
      { name: 'Blue', value: 'blue' },
      { name: 'Indigo', value: 'indigo' },
      { name: 'Purple', value: 'purple' },
      { name: 'Rose', value: 'rose' },
      { name: 'Green', value: 'green' },
      { name: 'Teal', value: 'teal' }
    ],
    accent: [
      { name: 'Amber', value: 'amber' },
      { name: 'Orange', value: 'orange' },
      { name: 'Yellow', value: 'yellow' },
      { name: 'Lime', value: 'lime' },
      { name: 'Emerald', value: 'emerald' },
      { name: 'Cyan', value: 'cyan' }
    ]
  };

  const handleColorChange = (type, value) => {
    onThemeChange({
      ...theme,
      [type]: value
    });
  };

  return (
    <div className={`fixed right-0 top-0 h-screen z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 -translate-x-full transform bg-white border border-r-0 rounded-l-lg p-3 shadow-md"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Customizer Panel */}
      <div className="w-80 h-full bg-white border-l shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette size={20} className="text-gray-600" />
            <h2 className="font-semibold text-gray-800">Theme Customizer</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Primary Color */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Primary Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.primary.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorChange('primary', color.value)}
                  className={`
                    h-10 rounded-lg border-2 transition-all
                    ${theme.primary === color.value ? 'ring-2 ring-offset-2' : 'hover:scale-105'}
                    bg-${color.value}-500
                  `}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Accent Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.accent.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorChange('accent', color.value)}
                  className={`
                    h-10 rounded-lg border-2 transition-all
                    ${theme.accent === color.value ? 'ring-2 ring-offset-2' : 'hover:scale-105'}
                    bg-${color.value}-500
                  `}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Mode</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleColorChange('mode', 'light')}
                className={`
                  px-4 py-2 rounded-lg border
                  ${theme.mode === 'light' ? 'bg-gray-100 border-gray-300' : 'hover:bg-gray-50'}
                `}
              >
                Light
              </button>
              <button
                onClick={() => handleColorChange('mode', 'dark')}
                className={`
                  px-4 py-2 rounded-lg border
                  ${theme.mode === 'dark' ? 'bg-gray-100 border-gray-300' : 'hover:bg-gray-50'}
                `}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;