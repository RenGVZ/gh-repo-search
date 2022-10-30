import { useState } from 'react';
import { RepoContext, IndividualRepo } from './context/repoContext';
import Wrapper from './components/Wrapper';
import { SearchBar } from './components/SearchBar';
import { RepoList } from './components/RepoList';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState<IndividualRepo>([])
  return (
    <RepoContext.Provider value={{ repos, setRepos }}>
      <Wrapper>
        <SearchBar />
        <RepoList />
      </Wrapper>
    </RepoContext.Provider>
  );
}

export default App;
