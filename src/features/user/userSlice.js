import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding'; // ✅ fixed path

const initialState = {
  username: '',
  address: '',
  position: { latitude: null, longitude: null },
  status: 'idle',
  error: null,
};

// ✅ Async thunk to get user location and reverse-geocode it
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await getAddress({ latitude, longitude });

          // ✅ Use Nominatim’s display_name or construct readable address
          const address =
            data.display_name ||
            `${data.address.road || ''}, ${data.address.suburb || ''}, ${
              data.address.city ||
              data.address.town ||
              data.address.village ||
              ''
            }, ${data.address.state || ''}, ${data.address.country || ''}`.replace(
              /,\s*,/g,
              ',',
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
      { enableHighAccuracy: true },
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
      // ✅ Removed unused "action" variable
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem fetching your address. Make sure to fill this field';
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
