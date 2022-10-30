import { createContext, useContext } from "react";

export type RepoContent = {
  repos: []
  setRepos: (r: []) => void
};

export const RepoContext = createContext<RepoContent>({
  repos: [],
  setRepos: () => []
});

export const useRepoContext = () => useContext(RepoContext);