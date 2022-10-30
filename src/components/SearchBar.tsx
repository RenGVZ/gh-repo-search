import { useRef } from 'react';
import { getReposApi } from '../apis/ghRepos';

const SearchBar = () => {
  const searchRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  // const timeout: { current: NodeJS.Timeout | null } = useRef(null);

  const handleChange =  ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery: string = target.value.toLowerCase();
    const results = getReposApi({searchQuery});
  }

  return (
    <>
      <div>
        <input
          type="text"
          onChange={handleChange}
          ref={searchRef}
        />
      </div>
    </>
  )
}

export { SearchBar }