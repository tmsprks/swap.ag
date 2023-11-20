import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import uniswapAbi from './uniswapAbi';
import wsProvider from '../components/DexListener/singletonWsProvider';

const useDexRates = (pairs) => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    let contracts = [];
    let listeners = [];

    // Async function to fetch rate for a given contract
    const fetchRate = async (contract, pair, exchange) => {
      try {
        const [reserve0, reserve1] = await contract.getReserves();
        const reserve0Ether = ethers.formatEther(reserve0);
        const reserve1Ether = ethers.formatEther(reserve1);
        const rate = parseFloat(reserve0Ether) / parseFloat(reserve1Ether);

        return {
          key: `${pair}-${exchange}`,
          rate,
        };
      } catch (error) {
        console.error(`Error fetching rate for ${pair}-${exchange}:`, error);
        return null;
      }
    };

    // Fetch initial rates for all contracts
    const fetchInitialRates = async () => {
      const fetchPromises = [];

      for (let [pair, exchanges] of Object.entries(pairs)) {
        for (let [exchange, address] of Object.entries(exchanges)) {
          const contract = new ethers.Contract(address, uniswapAbi, wsProvider);
          contracts.push(contract);

          fetchPromises.push(fetchRate(contract, pair, exchange));

          const listener = async () => {
            const fetchedRate = await fetchRate(contract, pair, exchange);
            if (fetchedRate) {
              setExchangeRates((prevRates) => ({
                ...prevRates,
                [fetchedRate.key]: fetchedRate.rate,
              }));
            }
          };

          contract.on('Swap', listener);
          listeners.push({ contract, listener });
        }
      }

      const initialRates = await Promise.all(fetchPromises);
      const newRates = initialRates.reduce((acc, curr) => {
        if (curr) acc[curr.key] = curr.rate;
        return acc;
      }, {});

      setExchangeRates(newRates);
    };

    fetchInitialRates();

    wsProvider.on('error', (error) => {
      console.error('WebSocket Error:', error);
      console.log('Attempting to reconnect...');
      wsProvider.removeAllListeners();
      setTimeout(() => {
        wsProvider.connect();
      }, 3000);
    });

    return () => {
      // Cleanup
      wsProvider.removeAllListeners('error');
      listeners.forEach(({ contract, listener }) =>
        contract.removeListener('Swap', listener)
      );
    };
  }, [pairs]);

  return exchangeRates;
};

export default useDexRates;
