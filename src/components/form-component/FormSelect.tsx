import ArrowDropdownImage from '../../assets/images/arrow-dropdown.png';

interface IProps {
  name: string;
  options: string[];
  nameColor?: string;
  onChange: (value: string) => void;
}

function FormSelect({ name, options, nameColor, onChange }: IProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <label htmlFor={name} className={`text-sm font-semibold ${nameColor}`}>
        {name}
      </label>
      <select
        id={name}
        className="appearance-none relative w-full rounded-full bg-customDarkGreyV2 text-sm font-medium h-12 ps-6 pe-7 placeholder:text-customPlaceHolder"
        onChange={handleChange}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <img
        id={name}
        src={ArrowDropdownImage}
        alt=""
        className="w-6 h-6 absolute right-6 bottom-3"
      />
    </div>
  );
}

export default FormSelect;
