import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import Button from './Button';
import NAVBAR_ROUTES from '../configs/NavbarRouteConfig';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setOpen] = useState<boolean>(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <nav className="py-6 flex justify-between px-20 xl:justify-around items-center w-full sticky top-0 bg-customBlack z-50 opacity-90">
      <div className="flex items-center gap-6">
        <div className="block xl:hidden">
          <button onClick={toggleOpen}>
            <FiMenu size={30} color="white" />
          </button>
        </div>
        <Icon className="w-26 h-12 sm:block hidden" />
      </div>
      {/* Normal Navbar */}
      <div className="justify-center gap-20 hidden xl:flex">
        {NAVBAR_ROUTES.map((route, index) => (
          <NavLink
            key={index}
            to={route.path}
            className={({ isActive }) =>
              `text-customWhite text-base hover:underline underline-offset-8 ${
                isActive ? 'font-semibold' : 'opacity-50'
              }`
            }
          >
            {route.name}
          </NavLink>
        ))}
      </div>
      <Button
        text="Login with Internet Identity"
        className="truncate px-5 py-4"
      />
      {/* Dropdown Navbar */}
      <div
        className={`absolute top-24 bg-customBlack ps-20 left-0 w-full pb-6 shadow-lg rounded-lg p-2 xl:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {isOpen &&
          NAVBAR_ROUTES.map((route, index) => (
            <NavLink
              key={index}
              to={route.path}
              className={({ isActive }) =>
                `text-customWhite block py-2 hover:underline underline-offset-8 text-lg ${
                  isActive ? 'font-semibold' : 'opacity-50'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {route.name}
            </NavLink>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
