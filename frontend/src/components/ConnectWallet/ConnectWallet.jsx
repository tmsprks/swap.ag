import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MetaMaskIcon from './MetaMaskIcon';
import {
  loadAccount,
  loadProvider,
  loadSigner,
} from '../../store/interactions';
import { resetAccount } from '../../store/reducers/provider';
import { setNetwork } from '../../store/reducers/provider';

function ConnectWallet() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.provider.account);

  const handleReset = () => {
    dispatch(resetAccount());
  };

  const connectHandler = async () => {
    if (account) {
      handleReset();
    } else {
      const provider = await loadProvider(dispatch);
      const signer = await loadSigner(provider, dispatch);
      const { chainId } = await provider.getNetwork();
      dispatch(setNetwork(chainId.toString()));
      await loadAccount(signer, dispatch);
    }
  };

  return (
    <>
      <button
        type="button"
        className={'connect-wallet'}
        onClick={connectHandler}
      >
        {account ? (
          <span className="ml-2 sm:ml-0">Disconnect Wallet</span>
        ) : (
          <>
            <MetaMaskIcon />
            <span className="ml-2 sm:ml-0">Connect Wallet</span>
          </>
        )}
      </button>
    </>
  );
}

export default ConnectWallet;
