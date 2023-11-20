import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DexListener from './DexListener/DexListener';
import { useSelector } from 'react-redux';
import SwapButton from './SwapButton';
import { loadProvider } from '../store/interactions';
import { setNetwork } from '../store/reducers/provider';
import CryptoBalance from './CryptoBalance';

const TOKENS = [
  { label: 'ARB', value: 'ARB' },
  { label: 'WETH', value: 'WETH' },
];

const InputComponent = () => {
  const dispatch = useDispatch();
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0);

  const bestRateState = useSelector((state) => state.bestRateReducer) || {};
  const account = useSelector((state) => state.provider.account);
  const network = useSelector((state) => state.provider.chainId);

  const onComponentLoad = async () => {
    try {
      const provider = await loadProvider(dispatch);
      const network = await provider.getNetwork();
      setNetwork(network.chainId.toString());
    } catch (error) {
      console.error('Failed to load provider:', error);
    }
  };

  useEffect(() => {
    onComponentLoad();
    console.log(network);
  }, [network]);

  return (
    <div className="p-10">
      <div className="bg-white p-5 rounded-[20px] shadow-3xl">
        {network !== '42161' ? (
          <p>Please change your network to Arbitrum to use this feature.</p>
        ) : (
          <span>Connected to: Arbitrum</span>
        )}
        <div className="mb-4">
          <div className="flex justify-between">
            <label className="text-gray-700">From</label>
            <CryptoBalance ticker={fromToken} />
          </div>
          <select
            className="block w-full p-2 border rounded"
            value={fromToken}
            onChange={account ? (e) => setFromToken(e.target.value) : null}
            disabled={!account || network !== '42161'}
          >
            <option value="" disabled>
              Select a token
            </option>
            {TOKENS.map((token) => (
              <option key={token.value} value={token.value}>
                {token.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="mt-2 block w-full p-2 border rounded"
            value={fromAmount}
            onChange={
              account
                ? (e) => {
                    setFromAmount(Number(e.target.value));
                    setToAmount(
                      bestRateState.bestRate * Number(e.target.value)
                    );
                  }
                : null
            }
            placeholder={account ? '0.0' : 'Connect account'}
            disabled={!account}
          />
        </div>

        <div>
          <div className="flex justify-between">
            <label className="text-gray-700">To</label>
            <CryptoBalance ticker={toToken} />
          </div>
          <select
            className="block w-full p-2 border rounded"
            value={toToken}
            onChange={account ? (e) => setToToken(e.target.value) : null}
            disabled={!account || network !== '42161'}
          >
            <option value="" disabled>
              Select a token
            </option>
            {TOKENS.map((token) => (
              <option key={token.value} value={token.value}>
                {token.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="mt-2 block w-full p-2 border rounded"
            value={toAmount}
            onChange={account ? (e) => setToAmount(e.target.value) : null}
            placeholder={account ? '0.0' : 'Connect account'}
            disabled
          />
          <label className="block text-gray-700 mb-2 text-left mt-2">
            Max Slippage (Percentage)
          </label>
          <input
            type="number"
            className="mt-2 block w-full p-2 border rounded"
            onChange={account ? (e) => setSlippage(e.target.value) : null}
            placeholder={'Max Slippage Percent'}
            min="1"
            max="100"
          />
          <p className="text-xs text-gray-300 text-left">
            Max slippage is set to 0% by default
          </p>
          {account && (
            <SwapButton
              disabled={network !== '42161'}
              fromAmount={fromAmount}
              toAmount={toAmount - toAmount * (slippage / 100)}
            />
          )}
        </div>
        {!account && (
          <button
            disabled
            className="text-red-500 container flex justify-center pt-[20px]"
          >
            Please connect your wallet.
          </button>
        )}
      </div>
      <DexListener pairKey={fromToken + '/' + toToken} />
    </div>
  );
};
export default InputComponent;
