import Meta from "@/components/common/Meta";
import BreadcrumbSectionFc from "@/components/flightConfirmation/BreadcrumbSection.Fc";
import FrontLayout from "@/components/layouts/Front.Layout";
import Image from "next/image";
import img1 from "@/public/images/flights/airlines/1.png";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';


const formatDateToCustomFormat = (dateString) => {
  const date = new Date(dateString); 
 
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options)
    .format(date)
    .toUpperCase()
    .replace(',', ''); 
};

let flight;

function convertTimeFormat(timeString) {
  if (!timeString || !timeString.includes(":")) {
    return "Invalid Time";
  }
  const [hours, minutes] = timeString.split(":");
  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid Time";
  }

  return `${hours}h:${minutes}m`;
}
const FlightConfirmation = () => {
  const currSign = '£';
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
  const flightRequest = useSelector((state) => state.flights.flights);
  const airsellResults = useSelector((state) => state.airsell.response);
  const airsellRequest = useSelector((state) => state.airsell.airSellRequest);
  
  debugger;
  if(airsellRequest != null){    
    flight = flightResults.data.find(flight => flight.id === airsellRequest.flightId);
  }
  return (
    <>
      <Meta title="Flight confirmation" />

      <BreadcrumbSectionFc />

      <div class="small-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="review-section">
                <div class="review_box">
                  <div class="title-top">
                    <h5>flight details</h5>
                  </div>
                  <div class="flight_detail">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="logo-sec">
                          <Image src={img1} class="img-fluid" alt="" />
                          <span class="title">{airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.marketingCompanyName}</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="airport-part">
                          <div class="airport-name">
                            <h6>
                              {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.departureTime}</span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.departureDate)} </p>
                          </div>
                          <div class="airport-progress">
                            <i class="fas fa-plane-departure float-start"></i>
                            <i class="fas fa-plane-arrival float-end"></i>
                          </div>
                          <div class="airport-name arrival">
                            <h6>
                               {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.fromAirport}<span> {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.departureTime} </span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.departureDate)}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="duration">
                          <div>
                            <h6> {convertTimeFormat(flight.itineraries[0].duration)}</h6>
                            <p>{flight?.itineraries?.[0]?.segments?.length || 0} stop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="review_box">
                  <div class="title-top">
                    <h5>Information</h5>
                  </div>
                  <div class="flight_detail">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="boxes">
                          <h6>Cancellation Charges</h6>
                          <ul>
                            <li>
                              airline fee : <span>{currSign}0</span>
                            </li>
                            <li>
                              This airline allows cancellation only before 2 hrs
                              from departure time.
                            </li>
                          </ul>
                        </div>
                        <div class="boxes">
                          <h6>Reschedule Charges</h6>
                          <ul>
                            <li>
                              airline fee : <span>{currSign}0</span>
                            </li>
                            <li>
                              This airline allows reschedule only before 2 hrs
                              from departure time.
                            </li>
                          </ul>
                        </div>
                        <div class="boxes">
                          <h6>baggage policy</h6>
                          <ul>
                            <li>
                              Check-in Baggage : <span>10 kg</span>
                            </li>
                            <li>
                              Cabin Baggage: <span>7 kg</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="review_box">
                  <div class="title-top">
                    <h5>traveller details</h5>
                  </div>
                  <div class="flight_detail">
                    <div class="row form_flight">
                      <div class="col-md-12">
                        <form>
                          <h6>adult 1</h6>
                          <div class="row">
                            <div class="form-group col-md-2">
                              <label for="inputState">title</label>
                              <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                              </select>
                            </div>
                            <div class="form-group col-md-5">
                              <label for="first">first name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="firstt"
                              />
                            </div>
                            <div class="form-group col-md-5">
                              <label for="last">last name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="lastt"
                              />
                            </div>
                          </div>
                        </form>
                        <form>
                          <h6>adult 2</h6>
                          <div class="row">
                            <div class="form-group col-md-2">
                              <label for="input">title</label>
                              <select id="input" class="form-control">
                                <option selected>Choose...</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                              </select>
                            </div>
                            <div class="form-group col-md-5">
                              <label for="first">first name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="first"
                              />
                            </div>
                            <div class="form-group col-md-5">
                              <label for="last">last name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="last"
                              />
                            </div>
                          </div>
                        </form>
                        <form>
                          <h6>contact details</h6>
                          <div class="row">
                            <div class="form-group col-md-6">
                              <label for="inputEmail4">Email</label>
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail4"
                              />
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputnumber">Phone no:</label>
                              <input
                                type="number"
                                class="form-control"
                                id="inputnumber"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="review_box">
                  <div class="title-top">
                    <h5>Travel Insurance</h5>
                  </div>
                  <div class="flight_detail">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="boxes">
                          <h6>
                            secure your travel with travel insurance for
                            $25/person
                          </h6>
                          <div class="form-check">
                            <input
                              class="form-check-input radio_animated"
                              type="radio"
                              name="exampleRadios1"
                              id="exampleRadios1"
                              value="option1"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              yes, i want to secure my travel with insurance
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input radio_animated"
                              type="radio"
                              name="exampleRadios1"
                              id="exampleRadios2"
                              value="option2"
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios2"
                            >
                              no, i do not want to secure my travel with
                              insurance
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 res-margin">
              <div class="sticky-cls-top">
                <div class="review-section">
                  <div class="review_box">
                    <div class="title-top">
                      <h5>booking summery</h5>
                    </div>
                    <div class="flight_detail">
                      <div class="summery_box">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td>adults ({flightRequest.adults} X {currSign}{flight.price.adultPP})                              
                              </td>
                              <td>{currSign}{flightRequest.adults * flight.price.adultPP}</td>
                            </tr>
                            {(flightRequest.children != 0 ?                              
                              <tr>
                              <td>
                             children ({flightRequest.children} X {currSign}{flight.price.childPp})                             
                              </td>
                              <td>{currSign}{flightRequest.children * flight.price.childPp}</td>
                            </tr>
                              : "")}     
                                {(flightRequest.infant != 0 ?                              
                              <tr>
                              <td>
                              infants({flightRequest.infant} X {currSign}{flight.price.infantPp})                             
                              </td>
                              <td>{currSign}{flightRequest.infant * flight.price.infantPp}</td>
                            </tr>
                              : "")}                            
                            <tr>
                              <td>total taxes</td>
                              <td>{currSign}{parseFloat(flight?.price?.adultTax) + parseFloat(flight?.price?.childTax) + parseFloat(flight?.price?.infantTax)}
                              </td>
                            </tr>
                            <tr>
                              <td>Insurance</td>
                              <td>{currSign}0</td>
                            </tr>
                            <tr>
                              <td>Convenience fee</td>
                              <td>{currSign}0</td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="grand_total">
                          <h5>
                            grand total: <span>{currSign}{flight?.price?.total}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="review_box">
                    <div class="flight_detail">
                      <div class="promo-section">
                        <div class="form-group mb-0">
                          <label>have a coupon code?</label>
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Promo Code"
                            />
                            <div class="input-group-prepend">
                              <span class="input-group-text">apply</span>
                            </div>
                          </div>
                        </div>
                        <div class="promos">
                          <form>
                            <div class="form-check">
                              <input
                                class="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios3"
                                value="option1"
                                checked
                              />
                              <div>
                                <label
                                  class="form-check-label title"
                                  for="exampleRadios3"
                                >
                                  RICA500
                                </label>
                                <label
                                  class="form-check-label"
                                  for="exampleRadios3"
                                >
                                  Use RICA50, and get $50 off on first booking
                                </label>
                              </div>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios4"
                                value="option2"
                              />
                              <div>
                                <label
                                  class="form-check-label title"
                                  for="exampleRadios4"
                                >
                                  FLY10
                                </label>
                                <label
                                  class="form-check-label"
                                  for="exampleRadios4"
                                >
                                  Use FLY10, and get 10% off upto $50 on flight
                                  ticket bookings.
                                </label>
                              </div>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios5"
                                value="option2"
                              />
                              <div>
                                <label
                                  class="form-check-label title"
                                  for="exampleRadios5"
                                >
                                  FLIGHT80
                                </label>
                                <label
                                  class="form-check-label"
                                  for="exampleRadios5"
                                >
                                  Upto 80% Off + Upto 40% Cashback on Flight
                                  booking & more + Extra 10% off via ICICI Cards
                                  (10th-13th Oct)
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="continue-btn">
            <button
              onclick="window.location.href='flight-booking-addons.html'"
              class="btn btn-solid"
              type="submit"
            >
              continue booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightConfirmation;

FlightConfirmation.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
