import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { BellIcon as OutlineBellIcon } from '@heroicons/react/24/outline';
import {
  BellIcon as SolidBellIcon,
  UserIcon,
  WalletIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/solid';
import { useUserContext } from '../contexts/UserContext';
import Button from './Button';
import { NAVBAR_ROUTES } from '../configs/NavbarRouteConfig';

function Navbar() {
  const { user } = useUserContext();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  return (
    <nav className="py-6 flex justify-between px-8 xl:justify-around items-center w-full sticky top-0 bg-customBlack z-50 ">
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
        {NAVBAR_ROUTES.filter((route) => !route.dropdownProperty).map(
          (route, index) => (
            <NavLink
              key={index}
              to={route.path}
              className={({ isActive }) =>
                `text-customWhite cursor-pointer text-base hover:underline underline-offset-8 ${
                  isActive ? 'font-semibold' : 'opacity-50'
                }`
              }
            >
              {route.name}
            </NavLink>
          ),
        )}
      </div>

      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <NavLink to={'/notification'}>
              {({ isActive }) =>
                isActive ? (
                  <SolidBellIcon className="w-6 h-6 text-customLightPurple" />
                ) : (
                  <OutlineBellIcon className="w-6 h-6 text-customLightGrey" />
                )
              }
            </NavLink>
            <div
              className="flex items-center justify-center w-10 h-10 bg-customDarkGrey rounded-full cursor-pointer"
              onClick={toggleDropdown}
            >
              <UserIcon className="w-6 h-6 text-customLightPurple cursor-pointer" />

              {isDropdownOpen && (
                <div className="absolute w-56 right-10 lg:right-48 mt-48 bg-customBlack bg-opacity-70 shadow-lg rounded-xl transition-transform duration-300 ease-in-out transform">
                  <NavLink
                    to="/my-wallet"
                    className="block text-customWhite border-b border-b-customWhite px-2 py-3"
                  >
                    <div className="flex gap-2 items-center">
                      <WalletIcon className='w-6 h-6'/>
                      <p>My Wallet</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block text-customWhite py-2 border-b border-b-customWhite px-2"
                  >
                    <div className='flex gap-2 items-center'>
                      <HeartIcon className='w-6 h-6'/>
                      <p>My Wishlist</p>
                    </div>
                    
                  </NavLink>
                  <button
                    className="block text-customWhite py-2  px-2"
                    onClick={() => {
                      
                    }}
                  >
                    <div className='flex gap-2 items-center text-customLightRed'>
                      <ArrowLeftStartOnRectangleIcon className='w-6 h-6'/>
                      <p>Logout</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Button
            text="Login with Internet Identity"
            className="truncate px-5 py-4"
          />
        )}
      </div>

      {/* Dropdown Navbar */}
      <div
        className={`absolute top-20 bg-customBlack ps-20 left-0 w-full pb-6 shadow-lg rounded-lg p-2 xl:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'bg-opacity-70 translate-y-0' : 'opacity-0 -translate-y-4'
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
