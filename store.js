import create from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store
const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo:(id, newText)=>
        set((state)=>({
            todos: state.todos.map((todo)=>
            todo.id===id? {...todo, text:newText}:todo
            ),
        }))
    }),
    {
      name: 'todo-storage', // storage key'i
    }
  )
);

export default useTodoStore;
