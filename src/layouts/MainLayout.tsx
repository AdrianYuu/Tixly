import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import IChildren from '../interfaces/IChildren';

function MainLayout({ children }: IChildren) {
  return (
    <div className="bg-customBlack">
      <Navbar />
      <div className="min-h-screen w-full">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
