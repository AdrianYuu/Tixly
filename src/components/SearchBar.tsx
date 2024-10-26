import { useState } from 'react';
import Button from './Button';

interface IProps {
  placeholder?: string;
  buttonText?: string;
  onSearch: (query: string) => void;
}

function SearchBar({
  placeholder = '...',
  buttonText = 'Search',
  onSearch,
}: IProps) {
  const [query, setQuery] = useState<string>('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleButtonClick() {
    onSearch(query);
  }

  return (
    <div className="w-full flex relative">
      <input
        type="text"
        className="outline-none bg-customDarkGrey ps-5 pe-36 py-4 w-full rounded-full"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <Button
        text={buttonText}
        className="px-12 absolute right-0"
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default SearchBar;
