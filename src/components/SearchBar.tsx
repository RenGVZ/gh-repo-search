import { useState, useRef, useEffect } from 'react';
import { getReposApi } from '../apis/ghRepos';
import { useRepoContext } from '../context/repoContext';

const SearchBar = () => {
  const { setRepos } = useRepoContext();
  const searchRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const isThrottling = useRef(false);
  const [errors, setErrors] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery: string = target.value.toLowerCase();
    if(isThrottling.current) {
      return;
    };

    if(!searchRef.current?.value.trim()) {
      setRepos(() => []);
      return;
    }
    isThrottling.current = true;
    setTimeout(async () => {
      isThrottling.current = false;
      const res: any = await getReposApi({query: searchQuery});
      if(res?.data?.items) {
        console.log('success in search:', res);
        const fetchedRepos = res.data.items;
        setRepos(() => fetchedRepos);
      } else {
        setErrors(true);
        let message: any = res?.response?.data?.message;
        if(message) {
          console.log('specific error message:', message);
          setErrorMessage(message);
        } else {
          console.log('error in search:', res);
          setErrorMessage('error in search:');
        }
      }
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setErrors(false)
      setErrorMessage('');
    }, 6000)
  }, [errorMessage])

  return (
    <>
      <div className="search-bar-container">
        {errors && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        <input
          type="text"
          onChange={handleChange}
          ref={searchRef}
          placeholder="Search for any GitHub repository..."
        />
      </div>
    </>
  )
}

export { SearchBar }