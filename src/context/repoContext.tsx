import { createContext, useContext } from "react";

export interface IndividualRepo {
  [key: string]: any;
}

export type RepoContent = {
  repos: IndividualRepo
  setRepos: (repo: IndividualRepo) => void
};

export const RepoContext = createContext<RepoContent>({
  repos: [],
  setRepos: () => {}
});

export const useRepoContext = () => useContext(RepoContext);