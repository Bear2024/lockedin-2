import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { InboxTab } from './components/InboxTab';
import { CalendarTab } from './components/CalendarTab';
import { GoalsTab } from './components/GoalsTab';
import { CircleTab } from './components/CircleTab';
import type { Task, Goal } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [
      {
        id: '1',
        title: 'Launch MVP Product',
        description: 'Complete and launch the minimum viable product for our new service',
        specific: 'Develop and release core features of the product',
        measurable: 'Complete all critical features and pass QA testing',
        attainable: 'Team has necessary resources and skills',
        relevant: 'Aligns with company growth strategy',
        timeBound: new Date('2024-04-30').toISOString(),
        tasks: [
          { id: 't1', title: 'Design System Implementation', type: 'actionable', status: 'task', created: new Date().toISOString(), completed: false },
          { id: 't2', title: 'Core Features Development', type: 'actionable', status: 'task', created: new Date().toISOString(), completed: false },
          { id: 't3', title: 'User Testing', type: 'actionable', status: 'task', created: new Date().toISOString(), completed: false }
        ],
        progress: 0
      }
    ];
  });

  const [scheduledTasks, setScheduledTasks] = useState(() => {
    const saved = localStorage.getItem('scheduledTasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('scheduledTasks', JSON.stringify(scheduledTasks));
  }, [scheduledTasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: text,
      type: 'actionable',
      status: 'task',
      created: new Date().toISOString(),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setScheduledTasks(scheduledTasks.filter(task => task.id !== taskId));
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? updatedTask : task
    ));
  };

  const updateGoalProgress = (goalId: string) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const completedTasks = goal.tasks.filter(task => task.completed).length;
          const totalTasks = goal.tasks.length;
          const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
          return { ...goal, progress };
        }
        return goal;
      })
    );
  };

  const toggleTaskCompletion = (goalId: string, taskId: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedTasks = goal.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          return { ...goal, tasks: updatedTasks };
        }
        return goal;
      })
    );
    updateGoalProgress(goalId);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'inbox':
        return <InboxTab onAddTask={addTask} />;
      case 'calendar':
        return (
          <CalendarTab 
            tasks={tasks} 
            goals={goals}
            onRemoveTask={removeTask}
            onUpdateTask={updateTask}
            scheduledTasks={scheduledTasks}
            setScheduledTasks={setScheduledTasks}
          />
        );
      case 'goals':
        return (
          <GoalsTab 
            goals={goals} 
            setGoals={setGoals}
            onToggleTask={toggleTaskCompletion}
          />
        );
      case 'circle':
        return <CircleTab />;
      default:
        return <div>Tab content coming soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto py-6">
        {renderTab()}
      </main>
    </div>
  );
}