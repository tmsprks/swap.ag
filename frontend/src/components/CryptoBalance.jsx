import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { ERC20_ABI } from './ERC20_ABI';

const CryptoBalance = ({ ticker }) => {
  const [balance, setBalance] = useState(null);
  const [tickerContractAddress, setTickerContractAddress] = useState('');
  const provider = useSelector((state) => state.provider);

  const fetchBalance = async (contractAddress) => {
    try {
      // Create contract instance
      const tokenContract = new ethers.Contract(
        contractAddress,
        ERC20_ABI,
        provider.signer
      );

      const addressToCheck = provider.account;

      tokenContract
        .balanceOf(addressToCheck)
        .then((balance) => {
          setBalance(ethers.formatUnits(balance, 18));
        })
        .catch((error) => {
          console.error(`Error fetching balance: ${error}`);
        });
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (provider.chainId == '42161') {
      if (ticker === 'WETH') {
        setTickerContractAddress('0x82af49447d8a07e3bd95bd0d56f35241523fbab1');
      } else if (ticker === 'ARB') {
        setTickerContractAddress('0x912CE59144191C1204E64559FE8253a0e49E6548');
      } else {
        return;
      }
    } else if (provider.chainId == '1') {
      if (ticker === 'WETH') {
        setTickerContractAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
      } else if (ticker === 'ARB') {
        setTickerContractAddress('0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1');
      } else {
        return;
      }
    }
  }, [ticker, provider]);

  useEffect(() => {
    if (tickerContractAddress) {
      fetchBalance(tickerContractAddress);
    }
  }, [tickerContractAddress]);

  return (
    <div>
      {balance !== null ? (
        <p className="text-gray-400 text-xs">
          Balance {ticker}: {balance}
        </p>
      ) : (
        <p className="text-gray-400 text-xs">Balance: Loading...</p>
      )}
    </div>
  );
};

export default CryptoBalance;
