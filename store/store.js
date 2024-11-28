
 

const {configureStore} = require("@reduxjs/toolkit");
import flightsReducer  from '../store/AvailabilitySlice';
import airSellReducer from '../store/AirSellSlice';
import createPnrSliceReducer from '../store/CreatePnrSlice'
export const store = configureStore({
    reducer: {
        flights: flightsReducer, // Ensure the key matches your slice name
        airsell: airSellReducer,
        createpnr : createPnrSliceReducer,
      },
})
export default store;