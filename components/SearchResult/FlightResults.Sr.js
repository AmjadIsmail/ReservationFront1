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
import { setFlights } from "../../store/AvailabilitySlice";

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

const FlightResultsSr = () => {
 // debugger;
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
 console.log(flightResults);



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
        {flightResults.data.map((item, index) => {
        
           // debugger;
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
                             <span className="title">{item.itineraries[0].segments[0].marketingCarrierName}</span>
                           </div>
                         </Col>
                         <Col md={8}>
                           <div className="airport-part">
                             <div className="airport-name">
                               <h4>{item.itineraries[0].segments[0].departure.at}</h4>
                               <h6>{item.itineraries[0].segments[0].departure.iataCode + " - " + item.itineraries[0].segments[0].departure.iataName}</h6>
                             </div>
                             <div className="airport-progress">
                               <i className="fas fa-plane-departure float-start"></i>
                               <i className="fas fa-plane-arrival float-end"></i>
                               <div className="stop">{item.itineraries[0].segments[0].numberOfStops}</div>
                             </div>
                             <div className="airport-name arrival">
                               <h4>{item.itineraries[0].segments[0].arrival.at}</h4>
                               <h6>{item.itineraries[0].segments[0].arrival.iataCode + " - " + item.itineraries[0].segments[0].arrival.iataName}</h6>
                             </div>
                           </div>
                         </Col>
                         <Col md={3}></Col>
                       </Row>                                       
                    </div>
                    <div className="inbound">
                      <div className="title-3">
                        <h3>Inbound</h3>
                      </div>                                        
                      <Row>
                          <Col md={4}>                         
                              <div className="logo-sec">
                                <Image src={img2} className="img-fluid" alt="" />
                                <span className="title">{item.itineraries[1].segments[0].marketingCarrierName}</span>
                              </div>
                            </Col>
                            <Col md={8}>
                              <div className="airport-part">
                                <div className="airport-name">
                                <h4>{item.itineraries[1].segments[0].departure.at}</h4>
                                <h6>{item.itineraries[1].segments[0].departure.iataCode + " - " + item.itineraries[1].segments[0].departure.iataName}</h6>
                                </div>
                                <div className="airport-progress">
                                  <i className="fas fa-plane-departure float-start"></i>
                                  <i className="fas fa-plane-arrival float-end"></i>
                                  <div className="stop">{item.itineraries[1].segments[0].numberOfStops}</div>
                                </div>
                                <div className="airport-name arrival">
                                <h4>{item.itineraries[1].segments[0].arrival.at}</h4>
                                <h6>{item.itineraries[1].segments[0].arrival.iataCode + " - " + item.itineraries[1].segments[0].arrival.iataName}</h6>
                                </div>
                              </div>
                            </Col>
                            <Col md={3}></Col>                         
                            </Row>                    
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
                      <Button onClick={() => router.push(item.url)} color="c3">
                        book now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            );
        
         
        })}
      </div>
    </div>
  );
};

export default FlightResultsSr;
