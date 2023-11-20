import {
  setAccount,
  setNetwork,
  setProvider,
  setSigner,
} from './reducers/provider';
import { ethers } from 'ethers';

export const loadProvider = async (dispatch) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  dispatch(setProvider(provider));
  return provider;
};

export const loadSigner = async (provider, dispatch) => {
  const signer = await provider.getSigner();
  dispatch(setSigner(signer));
  return signer;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch(setNetwork(chainId.toString()));
  return chainId.toString();
};

export const loadAccount = async (signer, dispatch) => {
  const account = await signer.getAddress();
  dispatch(setAccount(account));
  return account;
};
