import { useState } from 'react';
import { RepoContext } from './context/repoContext';
import Wrapper from './components/Wrapper';
import { SearchBar } from './components/SearchBar';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState<[]>([])
  return (
    <RepoContext.Provider value={{ repos, setRepos}}>
      <Wrapper>
        <SearchBar />
      </Wrapper>
    </RepoContext.Provider>
  );
}

export default App;
