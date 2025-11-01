import React, { useState } from "react";
import {
  Settings,
  User,
  Lock,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [fullName, setFullName] = useState("tujhse matlab");
  const [callName, setCallName] = useState("tujhse matlab");
  const [workFunction, setWorkFunction] = useState("");
  const [preferences, setPreferences] = useState(
    "e.g. ask clarifying questions before giving detailed answers"
  );
  const [notifications, setNotifications] = useState(true);
  const [colorMode, setColorMode] = useState("light");

  const menuItems = [
    { id: "general", label: "General", icon: Settings },
    { id: "account", label: "Account", icon: User },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  TM
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What should Rashtram call you?
              </label>
              <input
                type="text"
                value={callName}
                onChange={(e) => setCallName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What best describes your work?
              </label>
              <select
                value={workFunction}
                onChange={(e) => setWorkFunction(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="">Select your work function</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="product">Product Management</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="research">Research</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What personal preferences should Rashtram consider in responses?
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Your preferences will apply to all conversations, within
                Anthropic's guidelines.{" "}
                <span className="text-red-800 underline cursor-pointer">
                  Learn about preferences
                </span>
              </p>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="tujhse@matlab.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue="tujhse_matlab"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-800 transition">
                  Update Account
                </button>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button className="px-6 py-2 border-2 border-red-800 text-red-800 rounded-lg hover:bg-red-50 transition">
                Delete Account
              </button>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Share usage data</h4>
                    <p className="text-sm text-gray-600">
                      Help improve Rashtram by sharing anonymized usage data
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Conversation history</h4>
                    <p className="text-sm text-gray-600">
                      Save your conversation history for future reference
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Training data opt-out</h4>
                    <p className="text-sm text-gray-600">
                      Opt out of having your conversations used for training
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscription Plan</h3>
              <div className="p-6 border-2 border-red-800 rounded-lg bg-red-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold">Pro Plan</h4>
                    <p className="text-gray-600">$20/month</p>
                  </div>
                  <span className="px-3 py-1 bg-red-800 text-white rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Next billing date: November 21, 2025
                </p>
                <button className="px-6 py-2 border-2 border-red-800 text-red-800 rounded-lg hover:bg-white transition">
                  Manage Subscription
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/2026</p>
                  </div>
                </div>
                <button className="text-red-800 font-medium hover:underline">
                  Edit
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing History</h3>
              <div className="space-y-2">
                {["October 2025", "September 2025", "August 2025"].map(
                  (month, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{month}</p>
                        <p className="text-sm text-gray-600">$20.00</p>
                      </div>
                      <button className="text-red-800 font-medium hover:underline">
                        Download
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Response completions</h4>
                    <p className="text-sm text-gray-600">
                      Get notified when Rashtram has finished a response. Most
                      useful for long-running tasks like tool calls and
                      Research.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Email notifications</h4>
                    <p className="text-sm text-gray-600">
                      Receive important updates and announcements via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Product updates</h4>
                    <p className="text-sm text-gray-600">
                      Get notified about new features and improvements
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "capabilities":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Feature Capabilities
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Web Search</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Allow Rashtram to search the web for up-to-date information
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Code Execution</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Enable Rashtram to run code and analyze data
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">File Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Allow Rashtram to analyze uploaded files and documents
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Update your password to keep your account secure
                  </p>
                  <button className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-800 transition">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-factor authentication</h4>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Active Sessions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage devices where you're currently logged in
                  </p>
                  <button className="text-red-800 font-medium hover:underline">
                    View Active Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-red-800 transition"
                >
                  <h4 className="font-medium mb-1">Documentation</h4>
                  <p className="text-sm text-gray-600">
                    Browse our comprehensive guides and tutorials
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-red-800 transition"
                >
                  <h4 className="font-medium mb-1">API Documentation</h4>
                  <p className="text-sm text-gray-600">
                    Learn how to integrate Rashtram into your applications
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-red-800 transition"
                >
                  <h4 className="font-medium mb-1">Contact Support</h4>
                  <p className="text-sm text-gray-600">
                    Get help from our support team
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-red-800 transition"
                >
                  <h4 className="font-medium mb-1">Community Forum</h4>
                  <p className="text-sm text-gray-600">
                    Connect with other Rashtram users
                  </p>
                </a>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Version:</strong> Rashtram Sonnet 4.5
                </p>
                <p>
                  <strong>Release Date:</strong> September 29, 2024
                </p>
                <p>
                  <strong>Terms of Service:</strong>{" "}
                  <a href="#" className="text-red-800 hover:underline">
                    Read here
                  </a>
                </p>
                <p>
                  <strong>Privacy Policy:</strong>{" "}
                  <a href="#" className="text-red-800 hover:underline">
                    Read here
                  </a>
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Settings</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-red-800 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
