interface IProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  disabledState?: boolean;
}

function ButtonV2({ text = 'Button', className, onClick, disabledState }: IProps) {
  return (
    <button
      className={`border border-white py-2 rounded-full font-medium hover:bg-gray-700 ${className}`}
      onClick={!disabledState ? onClick : undefined}
      disabled={disabledState}
    >
      {text}
    </button>
  );
}

export default ButtonV2;
