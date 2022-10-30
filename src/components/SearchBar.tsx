import { useRef } from 'react';

const SearchBar = () => {
  const searchRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const timeout:  { current: NodeJS.Timeout | null } = useRef(null);
  const handleSubmit = ({target}: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(target.value);
  }

  return (
    <>
      <div>
        <input
          type="text"
          onChange={handleSubmit}
          ref={searchRef}
        />
      </div>
    </>
  )
}

export { SearchBar }