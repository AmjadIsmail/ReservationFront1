const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
const API_ENDPOINT = 'https://localhost:44333/api/AirSellFRC'
//const API_ENDPOINT = 'https://flightreservationjays.azurewebsites.net/api/availability'

export const submitairSellRequest = createAsyncThunk(
    'flights/submitairSellRequest',
    async (flightData, { rejectWithValue }) => {
      try {
      debugger;
        console.log(flightData)
        const response = await axios.post('https://localhost:44333/api/AirSellFRC', flightData);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
       // alert(error.error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );  
 
   
  const travelProductInformation = {
    departureDate :'',
    fromAirport : '',
    toAirport : '',
    marketingCompany : '',
    flightNumber : '',
    bookingClass : '',
    relatedproductInformation : {
        quantity : '',
        statusCode : 'NN'
       }
  }
const airSellSlice = createSlice({  
 
    name : 'airsell',
    initialState : {     
      airSellRequest: {
        flightId : 0,
        messageFunction: "183",
        additionalMessageFunction: "M1",
        Outbound: {
          origin: "",
          destination: "",
          segmentInformation: {
            travelProductInformation: [], 
          },
        },
        inBound: {
          origin: "",
          destination: "",
          segmentInformation: {
            travelProductInformation: [], 
          },
        },
      },
      status: 'idle',
      error: null,
      response: null
    },
    reducers : {
        setAirSell:(state,action)=> 
            {     
              debugger         
              state.airSellRequest = { ...state.airSellRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitairSellRequest.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(submitairSellRequest.fulfilled, (state, action) => {
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
           }
           
          })
          .addCase(submitairSellRequest.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
    });

 export const {setAirSell} = airSellSlice.actions;
 export default airSellSlice.reducer;