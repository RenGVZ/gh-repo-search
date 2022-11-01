import { createContext, useContext } from "react";

export interface IndividualRepo {
  [key: string]: any;
}

export type RepoContent = {
  repos: IndividualRepo,
  setRepos: (repo: IndividualRepo) => void,
  totalCount: number,
  setTotalCount: (tc: number) => void
};

export const RepoContext = createContext<RepoContent>({
  repos: [],
  setRepos: () => {},
  totalCount: 0,
  setTotalCount: () => {}
});

export const useRepoContext = () => useContext(RepoContext);