import { createContext, useContext, ReactNode } from 'react';
import TodoApiClient from '../api';

const ApiContext = createContext<TodoApiClient | null>(null);

export default function ApiProvider({ children }: { children: ReactNode }) {
  const api = new TodoApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with ApiProvider"
    );
  }
  return context
}