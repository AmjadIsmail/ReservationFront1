import Meta from "@/components/common/Meta";
import BreadcrumbSectionFc from "@/components/flightConfirmation/BreadcrumbSection.Fc";
import FrontLayout from "@/components/layouts/Front.Layout";
import Image from "next/image";
import img1 from "@/public/images/flights/airlines/1.png";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Col, Container, Input, Label, Row } from "reactstrap";
import { setPassengerDetails,setPnrMulti,PNR_Multi,Create_Fop,Fare_Price_Pnr,Create_Tst,Commit_Pnr } from "@/store/CreatePnrSlice";

const formatDateToCustomFormat = (dateString) => {
  if(dateString != null){
    const date = new Date(dateString);  
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };  
    return new Intl.DateTimeFormat('en-US', options)
      .format(date)
      .toUpperCase()
      .replace(',', ''); 
  }
  
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
  const PNR_Multi_Error = useSelector((state) => state.generatePnr.PNR_Multi_Error);
  const Create_Fop_Error =  useSelector((state) => state.generatePnr.Create_Fop_Error);
  const Fare_Price_Pnr_Error =  useSelector((state) => state.generatePnr.Fare_Price_Pnr_Error);
  const Create_Tst_Error =  useSelector((state) => state.generatePnr.Create_Tst_Error);
  const Commit_Pnr_Error =  useSelector((state) => state.generatePnr.Commit_Pnr_Error);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [ApiResponse,setApiResponse] = useState('');

  const [formData, setFormData] = useState({
    adults: Array.from({ length: flightRequest.adults }, () => ({
      firstName: "",
      lastName: "",
      title: "",
    })),
    children: Array.from({ length: flightRequest.children || 0 }, () => ({
      firstName: "",
      lastName: "",
      title: "",
    })),
    infants: Array.from({ length: flightRequest.infant || 0 }, () => ({
      firstName: "",
      lastName: "",
      title: "",
    })),
  });

  const handleEmailChange = (e) => {
  
   if (!e || !e.target) {
      console.error("Event object is null or undefined!");
      return;
    }
    console.log("Event target value:", e.target.value); // Debugging line
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if (!e || !e.target) {
      console.error("Event object is null or undefined!");
      return;
    }
    setPhone(e.target.value);
  };

  const handleApiCalls = async () => {
    setLoading(true);
    setError(null);
    debugger;
    let session = getSession();
    session.sequenceNumber = session.sequenceNumber + 1;
    const pnrMultirequest = CreatePnrMultiRequest(formData,session);
    try{
      dispatch(setPassengerDetails(pnrMultirequest.passengerDetails));
     }catch(error){
       console.error('Error calling setPassengerDetails:', error.message);
     }
    const addPnrMultiRequset = {
      sessionDetails : pnrMultirequest.sessionDetails,
      passengerDetails : pnrMultirequest.passengerDetails
    }  
    let session2 = getSession();
    session2.sequenceNumber = session2.sequenceNumber + 2;
    const fopRequest = CreateFopRequest(session2);
    const FopRequest = {
      sessionDetails : fopRequest.sessionDetails,
      transactionDetailsCode : fopRequest.transactionDetailsCode,
      fopCode : fopRequest.fopCode
    }
  
    let session3 = getSession();
    session3.sequenceNumber = session3.sequenceNumber + 3;
    const carrierCode = airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.marketingCompany;
    const farePriceRequest = CreateFarePricePnrRequest(carrierCode,session3);
    const pricePnrRequest = {
      sessionDetails : farePriceRequest.sessionDetails,
      pricingOptionKey : farePriceRequest.pricingOptionKey,
      carrierCode : carrierCode
    }
    let session4 = getSession();
    session4.sequenceNumber = session4.sequenceNumber + 4;
    const tstRequest = CreateTstRequest(session4);
   const ticketTstRequest = {
    sessionDetails : tstRequest.sessionDetails,
    adults : tstRequest.adults,
    children : tstRequest.children,
    infants : tstRequest.infants
   }
   let session5 = getSession();
   session5.sequenceNumber = session5.sequenceNumber + 5;
   const commitPnrRequest = CreateCommitPnrRequest(session5); 
  
   const pnrCommitRequest = {
     sessionDetails : commitPnrRequest.sessionDetails,
     optionCode1 : commitPnrRequest.optionCode1,
     optionCode2 : commitPnrRequest.optionCode2,
   }  
  
    try {
      // Dispatch first API call
      await dispatch(PNR_Multi(addPnrMultiRequset));
      console.log('PNR_Multi dispatched successfully.');
      if(PNR_Multi_Error != null){
        setApiResponse(PNR_Multi_Error); return;
      }
      // Dispatch second API call
      await dispatch(Create_Fop(FopRequest));
      console.log('Create_Fop dispatched successfully.');
      if(Create_Fop_Error != null){
        setApiResponse(Create_Fop_Error); return;
      }
      // Dispatch third API call
      await dispatch(Fare_Price_Pnr(pricePnrRequest));
      console.log('Fare_Price_Pnr dispatched successfully.');
      if(Fare_Price_Pnr_Error != null){
        setApiResponse(Fare_Price_Pnr_Error); return;
      }

      // Dispatch fourth API call
      await dispatch(Create_Tst(ticketTstRequest));
      console.log('Create_Tst dispatched successfully.');
      if(Create_Tst_Error != null){
        setApiResponse(Create_Tst_Error); return;
      }
      // Dispatch fifth API call
      await dispatch(Commit_Pnr(pnrCommitRequest));
      console.log('Commit_Pnr dispatched successfully.');
      if(Commit_Pnr_Error != null){
        setApiResponse(Commit_Pnr_Error); return;
      }
      router.push("/confirmation");
      //alert('All API calls were successful!');
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while processing the requests.');
    } finally {
      setLoading(false);
    }
  };

  function getSession(){
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      const jsonObject = JSON.parse(storedSession);
      const session = {
        transactionStatusCode: jsonObject.transactionStatusCode,
        sessionId: jsonObject.sessionId,
        sequenceNumber : jsonObject.sequenceNumber,
        securityToken: jsonObject.securityToken
      }
      return session;         
    }
  }
  function CreatePnrMultiRequest(formData,session){
 
      const passengers  =[];
      formData.adults.forEach((adult, index) => {
        if(index == 0){
          passengers.push({
            firstName: adult.firstName,
            surName: adult.lastName,
            type: "ADT", // Adult type
            dob: "01-01-1980", //adult.dob,
            isLeadPassenger: true, // First adult as lead passenger
            number: index + 1,
            email: email,
            phone: phone,
          });
        }
        else{
          passengers.push({
            firstName: adult.firstName,
            surName: adult.lastName,
            type: "ADT", // Adult type
            dob: "01-01-1980", //adult.dob,
            isLeadPassenger: false, // First adult as lead passenger
            number: index + 1,
            email: '',          
          });
        }        
      });

      formData.children.forEach((child, index) => {
        passengers.push({
          firstName: child.firstName,
          surName: child.lastName,
          type: "CHD", // Child type
          dob: "02-01-2024", //child.dob,         
          number: formData.adults.length + index + 1,
          email: "",
        });
      });

      formData.infants.forEach((infant, index) => {
        passengers.push({
          firstName: infant.firstName,
          surName: infant.lastName,
          type: "INF", // Infant type
          dob: "02-01-2024",//infant.dob,          
          number: formData.adults.length + formData.children.length + index + 1,
          email: "",
        });
      });

      const pnrmultirequest = {
        sessionDetails : session,
        passengerDetails: passengers,
      };
      return pnrmultirequest;
      
  }

  function CreateFopRequest(session){
   
      const foprequest = {
        sessionDetails : session,
        transactionDetailsCode: "FP",
        fopCode : "CASH"
      };
      return foprequest;
  }

  function CreateFarePricePnrRequest(_carrierCode,session){
      const farepricerequest = {
      sessionDetails : session,
      pricingOptionKey: "RP,RU",
      carrierCode : _carrierCode
    };
    return farepricerequest;
  }

  function CreateTstRequest(session){
    const createtstrequest = {
      sessionDetails : session,
      adults: flightRequest.adults,
      children : flightRequest.children,
      infants : flightRequest.infant,
    };
    return createtstrequest;
  }
 
  function CreateCommitPnrRequest(session){
   const createcommitpnr = {
      sessionDetails : session,
      optionCode1: "10",
      optionCode2 : "30",
    };
    return createcommitpnr;
  }
  if(airsellRequest != null){    
    flight = flightResults?.data?.find(flight => flight.id === airsellRequest.flightId);
  }

  const handleChange = (type, index, field, value) => {
   // debugger;
    setFormData((prevData) => ({
      ...prevData,
      [type]: prevData[type]?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    console.log(formData);
  };

  return (
    <>
      <Meta title="Flight confirmation" />

      <BreadcrumbSectionFc />

      <div className="small-section">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="review-section">
                <div className="review_box">
                  <div className="title-top">
                    <h5>flight details</h5>
                  </div>
                  <div class="title-top">
                    <h6>Out Bound</h6>
                  </div>
                  <div className="flight_detail">
                    <Row>
                      <Col md={3}>
                        <div className="logo-sec">
                          {/* <Image src={img1} className="img-fluid" alt="" /> */}
                          <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.marketingCompany} width={340} height={240} className="img-fluid"/>  
                          <span className="title">{airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.marketingCompanyName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="airport-part">
                          <div className="airport-name">
                            <h6>
                              {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.departureTime}</span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.departureDate)} </p>
                          </div>
                          <div className="airport-progress">
                            <i className="fas fa-plane-departure float-start"></i>
                            <i className="fas fa-plane-arrival float-end"></i>
                          </div>
                          <div className="airport-name arrival">
                            <h6>
                               {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.toAirport}<span> {airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.arrivalTime} </span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[0]?.arrivalDate)}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="duration">
                          <div>
                            <h6> {convertTimeFormat(flight?.itineraries[0]?.duration)}</h6>
                            <p>{flight?.itineraries?.[0]?.segments?.length - 1 || 0} stop</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    { airsellResults?.data?.airSellResponse[0]?.flightDetails?.length > 1 ? 
                        (   <Row>
                          <Col md={3}>
                            <div className="logo-sec">
                              {/* <Image src={img1} className="img-fluid" alt="" /> */}
                              <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.marketingCompany} width={340} height={240} className="img-fluid"/>
                              <span className="title">{airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.marketingCompanyName}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="airport-part">
                              <div className="airport-name">
                                <h6>
                                  {airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.departureTime}</span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.departureDate)} </p>
                              </div>
                              <div className="airport-progress">
                                <i className="fas fa-plane-departure float-start"></i>
                                <i className="fas fa-plane-arrival float-end"></i>
                              </div>
                              <div className="airport-name arrival">
                                <h6>
                                   {airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.toAirport}<span> {airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.arrivalTime} </span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[1]?.arrivalDate)}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="duration">
                              <div hidden={true}>
                                <h6> {convertTimeFormat(flight.itineraries[0].duration)}</h6>
                                <p>{flight?.itineraries?.[0]?.segments?.length || 0} stop</p>
                              </div>
                            </div>
                          </Col>
                        </Row> ) : ""
                    }

