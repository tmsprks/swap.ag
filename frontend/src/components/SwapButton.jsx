import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { abi } from './abi';
import { ERC20_ABI } from './ERC20_ABI';

const SwapButton = ({ fromAmount, toAmount, disabled }) => {
  const [status, setStatus] = useState(null);
  const passedAmountIn = fromAmount.toString();
  const rate = useSelector((state) => state.bestRateReducer);
  const provider = useSelector((state) => state.provider);
  const contractAddress = '0xD73BB55A1585E129e98952236d9872C07B6282eD';

  const swapTokens = async () => {
    if (fromAmount <= 0) {
      alert('Make sure that your swap value is greater than 0');
      return null;
    }
    if (rate.bestPair == null) {
      return null;
    }
    try {
      setStatus('Swapping...');
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider.signer
      );

      var exchange = 0;
      if (rate.bestExchange == 'PancakeSwap') {
        exchange = 1;
      }

      const arbTokenAddress = '0x912CE59144191C1204E64559FE8253a0e49E6548';
      const wethTokenAddress = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1';

      const amountIn = ethers.parseUnits(passedAmountIn, 18);
      const amountOutMin = ethers.parseUnits(
        toAmount.toFixed(8).toString(),
        18
      );

      const deadline = Math.floor(Date.now() / 1000) + 600;

      const path = [arbTokenAddress, wethTokenAddress];

      const tokenContract = new ethers.Contract(
        arbTokenAddress,
        ERC20_ABI,
        provider.signer
      );
      const amountToApprove = amountIn;
      const approveTx = await tokenContract.approve(
        contractAddress,
        amountToApprove
      );
      await approveTx.wait();

      const swapTx = await contract.approveAndExecuteSwap(
        exchange,
        path,
        amountIn,
        amountOutMin,
        deadline
      );
      await swapTx.wait();

      setStatus('Swap successful!');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error while swapping. Please try again later.');
    }
  };

  return (
    <div>
      <div className="pt-[20px]">
        <button
          disabled={disabled}
          className={`border text-white font-semibold rounded-xl shadow-md p-5 mb-5
    ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-[#6ecef0] hover:bg-[#9F9FD8]'
    }`}
          onClick={swapTokens}
        >
          Swap
        </button>
        <div>
          {status && (
            <>
              Status:{' '}
              <span
                className={`${
                  status === 'Swap successful!'
                    ? 'text-green-400'
                    : status === 'Swapping...'
                    ? 'text-[#6ecef0]'
                    : 'text-red-400'
                }`}
              >
                {status}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapButton;
