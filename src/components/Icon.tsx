import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/tixly_logo.png';

interface IProps {
  className?: string;
}

function Icon({ className }: IProps) {
  return (
    <Link to="/">
      <img src={LogoImage} alt="" className={`${className}`} />
    </Link>
  );
}

export default Icon;