{ airsellResults?.data?.airSellResponse[0]?.flightDetails?.length > 2 ? 
                        (   <Row>
                          <Col md={3}>
                            <div className="logo-sec">
                              {/* <Image src={img1} className="img-fluid" alt="" /> */}
                              <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.marketingCompany} width={340} height={240} className="img-fluid"/>
                              <span className="title">{airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.marketingCompanyName}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="airport-part">
                              <div className="airport-name">
                                <h6>
                                  {airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.departureTime}</span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.departureDate)} </p>
                              </div>
                              <div className="airport-progress">
                                <i className="fas fa-plane-departure float-start"></i>
                                <i className="fas fa-plane-arrival float-end"></i>
                              </div>
                              <div className="airport-name arrival">
                                <h6>
                                   {airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.toAirport}<span> {airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.arrivalTime} </span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[0]?.flightDetails[2]?.arrivalDate)}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="duration">
                              <div hidden={true}>
                                <h6> {convertTimeFormat(flight.itineraries[0].duration)}</h6>
                                <p>{flight?.itineraries?.[0]?.segments?.length || 0} stop</p>
                              </div>
                            </div>
                          </Col>
                        </Row> ) : ""
                    }

                  </div>
                  <div class="title-top">
                    <h6>Return</h6>
                  </div>
                  <div className="flight_detail">
                    <Row>
                      <Col md={3}>
                        <div className="logo-sec">
                          {/* <Image src={img1} className="img-fluid" alt="" /> */}
                          <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.marketingCompany} width={340} height={240} className="img-fluid"/>
                          <span className="title">{airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.marketingCompanyName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="airport-part">
                          <div className="airport-name">
                            <h6>
                              {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.departureTime}</span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.departureDate)} </p>
                          </div>
                          <div className="airport-progress">
                            <i className="fas fa-plane-departure float-start"></i>
                            <i className="fas fa-plane-arrival float-end"></i>
                          </div>
                          <div className="airport-name arrival">
                            <h6>
                               {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.toAirport}<span> {airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.arrivalTime} </span>
                            </h6>
                            <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.arrivalDate)}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="duration">
                          <div>
                            <h6> {convertTimeFormat(flight?.itineraries[1]?.duration)}</h6>
                            <p>{flight?.itineraries?.[1]?.segments?.length -1 || 0} stop</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    { airsellResults?.data?.airSellResponse[1]?.flightDetails?.length > 1 ? 
                        (   <Row>
                          <Col md={3}>
                            <div className="logo-sec">
                            <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.marketingCompany} width={340} height={240} className="img-fluid"/>
                              <span className="title">{airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.marketingCompanyName}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="airport-part">
                              <div className="airport-name">
                                <h6>
                                  {airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.departureTime}</span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.departureDate)} </p>
                              </div>
                              <div className="airport-progress">
                                <i className="fas fa-plane-departure float-start"></i>
                                <i className="fas fa-plane-arrival float-end"></i>
                              </div>
                              <div className="airport-name arrival">
                                <h6>
                                   {airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.toAirport}<span> {airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.arrivalTime} </span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[1]?.arrivalDate)}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="duration">
                              <div hidden={true}>
                                <h6> {convertTimeFormat(flight.itineraries[1].duration)}</h6>
                                <p>{flight?.itineraries?.[1]?.segments?.length || 0} stop</p>
                              </div>
                            </div>
                          </Col>
                        </Row> ) : ""
                    }

