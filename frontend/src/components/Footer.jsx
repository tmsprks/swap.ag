import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { logo } from '../assets/images';
const Footer = () => {
  return (
    <footer>
      <div className="hidden md:flex">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <Link href="https://swap.ag/" className="flex items-center">
                <span className="self-center text-2xl font-bold whitespace-nowrap">
                  swap.ag
                </span>
              </Link>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/" className="mr-4 hover:underline md:mr-6">
                  Swap
                </Link>
              </li>
              <li>
                <Link to="/about" className="mr-4 hover:underline md:mr-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:underline">
                  Contact/Support
                </Link>
              </li>
            </ul>
          </div>
          <span>
            <h3 className="flex justify-center">
              Made with
              <FaHeart className="ml-2 mr-2 text-[#9F9FD8]" />
              in Antigua and Barbuda.
            </h3>
          </span>
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a href="https://swap.ag" className="hover:underline">
              {' '}
              swap.ag
            </a>
            {'. '}All Rights Reserved.
          </span>
        </div>
      </div>
      <div className="md:hidden">
        <ul className="mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 py-10">
          <li className="flex justify-center">
            <div>
              <a href="https://swap.ag/" className="flex items-center">
                <img
                  src={logo}
                  className="h-[56px] mr-3"
                  alt="bitcoin to ethereum logo"
                />
                <span className="self-center text-2xl font-bold whitespace-nowrap text-black">
                  swap.ag
                </span>
              </a>
            </div>
          </li>
          <li className="text-center p-2">
            <a href="#" className="hover:underline">
              Swap
            </a>
          </li>
          <li className="text-center p-2">
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li className="text-center p-2">
            <a href="#" className="hover:underline">
              Contact/Support
            </a>
          </li>
          <li className="text-center text-xxs p-2">© 2023 swap.ag</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
