interface IProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  disabledState?: boolean;
  type?: 'purple' | 'transparent';
}

function Button({ text = 'Button', className, onClick, disabledState, type = 'purple' }: IProps) {
  if (type === 'transparent') {
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

  return (
    <button
      className={`text-customWhite font-medium rounded-full bg-gradient-to-r from-customLightPurple to-customDarkPurple 
                  transition-all duration-300 hover:from-customDarkPurple hover:to-customLightPurple ${className} ${disabledState ? 'opacity-30 cursor-not-allowed': ''}`}
      onClick={!disabledState ? onClick : undefined}
      disabled={disabledState}
      type="button"
    >
      {text}
    </button>
  );
}

export default Button;
