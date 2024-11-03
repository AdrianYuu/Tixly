import CalendarImage from '../../assets/images/calendar-icon.png';
import DateImage from '../../assets/images/date-icon.png';
import ImageIcon from '../../assets/images/image-icon.png';

interface IProps {
  name: string;
  type: 'input' | 'textarea' | 'file';
  placeholder?: string;
  inputType?: string;
  nameColor?: string;
  onChange: (value: string | File) => void;
}

function FormInput({
  name,
  type = 'input',
  placeholder,
  inputType,
  nameColor,
  onChange,
}: IProps) {
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      if (type === 'file' && target.files?.[0]) {
        onChange(target.files?.[0]);
        return;
      }

      onChange(target.value);
    } else if (target instanceof HTMLTextAreaElement) {
      onChange(target.value);
    }
  }

  return (
    <>
      {type == 'file' ? (
        <div className="w-full flex flex-col gap-3 relative ">
          <label
            htmlFor={name}
            className={`text-sm font-semibold ${nameColor}`}
          >
            {name}
          </label>
          <label
            htmlFor={name}
            className='w-full cursor-pointer flex justify-center items-center h-[14.5rem] outline-dashed outline-customPlaceHolder bg-customDarkGreyV2 rounded-3xl text-sm font-medium ps-6 pe-7 z-0 placeholder:text-customPlaceHolder"'
          >
            <div className="flex justify-center items-center flex-col gap-2">
              <img src={ImageIcon} className="w-8 h-8" />
              <p className="text-center text-customPlaceHolder">Image</p>
            </div>
            <input
              id={name}
              type="file"
              className="hidden w-full"
              onChange={handleChange}
            />
          </label>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 relative">
          <label
            htmlFor={name}
            className={`text-sm font-semibold ${nameColor}`}
          >
            {name}
          </label>

          {/* Input */}
          {type == 'input' && (
            <input
              id={name}
              type={inputType}
              placeholder={placeholder}
              className="relative w-full rounded-full bg-customDarkGreyV2 text-sm font-medium h-12 ps-6 pe-7 z-0 placeholder:text-customPlaceHolder"
              onChange={handleChange}
            />
          )}

          {/* TextArea */}
          {type == 'textarea' && (
            <textarea
              id={name}
              placeholder={placeholder}
              className="w-full resize-none rounded-3xl bg-customDarkGreyV2 text-sm font-medium h-60 p-4 z-0 placeholder:text-customPlaceHolder"
              onChange={handleChange}
            />
          )}

          {/* Date */}
          {inputType == 'date' && (
            <img
              id={name}
              src={CalendarImage}
              alt=""
              className="w-6 h-6 absolute right-6 bottom-3"
            />
          )}

          {/* Time */}
          {inputType == 'time' && (
            <img
              id={name}
              src={DateImage}
              alt=""
              className="w-6 h-6 absolute right-6 bottom-3"
            />
          )}
        </div>
      )}
    </>
  );
}

export default FormInput;
