import Navbar from '../components/Navbar';
import IChildren from '../interfaces/IChildren';

function MainLayout({ children }: IChildren) {
  return (
    <div className="bg-customBlack">
      <Navbar />
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
