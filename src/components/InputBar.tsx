import { useState } from 'react';
import Button from './Button';

interface IProps {
  placeholder?: string;
  buttonText?: string;
  haveIcon?: boolean;
  iconUrl?: string;
  onSubmit: (query: string) => void;
}

function InputBar({
  placeholder = '...',
  buttonText = 'Search',
  haveIcon = false,
  iconUrl,
  onSubmit,
}: IProps) {
  const [input, setInput] = useState<string>('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleButtonClick() {
    onSubmit(input);
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:relative">
      {haveIcon ? (
        <>
          <div className="flex items-center absolute left-5 top-6">
            <img src={iconUrl} alt="" />
          </div>
          <input
            type="text"
            className="outline-none bg-customDarkGrey px-5 py-4 md:pe-36 w-full rounded-full"
            placeholder={placeholder}
            value={input}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <div className="w-full flex relative">
            <input
              type="text"
              className="outline-none bg-customDarkGrey px-5 py-4 md:pe-36 w-full rounded-full"
              placeholder={placeholder}
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      <Button
        text={buttonText}
        className="px-6 py-4 sm:absolute sm:right-0 md:px-10"
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default InputBar;
