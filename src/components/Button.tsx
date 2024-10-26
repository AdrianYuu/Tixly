interface IProps {
  className?: string;
  text?: string;
  onClick?: () => void;
}

function Button({ text = 'Button', className, onClick }: IProps) {
  return (
    <button
      className={`text-customWhite font-medium rounded-full bg-gradient-to-r from-customLightPurple to-customDarkPurple 
                  transition-all duration-300 hover:from-customDarkPurple hover:to-customLightPurple ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
