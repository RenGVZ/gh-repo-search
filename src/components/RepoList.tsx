import { useRepoContext } from "../context/repoContext";

interface RepoProps {
  id?: number;
  name: string;
  owner: {
    login: string;
  };
}

const Repo = ({name, owner}: RepoProps) => {
  return (
    <>
      <h1>{name}</h1>
      <h2>{owner.login}</h2>
    </>
  )
}

const RepoList = () => {
  const { repos } = useRepoContext();
  console.log('repos in repolist:', repos);

  return (
    <>
      <div className="repos-list">
        {repos.length > 0 && (
          repos.map((repo: RepoProps) => (
            <Repo key={repo.id} name={repo.name} owner={repo.owner}/>
          ))
        )}
      </div>
    </>
  )
}

export { RepoList }