import { create } from 'zustand';

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} name
 * @property {'high' | 'medium' | 'low'} priority
 */

/**
 * @typedef {Object} TaskState
 * @property {Task[]} tasks
 * @property {(task: Omit<Task, 'id'>) => void} addTask
 * @property {(id: string) => void} removeTask
 */



// src/lib/store.ts
// import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, { ...task, id: Date.now() }] 
  })),
  removeTask: (id) => set((state) => ({ 
    tasks: state.tasks.filter((t) => t.id !== id) 
  })),
}));