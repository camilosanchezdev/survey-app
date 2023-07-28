import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface mainStateAttributes {
  isLoading: boolean;
}

const authInitialState: mainStateAttributes = {
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: authInitialState,
  reducers: {
    setLoading: (reducerRdxState, action: PayloadAction<boolean>) => {
      reducerRdxState.isLoading = action.payload;
    },
  },
});

export const { setLoading } = mainSlice.actions;

export default mainSlice.reducer;
