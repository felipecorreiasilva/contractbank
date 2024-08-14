// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
    balance: 0,
    cpf: '',
    cpfKeyPix: '',
    valueTransferPix: 0,
    publicKey: '',
    addressWallet: '',


  }, // Initially, no user is logged in
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action)=> {
      state.user = action.payload
    },

  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;