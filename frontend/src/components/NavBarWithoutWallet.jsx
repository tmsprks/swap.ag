import { useState } from 'react';
import { hamburgerMenu, close } from '../assets/';
import { logo } from '../assets/images';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <div className="w-full h-[80px] bg-white border-b">
      <div className="max-w-screen-xl m-auto h-full flex justify-between items-center md:px-0 px-4">
        <div>
          <a href="https://swap.ag/" className="flex items-center">
            <img
              src={logo}
              className="h-[56px] mr-3"
              alt="bitcoin to ethereum logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              swap.ag
            </span>
          </a>
        </div>
        <div className="hidden md:flex">
          <a
            href="/"
            className="px-4 py-2 bg-[#6ecef0] text-white font-semibold rounded-lg shadow-md hover:bg-[#9F9FD8]"
          >
            Swap
          </a>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div
        className={
          toggle
            ? 'absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b'
            : 'hidden'
        }
      >
        <ul>
          <div className="flex justify-center">
            <a href="/" className="hover:underline">
              Swap
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
