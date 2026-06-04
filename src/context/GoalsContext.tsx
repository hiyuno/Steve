import React, { createContext, useContext, useReducer } from 'react';

export type Board = 'week' | 'month' | 'year';

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  board: Board;
  createdAt: number;
}

interface State {
  goals: Goal[];
}

type Action =
  | { type: 'ADD_GOAL'; payload: { text: string; board: Board } }
  | { type: 'TOGGLE_GOAL'; payload: { id: string } }
  | { type: 'DELETE_GOAL'; payload: { id: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [
          ...state.goals,
          {
            id: Date.now().toString(),
            text: action.payload.text,
            completed: false,
            board: action.payload.board,
            createdAt: Date.now(),
          },
        ],
      };
    case 'TOGGLE_GOAL':
      return {
        ...state,
        goals: state.goals.map(g =>
          g.id === action.payload.id ? { ...g, completed: !g.completed } : g
        ),
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(g => g.id !== action.payload.id),
      };
    default:
      return state;
  }
}

const GoalsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { goals: [] });
  return (
    <GoalsContext.Provider value={{ state, dispatch }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const ctx = useContext(GoalsContext);
  if (!ctx) throw new Error('useGoals must be used within GoalsProvider');
  return ctx;
}
