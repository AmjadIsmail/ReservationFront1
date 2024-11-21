
 

const {configureStore} = require("@reduxjs/toolkit");
import flightsReducer  from '../store/AvailabilitySlice';
export const store = configureStore({
    reducer: {
        flights: flightsReducer, // Ensure the key matches your slice name
      },
})
export default store;