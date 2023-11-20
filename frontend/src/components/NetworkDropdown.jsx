import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetwork } from '../store/reducers/provider';

const networks = {
  ethereum: {
    chainId: '1',
    name: 'Ethereum',
  },
  arbitrum: {
    chainId: '42161',
    name: 'Arbitrum',
  },
};

function ChangeNetworkDropdown() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.provider.account);
  const network = useSelector((state) => state.provider.chainId);
  const [selectedNetwork, setSelectedNetwork] = useState('');

  useEffect(() => {
    const networkKey = Object.keys(networks).find(
      (key) => networks[key].chainId === network
    );
    setSelectedNetwork(networkKey || '');
  }, [account, network]);

  const handleNetworkChange = async (newNetwork) => {
    try {
      setSelectedNetwork(newNetwork);
      const chainId = networks[newNetwork].chainId;
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      dispatch(setNetwork(chainId));
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.error(
          `The network with chainId ${networks[newNetwork].chainId} has not been added to MetaMask.`
        );
      } else {
        console.error(switchError);
      }
    }
  };

  return (
    <select
      className="border rounded-md h-[43px] mr-2"
      value={selectedNetwork || ''}
      onChange={(e) => handleNetworkChange(e.target.value)}
      disabled={!account}
    >
      <option disabled value="">
        Select Network
      </option>
      {Object.keys(networks).map((network) => (
        <option key={network} value={network}>
          {networks[network].name}
        </option>
      ))}
    </select>
  );
}

export default ChangeNetworkDropdown;