{ airsellResults?.data?.airSellResponse[1]?.flightDetails?.length > 2 ? 
                        (   <Row>
                          <Col md={3}>
                            <div className="logo-sec">
                              {/* <Image src={img1} className="img-fluid" alt="" /> */}
                              <Image src={`/images/airline-logo/${airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.marketingCompany}.png`} alt={airsellResults?.data?.airSellResponse[1]?.flightDetails[0]?.marketingCompany} width={340} height={240} className="img-fluid"/>
                              <span className="title">{airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.marketingCompanyName}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="airport-part">
                              <div className="airport-name">
                                <h6>
                                  {airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.fromAirport} <span>  {airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.departureTime}</span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.departureDate)} </p>
                              </div>
                              <div className="airport-progress">
                                <i className="fas fa-plane-departure float-start"></i>
                                <i className="fas fa-plane-arrival float-end"></i>
                              </div>
                              <div className="airport-name arrival">
                                <h6>
                                   {airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.toAirport}<span> {airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.arrivalTime} </span>
                                </h6>
                                <p>{formatDateToCustomFormat(airsellResults?.data?.airSellResponse[1]?.flightDetails[2]?.arrivalDate)}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="duration">
                              <div hidden={true}>
                                <h6> {convertTimeFormat(flight.itineraries[0].duration)}</h6>
                                <p>{flight?.itineraries?.[0]?.segments?.length || 0} stop</p>
                              </div>
                            </div>
                          </Col>
                        </Row> ) : ""
                    }

                  </div>
                </div>
                <div className="review_box">
                  <div className="title-top">
                    <h5>Information</h5>
                  </div>
                  <div className="flight_detail">
                    <Row>
                      <Col md={12}>
                        <div className="boxes">
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
                        <div className="boxes">
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
                        <div className="boxes">
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
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="review_box">
                  <div className="title-top">
                    <h5>traveller details</h5>
                  </div>
                  <div className="flight_detail">                
                  
                    <Row className="form_flight">
                      <Col md={12}>
                      {
                      Array.from({ length: flightRequest.adults }, (_, index) => (
                        <form key={index}>
                  <h6>Adult {index + 1}</h6>
                  <Row>
                    <Col md={2} className="form-group">
                      <Label for={`title-${index}`}>Title</Label>
                      <Input type="select" className="form-control" //id={`title-${index}`}
                      id={`adults-title-${index}`}
                      //value={formData[flightRequest.adult][index]?.title || ""}
                      onChange={(e) =>
                        handleChange('adults', index, "title", e.target.value)
                      }
                      onBlur={(e) =>
                        handleChange('adults', index, "title", e.target.value)
                      }
                      >
                        <option value="">Choose...</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </Input>
                    </Col>
                    <Col md={5} className="form-group">
                      <Label for={`first-name-${index}`}>First Name</Label>
                      <Input
                        type="text"
                        className="form-control"               
                        placeholder="Enter first name"
                        id={`adults-first-name-${index}`}            
                      value={formData['adults'][index]?.firstName}
                      onChange={(e) =>
                        handleChange('adults', index, "firstName", e.target.value)
                      }
                      onBlur={(e) =>
                        handleChange('adults', index, "firstName", e.target.value)
                      }
                      />
                    </Col>
                    <Col md={5} className="form-group">
                      <Label for={`last-name-${index}`}>Last Name</Label>
                      <Input
                        type="text"
                        className="form-control"               
                        placeholder="Enter last name"
                        id={`adults-last-name-${index}`}               
                        value={formData['adults'][index]?.lastName}
                        onChange={(e) =>
                          handleChange('adults', index, "lastName", e.target.value)
                        }
                        onBlur={(e) =>
                          handleChange('adults', index, "lastName", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  {/** Working For Email And Contaict */}
                  { 
                  index === 0 ? (
                    <form>
                    <h6>contact details</h6>
                    <Row>
                      <Col md={6} className="form-group">
                        <Label for="inputEmail4">Email</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          //onChange={() => handleEmailChange()} 
                          onChange={handleEmailChange}
                        />
                      </Col>
                      <Col md={6} className="form-group col-md-6">
                        <Label for="inputnumber">Phone no:</Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="inputnumber"
                          onChange={handlePhoneChange}
                        />
                      </Col>
                    </Row>
                  </form>
                  ) : ""
                  
                  }
                        </form>
                      ))}  

                      {/* For Childern */}
                      {
                      Array.from({ length: flightRequest.children }, (_, index) => (
                        <form key={index}>
                  <h6>Child {index + 1}</h6>
          <Row>
            <Col md={2} className="form-group">
              <Label for={`title-${index}`}>Title</Label>
              <Input type="select" className="form-control" id={`title-child-${index}`}
                onChange={(e) =>
                  handleChange('children', index, "title", e.target.value)
                }
              >
                <option value="">Choose...</option>
                <option value="Master.">Master.</option>
                <option value="Miss.">Miss.</option>              
              </Input>
            </Col>
            <Col md={5} className="form-group">
              <Label for={`first-name-child-${index}`}>First Name</Label>
              <Input
                type="text"
                className="form-control"
                id={`first-name-child-${index}`}
                placeholder="Enter first name"
                //value={formData['children'][index]?.firstName}
                onChange={(e) =>
                  handleChange('children', index, "firstName", e.target.value)
                }
                onBlur={(e) =>
                  handleChange('children', index, "firstName", e.target.value)
                }
              />
            </Col>
            <Col md={5} className="form-group">
              <Label for={`last-name-child-${index}`}>Last Name</Label>
              <Input
                type="text"
                className="form-control"
                id={`last-name-child-${index}`}
                placeholder="Enter last name"
                //value={formData['children'][index]?.lastName}
                onChange={(e) =>
                  handleChange('children', index, "lastName", e.target.value)
                }
                onBlur={(e) =>
                  handleChange('children', index, "lastName", e.target.value)
                }
              />
            </Col>
          </Row>
                        </form>
                      ))} 

                         {/* For Infant */}   

                           {
                      Array.from({ length: flightRequest.infant }, (_, index) => (
                        <form key={index}>
                  <h6>Infant {index + 1}</h6>
          <Row>
            <Col md={2} className="form-group">
              <Label for={`title-${index}`}>Title</Label>
              <Input type="select" className="form-control" id={`title-infant-${index}`}
               onChange={(e) =>
                handleChange('infants', index, "title", e.target.value)
              }
              onBlur={(e) =>
                handleChange('infants', index, "title", e.target.value)
              }
              >
                <option value="">Choose...</option>
                <option value="Infant.">Infant.</option>
                <option value="Master.">Master.</option>
                <option value="Miss.">Miss.</option>              
              </Input>
            </Col>
            <Col md={5} className="form-group">
              <Label for={`first-name-infant-${index}`}>First Name</Label>
              <Input
                type="text"
                className="form-control"
                id={`first-name-infants-${index}`}
              //  value={formData['infant'][index]?.firstName}
                placeholder="Enter first name"
                onChange={(e) =>
                  handleChange('infants', index, "firstName", e.target.value)
                }
                onBlur={(e) =>
                  handleChange('infants', index, "firstName", e.target.value)
                }
              />
            </Col>
            <Col md={5} className="form-group">
              <Label for={`last-name-infant-${index}`}>Last Name</Label>
              <Input
                type="text"
                className="form-control"
                id={`last-name-infants-${index}`}
                placeholder="Enter last name"
              //  value={formData['infant'][index]?.lastName}               
                onChange={(e) =>
                  handleChange('infants', index, "lastName", e.target.value)
                }
                onBlur={(e) =>
                  handleChange('infants', index, "lastName", e.target.value)
                }
              />
            </Col>
          </Row>
                        </form>
                      ))}                 
            <form hidden={true}>
              <h6>contact details</h6>
              <Row>
                <Col md={6} className="form-group">
                  <Label for="inputEmail4">Email</Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    onChange={() => handleEmailChange()} 
                  />
                </Col>
                <Col md={6} className="form-group col-md-6">
                  <Label for="inputnumber">Phone no:</Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="inputnumber"
                    onChange={() => handlePhoneChange()} 
                  />
                </Col>
              </Row>
            </form>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="review_box">
                  <div className="title-top">
                    <h5>Travel Insurance</h5>
                  </div>
                  <div className="flight_detail">
                    <Row>
                      <Col md={12}>
                        <div className="boxes">
                          <h6>
                            secure your travel with travel insurance for
                            {currSign}25/person
                          </h6>
                          <div className="form-check">
                            <Input
                              className="form-check-input radio_animated"
                              type="radio"
                              name="exampleRadios1"
                              id="exampleRadios1"
                              value="option1"
                              
                            />
                            <Label
                              className="form-check-label"
                              for="exampleRadios1"
                            >
                              yes, i want to secure my travel with insurance
                            </Label>
                          </div>
                          <div className="form-check">
                            <Input
                              className="form-check-input radio_animated"
                              type="radio"
                              name="exampleRadios1"
                              id="exampleRadios2"
                              value="option2"
                              checked
                            />
                            <Label
                              className="form-check-label"
                              for="exampleRadios2"
                            >
                              no, i do not want to secure my travel with
                              insurance
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} className="res-margin">
              <div className="sticky-cls-top">
                <div className="review-section">
                  <div className="review_box">
                    <div className="title-top">
                      <h5>booking summery</h5>
                    </div>
                    <div className="flight_detail">
                      <div className="summery_box">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>adults ({flightRequest?.adults} X {currSign}{flight?.price?.adultPP})                              
                              </td>
                              <td>{currSign}{flightRequest?.adults * flight?.price?.adultPP}</td>
                            </tr>
                            {(flightRequest?.children != 0 ?                              
                              <tr>
                              <td>
                             children ({flightRequest?.children} X {currSign}{flight?.price?.childPp})                             
                              </td>
                              <td>{currSign}{flightRequest?.children * flight?.price?.childPp}</td>
                            </tr>
                              : "")}     
                                {(flightRequest?.infant != 0 ?                              
                              <tr>
                              <td>
                              infants({flightRequest?.infant} X {currSign}{flight?.price?.infantPp})                             
                              </td>
                              <td>{currSign}{flightRequest?.infant * flight?.price?.infantPp}</td>
                            </tr>
                              : "")}                            
                            <tr>
                              <td>total taxes</td>
                              <td>{currSign}{                                
                              parseFloat(flight?.price?.adultTax) || 0 + parseFloat(flight?.price?.childTax) || 0 + parseFloat(flight?.price?.infantTax ) || 0
                             
                              }
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
                        <div className="grand_total">
                          <h5>
                            grand total: <span>{currSign}{flight?.price?.total}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="review_box">
                    <div className="flight_detail">
                      <div className="promo-section">
                        <div className="form-group mb-0">
                          <Label>have a coupon code?</Label>
                          <div className="input-group">
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Promo Code"
                            />
                            <div className="input-group-prepend">
                              <span className="input-group-text">apply</span>
                            </div>
                          </div>
                        </div>
                        <div className="promos">
                          <form>
                            <div className="form-check">
                              <Input
                                className="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios3"
                                value="option1"
                                checked
                              />
                              <div>
                                <Label
                                  className="form-check-label title"
                                  for="exampleRadios3"
                                >
                                  RICA500
                                </Label>
                                <Label
                                  className="form-check-label"
                                  for="exampleRadios3"
                                >
                                  Use RICA50, and get $50 off on first booking
                                </Label>
                              </div>
                            </div>
                            <div className="form-check">
                              <Input
                                className="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios4"
                                value="option2"
                              />
                              <div>
                                <Label
                                  className="form-check-label title"
                                  for="exampleRadios4"
                                >
                                  FLY10
                                </Label>
                                <Label
                                  className="form-check-label"
                                  for="exampleRadios4"
                                >
                                  Use FLY10, and get 10% off upto $50 on flight
                                  ticket bookings.
                                </Label>
                              </div>
                            </div>
                            <div className="form-check">
                              <Input
                                className="form-check-input radio_animated"
                                type="radio"
                                name="exampleRadios2"
                                id="exampleRadios5"
                                value="option2"
                              />
                              <div>
                                <Label
                                  className="form-check-label title"
                                  for="exampleRadios5"
                                >
                                  FLIGHT80
                                </Label>
                                <Label
                                  className="form-check-label"
                                  for="exampleRadios5"
                                >
                                  Upto 80% Off + Upto 40% Cashback on Flight
                                  booking & more + Extra 10% off via ICICI Cards
                                  (10th-13th Oct)
                                </Label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="continue-btn">
            <button
               onClick={handleApiCalls} disabled={loading}
              className="btn btn-solid"
              type="submit"
            >
              continue booking
            </button>
            <span>{ApiResponse}</span>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FlightConfirmation;

FlightConfirmation.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
