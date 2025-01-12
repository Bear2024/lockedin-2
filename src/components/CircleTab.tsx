import React from 'react';
import { Users, Trophy, Target, CheckCircle2 } from 'lucide-react';
import type { CircleMember } from '../types';

export function CircleTab() {
  const members: CircleMember[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80',
      completedTasks: 24,
      activeGoals: 3
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80',
      completedTasks: 32,
      activeGoals: 2
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80',
      completedTasks: 18,
      activeGoals: 4
    }
  ];

  const recentActivity = [
    { id: '1', member: 'Sarah Chen', action: 'completed task', item: 'Update documentation', time: '2 hours ago' },
    { id: '2', member: 'Alex Thompson', action: 'achieved goal', item: 'Launch MVP', time: '5 hours ago' },
    { id: '3', member: 'Marcus Rodriguez', action: 'completed task', item: 'Client presentation', time: '1 day ago' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          My Circle
        </h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {members.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600 text-sm">Active Member</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Tasks Completed
                </div>
                <p className="text-2xl font-semibold">{member.completedTasks}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <Target className="h-4 w-4" />
                  Active Goals
                </div>
                <p className="text-2xl font-semibold">{member.activeGoals}</p>
              </div>
            </div>

            <button className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
              View Profile
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-indigo-600" />
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {recentActivity.map((activity, index) => (
            <div 
              key={activity.id}
              className={`p-4 flex items-center justify-between ${
                index !== recentActivity.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div>
                <p className="font-medium">{activity.member}</p>
                <p className="text-sm text-gray-600">
                  {activity.action} "{activity.item}"
                </p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}