import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding'; // ✅ fixed path

const initialState = {
  username: '',
  address: '',
  position: { latitude: null, longitude: null },
  status: 'idle',
  error: null,
};

// ✅ Corrected thunk using Nominatim response fields
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await getAddress({ latitude, longitude });

          // ✅ Nominatim provides `display_name` (a nice full address string)
          const address =
            data.display_name ||
            `${data.address.road || ''}, ${data.address.suburb || ''}, ${
              data.address.city || data.address.town || data.address.village || ''
            }, ${data.address.state || ''}, ${data.address.country || ''}`.replace(
              /,\s*,/g,
              ','
            );

          resolve({
            address,
            position: { latitude, longitude },
          });
        } catch (err) {
          reject(err);
        }
      },
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
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

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
