import { useState } from 'react';
import { RepoContext, IndividualRepo } from './context/repoContext';
import { QueryContext } from './context/queryContext';
import Wrapper from './components/Wrapper';
import { SearchBar } from './components/SearchBar';
import { RepoList } from './components/RepoList';
import './App.scss';

const App = () => {
  const [query, setQuery] = useState<string>('')
  const [repos, setRepos] = useState<IndividualRepo>([])
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <RepoContext.Provider value={{ repos, setRepos }}>
        <Wrapper>
          <SearchBar />
          <RepoList />
        </Wrapper>
      </RepoContext.Provider>
    </QueryContext.Provider>
  );
}

export default App;
