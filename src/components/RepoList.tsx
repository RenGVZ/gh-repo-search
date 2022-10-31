import { useRepoContext } from "../context/repoContext";

interface RepoProps {
  id?: number;
  name: string;
  owner: {
    login: string;
    avatar_url?: string;
    html_url: string;
  };
  description?: string;
  created_at: string;
  forks_count?: number;
  language?: string;
  svn_url: string;
  watchers?: number;
}

const Repo = ({
  id, name, owner, description, created_at, forks_count, language, svn_url, watchers
}: RepoProps) => {
  return (
    <>
    <div className="repo-item">
      <div className="top">
        <a href={svn_url} className="name-wrapper">
          <h1 className="name">{name}</h1>
        </a>
        <a href={owner.html_url} className="owner">
          <p>{owner.login}</p>
          <img src={owner.avatar_url} alt="" />
        </a>
      </div>
      <div className="mid">
        <p>{description}</p>
        <div>
          <p>Language: {language}</p>
          <p>Stars: {watchers}</p>
        </div>
      </div>
      <div className="bottom">
        <p className="created">Created: {created_at.slice(0, 10)}</p>
      </div>
    </div>
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
            <Repo
              key={repo.id}
              name={repo.name}
              owner={repo.owner}
              description={repo.description}
              created_at={repo.created_at}
              forks_count={repo.forks_count}
              language={repo.language}
              svn_url={repo.svn_url}
              watchers={repo.watchers}
            />
          ))
        )}
      </div>
    </>
  )
}

export { RepoList }