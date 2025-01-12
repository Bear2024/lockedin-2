import React from 'react';
import { Inbox, Calendar, Target, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'inbox', icon: Inbox, label: 'Inbox' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'circle', icon: Users, label: 'My Circle' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center px-3 py-4 text-sm font-medium ${
                activeTab === id
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}