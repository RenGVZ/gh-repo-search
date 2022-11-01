import { useState, useRef } from "react";
import { getReposApi } from "../apis/ghRepos";
import { useQueryContext } from "../context/queryContext";
import { useRepoContext } from "../context/repoContext";
import ErrorBar from "./ErrorBar";

const Pagination = () => {
  const { query, currentPage, setCurrentPage } = useQueryContext();
  const { repos, setRepos, totalCount } = useRepoContext();
  const isThrottling = useRef(false);
  const [errors, setErrors] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePrevious = async () => {
    if(isThrottling.current) {
      return;
    };
    isThrottling.current = true;
    setTimeout(async () => {
      const res: any = await getReposApi({query: query, page_number: currentPage - 1});
      isThrottling.current = true;
      if(res?.data?.items) {
        console.log('success in pagination:', res);
        const fetchedRepos = res.data.items;
        setCurrentPage(currentPage - 1);
        setRepos(() => fetchedRepos);
        isThrottling.current = false;
      } else {
        setErrors(true);
        let message: any = res?.response?.data?.message;
        if(message) {
          console.log('specific error message:', message);
          setErrorMessage(message);
        } else {
          console.log('error in pagination:', res);
          setErrorMessage('Please slow down');
        }
      }
    }, 500)
  }

  const handleNext = async () => {
    if(isThrottling.current) {
      return;
    };
    isThrottling.current = true;
    setTimeout(async () => {
      const res: any = await getReposApi({query: query, page_number: currentPage + 1});
      if(res?.data?.items) {
        console.log('success in pagination:', res);
        const fetchedRepos = res.data.items;
        setCurrentPage(currentPage + 1);
        setRepos(() => fetchedRepos);
        isThrottling.current = false;
      } else {
        setErrors(true);
        isThrottling.current = false;
        let message: any = res?.response?.data?.message;
        if(message) {
          console.log('specific error message:', message);
          setErrorMessage(message);
        } else {
          console.log('error in pagination:', res);
          setErrorMessage('Please slow down');
        }
      }
    }, 500)
  }

  return (
    <>
      {errors && (
        <div className="pagination-error">
          <ErrorBar message={errorMessage}/>
        </div>
      )}
      {repos.length > 0 &&
        <div className="pagination-container">
          <button
            className="pagination-control"
            type="button"
            onClick={handlePrevious}
            disabled={currentPage <= 1 || errors }
          >
            Previous
          </button>
          <h1>{currentPage}</h1>
          <button
            className="pagination-control"
            type="button"
            onClick={handleNext}
            disabled={totalCount <= 5 || errors }
          >
            Next
          </button>
        </div>
      }
    </>
  )
}

export { Pagination }