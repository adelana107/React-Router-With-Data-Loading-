import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  username: '',
  address: '',
  position: { latitude: null, longitude: null },
  status: 'idle',
  error: null,
};

// Async thunk
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // Simulated fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: '123 Main St, Lagos, Nigeria',
        position: { latitude: 6.5244, longitude: 3.3792 },
      });
    }, 1000);
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzId === id)?.quantity ?? 0;
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
