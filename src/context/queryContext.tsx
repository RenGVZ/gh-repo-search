import { createContext, useContext } from "react";

export type QueryContent = {
  query: string;
  setQuery: (q: string) => void
};

export const QueryContext = createContext<QueryContent>({
  query: '',
  setQuery: () => {}
});

export const useQueryContext = () => useContext(QueryContext);