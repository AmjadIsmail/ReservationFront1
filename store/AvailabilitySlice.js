const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from '@/utils/axiosInstance';
//const API_ENDPOINT = 'https://flightreservationjays.azurewebsites.net/api/availability';
//const API_ENDPOINT = 'https://localhost:44333/api/Availability'

export const submitFlightData = createAsyncThunk(
    'flights/submitFlightData',
    async (flightData, { rejectWithValue }) => {
      try {
  
        console.log(flightData)
        const response = await axiosInstance.post('availability', flightData);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
        alert(error.error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const SubmitSignout = createAsyncThunk(
    'flights/SubmitSignout',
    async (singoutRequest, { rejectWithValue }) => {
      try {
        console.log(singoutRequest)
        const response = await axiosInstance.post('availability/signout', singoutRequest);
        console.log(response.data)      
        return response.data; 
      } catch (error) {        
        console.log(error);
      }
    }
  );
  
 const Slice = createSlice({  
 
    name : 'flights',
    initialState : {     
      flights: {
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: '',
        children : '',
        infant: '',
        cabinClass: '',
        flightType: '',       
      },
      selectedFlight : null,
      status: 'idle',
      error: null,
      response: null,
      marketingCarriers : null,
      filteredFlights: null, 
      selectedCarriers: null, 
    },
    reducers : {
        setFlights:(state,action)=> 
            {              
              state.flights = { ...state.flights, ...action.payload };              
           },
        setSelectedFlights:(state,action)=> 
            {              
              state.selectedFlight = { ...state.selectedFlight, ...action.payload };              
           },
        setSelectedCarriers(state, action) {
          debugger;
            state.selectedCarriers = action.payload;     
            state.filteredFlights = state.response.data.filter((flight) =>
              flight.itineraries.some((itinerary) =>
                itinerary.segments.some((segment) =>
                  state.selectedCarriers.includes(segment.marketingCarrierCode)
                )
              )
            );
    },
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitFlightData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(submitFlightData.fulfilled, (state, action) => {
          debugger;
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.response = action.payload.data.error;
            state.error = action.payload.response;
           }
           else{
            state.status = 'succeeded';
            state.response = action.payload;
            state.error = null;
            state.marketingCarriers = getMarketingCarrierInfo(action.payload.data);
            state.filteredFlights = action.payload.data;
           }
            
          })
          .addCase(submitFlightData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
    });


    const getMarketingCarrierInfo = (data) => {
      const marketingCarriers = [];
    try{
      data.forEach((flight) => {
        flight.itineraries.forEach((itinerary) => {
          itinerary.segments.forEach((segment) => {
            marketingCarriers.push({
              marketingCarrierCode: segment.marketingCarrierCode,
              marketingCarrierName: segment.marketingCarrierName,
            });
          });
        });
      
      });

      const uniqueCarriers = Array.from(
        new Map(
          marketingCarriers.map((item) => [
            item.marketingCarrierCode,
            item,
          ])
        ).values()
      );
    
      return uniqueCarriers;
    }catch(error){
    }
    return marketingCarriers;
    }
 export const {setFlights,setSelectedFlights,setSelectedCarriers} = Slice.actions;
 export default Slice.reducer;