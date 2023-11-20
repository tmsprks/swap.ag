import { ethers } from 'ethers';

const INFURA_ENDPOINT = import.meta.env.VITE_INFURA_ENDPOINT;
const wsProvider = new ethers.WebSocketProvider(INFURA_ENDPOINT);

export default wsProvider;
