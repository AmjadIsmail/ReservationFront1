const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
//const API_ENDPOINT = 'https://flightreservationjays.azurewebsites.net/api/availability';
const API_ENDPOINT = 'https://localhost:44333/api/Availability'

export const submitFlightData = createAsyncThunk(
    'flights/submitFlightData',
    async (flightData, { rejectWithValue }) => {
      try {
      
        console.log(flightData)
        const response = await axios.post('https://flightreservationjays.azurewebsites.net/api/availability', flightData);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
        alert(error.error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );
  /*export const fetchAvailability = createAsyncThunk(
    'availability/fetch', // Action type
    async (requestData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:44433/api/availability', requestData);
        return response.data; // This becomes the fulfilled payload
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message); // Handle errors
      }
    }
  );*/
 
const Slice = createSlice({  
 
    name : 'flights',
    initialState : {     
      flights: {
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: '',
        infant: '',
        cabinClass: '',
        flightType: '',       
      },
      status: 'idle',
      error: null,
      response: null
    },
    reducers : {
        setFlights:(state,action)=> 
            {              
              state.flights = { ...state.flights, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitFlightData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(submitFlightData.fulfilled, (state, action) => {
           debugger;
            state.status = 'succeeded';
            state.response = action.payload;
            state.error = null;
          })
          .addCase(submitFlightData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
    });

 export const {setFlights} = Slice.actions;
 export default Slice.reducer;