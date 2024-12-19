import React from 'react';
import { Save } from 'lucide-react';
import { useSettingsStore } from '../../store/settings';

export default function Settings() {
  const { settings, updateSettings } = useSettingsStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Settings are automatically saved through the store
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Page Customization</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => updateSettings({ companyName: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              type="text"
              value={settings.logoUrl}
              onChange={(e) => updateSettings({ logoUrl: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://your-logo-url.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => updateSettings({ primaryColor: e.target.value })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}