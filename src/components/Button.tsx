interface IProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  disabledState?: boolean;
}

function Button({ text = 'Button', className, onClick, disabledState }: IProps) {
  return (
    <button
      className={`text-customWhite font-medium rounded-full bg-gradient-to-r from-customLightPurple to-customDarkPurple 
                  transition-all duration-300 hover:from-customDarkPurple hover:to-customLightPurple ${className}`}
      onClick={!disabledState ? onClick : undefined}
      disabled={disabledState}
    >
      {text}
    </button>
  );
}

export default Button;
