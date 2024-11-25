import Image from "next/image";
import img1 from "@/public/images/flights/airlines/1.png";
import img2 from "@/public/images/flights/airlines/2.png";
import img3 from "@/public/images/flights/airlines/3.png";
import img4 from "@/public/images/flights/airlines/4.png";
import img5 from "@/public/images/flights/airlines/5.png";
import img6 from "@/public/images/flights/airlines/6.png";
import img7 from "@/public/images/flights/airlines/7.png";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { submitairSellRequest,setAirSell } from "@/store/AirSellSlice";


const results = [
  {
    id: 1,
    img: img1,
    title: "Egyptair",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 2,
    img: img2,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 3,
    img: img3,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 4,
    img: img4,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 5,
    img: img5,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 6,
    img: img6,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
  {
    id: 7,
    img: img7,
    title: "emirates",
    depTime: "17.00",
    depAriport: "DXB",
    stop: "30h 20m (1 stop)",
    arrTime: "22.20",
    arrAriport: "CDG",
    price: 1200,
    refundable: "non refundable",
    url: "/flight-booking",
  },
];

function formatDateTime(dateString) {
  if(dateString != null){
    const [date, time] = dateString.split('T'); 
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = time.slice(0, 5);   
    return `${formattedDate} ${formattedTime}`;
  }
  
}

const flightData = {
  messageFunction: "183",
  additionalMessageFunction: "M1",
  Outbound: {
      origin: "LHR",
      destination: "DXB",
      segmentInformation: {
          travelProductInformation: [
              {
                  departureDate: "201224",
                  fromAirport: "LHR",
                  toAirport: "MUC",
                  marketingCompany: "LH",
                  flightNumber: "2479",
                  bookingClass: "P",
                  relatedproductInformation: {
                      quantity: "3",
                      statusCode: "NN",
                  },
              },
              {
                  departureDate: "201224",
                  fromAirport: "MUC",
                  toAirport: "DXB",
                  marketingCompany: "LH",
                  flightNumber: "638",
                  bookingClass: "P",
                  relatedproductInformation: {
                      quantity: "3",
                      statusCode: "NN",
                  },
              },
          ],
      },
  },
  inBound: {
      origin: "DXB",
      destination: "LHR",
      segmentInformation: {
          travelProductInformation: [
              {
                  departureDate: "301224",
                  fromAirport: "DXB",
                  toAirport: "ZRH",
                  marketingCompany: "LX",
                  flightNumber: "243",
                  bookingClass: "P",
                  relatedproductInformation: {
                      quantity: "3",
                      statusCode: "NN",
                  },
              },
              {
                  departureDate: "301224",
                  fromAirport: "ZRH",
                  toAirport: "LHR",
                  marketingCompany: "LX",
                  flightNumber: "316",
                  bookingClass: "P",
                  relatedproductInformation: {
                      quantity: "3",
                      statusCode: "NN",
                  },
              },
          ],
      },
  },
};

const FlightResultsSr = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
  const flightRequest = useSelector((state) => state.flights.flights);
  const [selectedFlightId , SetSelectedFlightId] = useState(0);

  function convertToDateFormat(dateString) {
    if(dateString != null){
      const date = new Date(dateString); 
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);     
      return `${day}${month}${year}`;
    }
    
  }
  function getAirSellRequest(flight){
    
    let totPassenger = flightRequest.adults + flightRequest.children;
    const travelProductInformationOutBound = flight.itineraries[0].segments.map((segment, index) => ({
      departureDate: convertToDateFormat(segment.departure.at),
      fromAirport: segment.departure.iataCode,
      toAirport: segment.arrival.iataCode,
      marketingCompany: segment.marketingCarrierCode,
      flightNumber: segment.number,
      bookingClass: segment.bookingClass,
      relatedproductInformation: {
          quantity: totPassenger,
          statusCode: "NN",
      },
  }));

  const travelProductInformationInBound = flight.itineraries[1].segments.map((segment, index) => ({
    departureDate: convertToDateFormat(segment.departure.at),
    fromAirport: segment.departure.iataCode,
    toAirport: segment.arrival.iataCode,
    marketingCompany: segment.marketingCarrierCode,
    flightNumber: segment.number,
    bookingClass: segment.bookingClass,
    relatedproductInformation: {
        quantity: totPassenger,
        statusCode: "NN",
    },
}));

    const flightData = {
      flightId : flight.id,
      messageFunction: "183",
      additionalMessageFunction: "M1",
      Outbound: {
          origin: flightRequest.origin,
          destination: flightRequest.destination,
          segmentInformation: {
              travelProductInformation: travelProductInformationOutBound,
          },
      },
      inBound: {
          origin: "DXB",
          destination: "LHR",
          segmentInformation: {
              travelProductInformation: travelProductInformationInBound,
          },
      },
    };

    return flightData;
  }
 
  const handleClick = (itemid) => {     
    debugger;
    SetSelectedFlightId(itemid);
    const flight = flightResults.data.find(flight => flight.id === itemid.toString());   
    console.log(flightData);
    const AirSellRequset = getAirSellRequest(flight);
    console.log(AirSellRequset);
 
    try {
  
      dispatch(setAirSell(AirSellRequset));
      
     } catch (error) {
       console.error('Error calling setAirSell:', error.message);
       
     }
  try {
    debugger; 
    dispatch(submitairSellRequest(AirSellRequset)).unwrap().then(()=>{
     router.push("/flight-confirmation");
   
    })
    
   } catch (error) {
     console.error('Error api call data:', error.message);
     alert(error);
   }
  }

  if(flightResults != null){
  //  debugger;
    return (
      <div className="flight-detail-sec">
      <div className="title-bar">
        <Row>
          <Col xs={3}>
            <p>Airline</p>
          </Col>
          <Col xs={6}>
            <p>departure & arrival</p>
          </Col>
          <Col xs={3}>
            <p>price</p>
          </Col>
        </Row>
      </div>
      <div className="detail-bar">   
       {
        
        flightResults?.data?.map((item, index) => {       
                
            return (
              <div className="detail-wrap wow fadeInUp" key={item.id}>
                <Row className="align-items-center">
                  <Col md={9}>
                    <div className="outbound border-bottom mb10 pb10">
                      <div className="title-3">
                        <h3>Outbound</h3>
                      </div>
                      <Row>
                                      <Col md={4}>
                                        <div className="logo-sec">
                                          <Image src={img1} className="img-fluid" alt="" />
                                          <span className="title">{item?.itineraries[0]?.segments[0]?.marketingCarrierName}</span>
                                        </div>
                                      </Col>
                                      <Col md={8}>
                                        <div className="airport-part">
                                          <div className="airport-name">
                                            <h4>{formatDateTime(item?.itineraries[0]?.segments[0]?.departure?.at)}</h4>
                                            <h6>{item?.itineraries[0]?.segments[0]?.departure?.iataCode }</h6>
                                          </div>
                                          <div className="airport-progress">
                                            <i className="fas fa-plane-departure float-start"></i>
                                            <i className="fas fa-plane-arrival float-end"></i>
                                            <div className="stop">{item?.itineraries[0]?.segments[0]?.numberOfStops}</div>
                                          </div>
                                          <div className="airport-name arrival">
                                            <h4>{formatDateTime(item?.itineraries[0]?.segments[0]?.arrival?.at)}</h4>
                                            <h6>{item?.itineraries[0]?.segments[0]?.arrival?.iataCode }</h6>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md={3}></Col>
                      </Row>  

                       {
                        
                       item?.itineraries[0]?.segments?.length > 1 ? 
                       (
                        <Row>
                        <Col md={4}>
                          <div className="logo-sec">
                            <Image src={img1} className="img-fluid" alt="" />
                            <span className="title">{item?.itineraries[0]?.segments[1]?.marketingCarrierName}</span>
                          </div>
                        </Col>
                        <Col md={8}>
                          <div className="airport-part">
                            <div className="airport-name">
                              <h4>{formatDateTime(item?.itineraries[0]?.segments[1]?.departure?.at)}</h4>
                              <h6>{item?.itineraries[0]?.segments[1]?.departure?.iataCode }</h6>
                            </div>
                            <div className="airport-progress">
                              <i className="fas fa-plane-departure float-start"></i>
                              <i className="fas fa-plane-arrival float-end"></i>
                              <div className="stop">{item?.itineraries[0]?.segments[1]?.numberOfStops}</div>
                            </div>
                            <div className="airport-name arrival">
                              <h4>{formatDateTime(item?.itineraries[0]?.segments[1]?.arrival?.at)}</h4>
                              <h6>{item?.itineraries[0]?.segments[1]?.arrival?.iataCode }</h6>
                            </div>
                          </div>
                        </Col>
                        <Col md={3}></Col>
                     </Row>  
                       ) : ""
                      } 

                        {
                        
                       item?.itineraries[0]?.segments?.length > 2 ? 
                       (
                        <Row>
                        <Col md={4}>
                          <div className="logo-sec">
                            <Image src={img1} className="img-fluid" alt="" />
                            <span className="title">{item?.itineraries[0]?.segments[2]?.marketingCarrierName}</span>
                          </div>
                        </Col>
                        <Col md={8}>
                          <div className="airport-part">
                            <div className="airport-name">
                              <h4>{formatDateTime(item?.itineraries[0]?.segments[2]?.departure?.at)}</h4>
                              <h6>{item?.itineraries[0]?.segments[2]?.departure?.iataCode }</h6>
                            </div>
                            <div className="airport-progress">
                              <i className="fas fa-plane-departure float-start"></i>
                              <i className="fas fa-plane-arrival float-end"></i>
                              <div className="stop">{item?.itineraries[0]?.segments[2]?.numberOfStops}</div>
                            </div>
                            <div className="airport-name arrival">
                              <h4>{formatDateTime(item?.itineraries[0]?.segments[2]?.arrival?.at)}</h4>
                              <h6>{item?.itineraries[0]?.segments[2]?.arrival?.iataCode }</h6>
                            </div>
                          </div>
                        </Col>
                        <Col md={3}></Col>
                     </Row>  
                       ) : ""
                      } 

                    </div>
                    <div className="inbound">
                      <div className="title-3">
                        <h3>Inbound</h3>
                      </div>                                        
                      <Row>
                          <Col md={4}>                         
                              <div className="logo-sec">
                                <Image src={img2} className="img-fluid" alt="" />
                                <span className="title">{item?.itineraries[1]?.segments[0]?.marketingCarrierName}</span>
                              </div>
                            </Col>
                            <Col md={8}>
                              <div className="airport-part">
                                <div className="airport-name">
                                <h4>{formatDateTime(item?.itineraries[1]?.segments[0].departure.at)}</h4>
                                <h6>{item?.itineraries[1]?.segments[0]?.departure?.iataCode + " - " + item?.itineraries[1]?.segments[0]?.departure?.iataName}</h6>
                                </div>
                                <div className="airport-progress">
                                  <i className="fas fa-plane-departure float-start"></i>
                                  <i className="fas fa-plane-arrival float-end"></i>
                                  <div className="stop">{item?.itineraries[1]?.segments[0]?.numberOfStops}</div>
                                </div>
                                <div className="airport-name arrival">
                                <h4>{formatDateTime(item?.itineraries[1]?.segments[0]?.arrival?.at)}</h4>
                                <h6>{item?.itineraries[1]?.segments[0]?.arrival?.iataCode + " - " + item?.itineraries[1]?.segments[0]?.arrival?.iataName}</h6>
                                </div>
                              </div>
                            </Col>
                            <Col md={3}></Col>                         
                      </Row>  
                      {
                        
                        item?.itineraries[1]?.segments?.length > 1 ? 
                        (
                         <Row>
                         <Col md={4}>
                           <div className="logo-sec">
                             <Image src={img3} className="img-fluid" alt="" />
                             <span className="title">{item.itineraries[1].segments[1].marketingCarrierName}</span>
                           </div>
                         </Col>
                         <Col md={8}>
                           <div className="airport-part">
                             <div className="airport-name">
                               <h4>{formatDateTime(item.itineraries[1].segments[1].departure.at)}</h4>
                               <h6>{item.itineraries[1].segments[1].departure.iataCode + " - " + item.itineraries[1].segments[1].departure.iataName}</h6>
                             </div>
                             <div className="airport-progress">
                               <i className="fas fa-plane-departure float-start"></i>
                               <i className="fas fa-plane-arrival float-end"></i>
                               <div className="stop">{item.itineraries[1].segments[1].numberOfStops}</div>
                             </div>
                             <div className="airport-name arrival">
                               <h4>{formatDateTime(item.itineraries[1].segments[1].arrival.at)}</h4>
                               <h6>{item.itineraries[1].segments[1].arrival.iataCode + " - " + item.itineraries[1].segments[1].arrival.iataName}</h6>
                             </div>
                           </div>
                         </Col>
                         <Col md={3}></Col>
                      </Row>  
                        ) : ""
                       }  

                          {
                        
                        item?.itineraries[1]?.segments?.length > 2 ? 
                        (
                         <Row>
                         <Col md={4}>
                           <div className="logo-sec">
                             <Image src={img3} className="img-fluid" alt="" />
                             <span className="title">{item.itineraries[1].segments[2].marketingCarrierName}</span>
                           </div>
                         </Col>
                         <Col md={8}>
                           <div className="airport-part">
                             <div className="airport-name">
                               <h4>{formatDateTime(item.itineraries[1].segments[2].departure.at)}</h4>
                               <h6>{item.itineraries[1].segments[2].departure.iataCode + " - " + item.itineraries[1].segments[2].departure.iataName}</h6>
                             </div>
                             <div className="airport-progress">
                               <i className="fas fa-plane-departure float-start"></i>
                               <i className="fas fa-plane-arrival float-end"></i>
                               <div className="stop">{item.itineraries[1].segments[2].numberOfStops}</div>
                             </div>
                             <div className="airport-name arrival">
                               <h4>{formatDateTime(item.itineraries[1].segments[2].arrival.at)}</h4>
                               <h6>{item.itineraries[1].segments[2].arrival.iataCode + " - " + item.itineraries[1].segments[2].arrival.iataName}</h6>
                             </div>
                           </div>
                         </Col>
                         <Col md={3}></Col>
                      </Row>  
                        ) : ""
                       }  

                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="price mb10">
                      <div>
                        <h2>{item.price.currency === "GBP" ? "£" : "$"} {item.price.total}</h2>
                        <span>{"non refundable"}</span>
                      </div>
                    </div>
                    <div className="book-flight">
                      <Button onClick={() => handleClick(item.id)} color="c3">
                        book now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            );
        
         
        })
        
        }
      </div>
    </div>
  );
  }
  else{
    return(<div>No results found</div>)
  }

};

export default FlightResultsSr;
