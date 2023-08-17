"use client";

import { createContext, useContext } from "react";
import { useDatabase } from "@/db/useDatabase";

type DatabaseContextType = ReturnType<typeof useDatabase>;

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseContextProvider(props: { children: React.ReactNode }) {
  const initialValue = useDatabase();

  return (
    <DatabaseContext.Provider value={initialValue}>
      {props.children}
    </DatabaseContext.Provider>
  );
}

export function useDatabaseContext() {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error(
      "useDatabaseContext must be used within a DatabaseContextProvider"
    );
  }

  return context;
}
