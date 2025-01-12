import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, CheckCircle2, Circle, Plus, X, Calendar } from 'lucide-react';
import type { Goal, Task } from '../types';

interface GoalsTabProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  onToggleTask: (goalId: string, taskId: string) => void;
}

interface NewGoalForm {
  title: string;
  description: string;
  specific: string;
  measurable: string;
  attainable: string;
  relevant: string;
  timeBound: string;
}

interface NewTaskForm {
  title: string;
  dueDate: string;
}

const initialNewGoal: NewGoalForm = {
  title: '',
  description: '',
  specific: '',
  measurable: '',
  attainable: '',
  relevant: '',
  timeBound: ''
};

const initialNewTask: NewTaskForm = {
  title: '',
  dueDate: ''
};

export function GoalsTab({ goals, setGoals, onToggleTask }: GoalsTabProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState<NewGoalForm>(initialNewGoal);
  const [newTask, setNewTask] = useState<NewTaskForm>(initialNewTask);
  const [addingTaskForGoal, setAddingTaskForGoal] = useState<string | null>(null);

  const toggleGoal = (goalId: string) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  const handleNewGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      timeBound: new Date(newGoal.timeBound).toISOString(),
      tasks: [],
      progress: 0
    };
    setGoals([...goals, goal]);
    setNewGoal(initialNewGoal);
    setShowNewGoalForm(false);
    setExpandedGoal(goal.id);
  };

  const addTaskToGoal = (goalId: string) => {
    if (!newTask.title.trim()) return;

    setGoals(prevGoals =>
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const newTaskObj: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            type: 'actionable',
            status: 'task',
            created: new Date().toISOString(),
            completed: false,
            dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : undefined
          };
          return {
            ...goal,
            tasks: [...goal.tasks, newTaskObj]
          };
        }
        return goal;
      })
    );
    setNewTask(initialNewTask);
    setAddingTaskForGoal(null);
  };

  // Rest of the component remains the same until the task list rendering

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Previous JSX remains the same until the tasks section */}
      
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Goal header remains the same */}
            
            {expandedGoal === goal.id && (
              <div className="border-t border-gray-200 p-4">
                {/* SMART criteria section remains the same */}

                <div className="mb-4">
                  <h4 className="font-medium mb-3">Tasks</h4>
                  <div className="space-y-2">
                    {goal.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTask(goal.id, task.id);
                        }}
                      >
                        <button className="focus:outline-none">
                          {task.completed ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500" /> :
                            <Circle className="h-5 w-5 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.title}
                          </span>
                          {task.dueDate && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {addingTaskForGoal === goal.id ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Enter task title..."
                        className="px-3 py-2 border rounded-lg text-sm"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <input
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addTaskToGoal(goal.id)}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                        >
                          Add Task
                        </button>
                        <button
                          onClick={() => {
                            setAddingTaskForGoal(null);
                            setNewTask(initialNewTask);
                          }}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddingTaskForGoal(goal.id);
                      }}
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mt-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Task
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}