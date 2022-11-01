import { createContext, useContext } from "react";

export type QueryContent = {
  query: string;
  setQuery: (q: string) => void;
  currentPage: number;
  setCurrentPage: (cp: number) => void;
};

export const QueryContext = createContext<QueryContent>({
  query: '',
  setQuery: () => {},
  currentPage: 1,
  setCurrentPage: () => {}
});

export const useQueryContext = () => useContext(QueryContext);