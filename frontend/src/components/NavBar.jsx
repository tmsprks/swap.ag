import { useState } from 'react';
import { useSelector } from 'react-redux';
import Blockies from 'react-blockies';
import { hamburgerMenu, close } from '../assets/';
import { logo } from '../assets/images';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import ChangeNetworkDropdown from './NetworkDropdown';

const Navbar = () => {
  const account = useSelector((state) => state.provider.account);
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
          <ChangeNetworkDropdown />
          {account ? (
            <div className="flex h-[43px]">
              <Blockies
                seed={account}
                size={10}
                scale={3}
                className="rounded-full mx-2"
              />
              <span>{account.slice(0, 5) + '...' + account.slice(38, 42)}</span>
            </div>
          ) : (
            <ConnectWallet />
          )}
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
            <div className="md:hidden">
              <ul>
                <li className="mb-2">
                  <ChangeNetworkDropdown />
                </li>
                <li>
                  {account ? (
                    <h3 className="flex justify-center">
                      <Blockies
                        seed={account}
                        size={10}
                        scale={3}
                        className="rounded-full mx-2"
                      />
                      <p className="align-middle">
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </p>
                    </h3>
                  ) : (
                    <ConnectWallet />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
