import { useState } from 'react';
import { RepoContext, IndividualRepo } from './context/repoContext';
import { QueryContext } from './context/queryContext';
import Wrapper from './components/Wrapper';
import { SearchBar } from './components/SearchBar';
import { RepoList } from './components/RepoList';
import { Pagination } from './components/Pagination';
import './App.scss';

const App = () => {
  const [query, setQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [repos, setRepos] = useState<IndividualRepo>([])
  return (
    <QueryContext.Provider value={{ query, setQuery, currentPage, setCurrentPage }}>
      <RepoContext.Provider value={{ repos, setRepos, totalCount, setTotalCount }}>
        <Wrapper>
          <SearchBar />
          <RepoList />
          <Pagination />
        </Wrapper>
      </RepoContext.Provider>
    </QueryContext.Provider>
  );
}

export default App;
