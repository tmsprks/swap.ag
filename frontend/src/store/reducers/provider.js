import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connection: null,
  signer: null,
  chainId: null,
  account: null,
};

export const provider = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.connection = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
    setNetwork: (state, action) => {
      state.chainId = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    resetAccount: () => initialState,
  },
});

export const { setProvider, setSigner, setNetwork, setAccount, resetAccount } =
  provider.actions;

export default provider.reducer;
