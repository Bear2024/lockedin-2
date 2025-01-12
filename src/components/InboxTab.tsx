import React, { useState } from 'react';
import { Trash2, Archive, CheckSquare, Square } from 'lucide-react';

interface InboxTabProps {
  onAddTask: (text: string) => void;
}

export function InboxTab({ onAddTask }: InboxTabProps) {
  const [thoughts, setThoughts] = useState<string>('');
  const [items, setItems] = useState<Array<{id: string; text: string; actionable: boolean}>>([]);

  const addThought = () => {
    if (!thoughts.trim()) return;
    
    const newItem = { id: Date.now().toString(), text: thoughts, actionable: false };
    setItems([...items, newItem]);
    
    // If it's actionable, also add it to tasks
    if (newItem.actionable) {
      onAddTask(thoughts);
    }
    
    setThoughts('');
  };

  const toggleActionable = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, actionable: !item.actionable };
        if (newItem.actionable) {
          onAddTask(item.text);
        }
        return newItem;
      }
      return item;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Capture Thoughts</h2>
        <div className="flex gap-4">
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            className="flex-1 p-3 border rounded-lg resize-none h-32"
            placeholder="Write down your thoughts..."
          />
          <button
            onClick={addThought}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
            <button onClick={() => toggleActionable(item.id)}>
              {item.actionable ? 
                <CheckSquare className="h-6 w-6 text-indigo-600" /> : 
                <Square className="h-6 w-6 text-gray-400" />}
            </button>
            <p className="flex-1">{item.text}</p>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Archive className="h-5 w-5 text-gray-500" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setItems(items.filter(i => i.id !== item.id))}
              >
                <Trash2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}