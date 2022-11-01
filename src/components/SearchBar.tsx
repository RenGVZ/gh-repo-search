import { useState, useRef, useEffect } from 'react';
import { getReposApi } from '../apis/ghRepos';
import { useRepoContext } from '../context/repoContext';
import { useQueryContext } from '../context/queryContext';
import ErrorBar from './ErrorBar';

const SearchBar = () => {
  const { setRepos, setTotalCount } = useRepoContext();
  const { setQuery, setCurrentPage } = useQueryContext();
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
    // throttling data for 300ms here to prevent overuse of api
    setTimeout(async () => {
      isThrottling.current = false;
      setQuery(searchQuery);
      setCurrentPage(1);
      const res: any = await getReposApi({query: searchQuery, page_number: 1});
      if(res?.data?.items) {
        console.log('success in search:', res);
        setTotalCount(res.data.total_count)
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

  // clear error message after 6 seconds
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
          <div className="searchbar-error">
            <ErrorBar message={errorMessage} />
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