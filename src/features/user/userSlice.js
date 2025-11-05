// // Get user's geolocation
// function getPosition() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation)
//       reject(new Error("Geolocation is not supported by your browser."));
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// // Fetch reverse geocoded address using BigDataCloud API
// async function getAddress({ latitude, longitude }) {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//   );

//   if (!res.ok) throw new Error("Failed to fetch address data.");

//   const data = await res.json();
//   return data;
// }

// // Combine everything: position + address string
// export async function fetchAddress() {
//   try {
//     // 1️⃣ Get position
//     const positionObj = await getPosition();
//     const position = {
//       latitude: positionObj.coords.latitude,
//       longitude: positionObj.coords.longitude,
//     };

//     // 2️⃣ Reverse geocode
//     const addressObj = await getAddress(position);
//     const address = `${addressObj.locality || ""}, ${addressObj.city || ""} ${
//       addressObj.postcode || ""
//     }, ${addressObj.countryName || ""}`.trim();

//     // 3️⃣ Return data
//     return { position, address };
//   } catch (error) {
//     console.error("Error fetching address:", error);
//     throw error;
//   }
// }

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
