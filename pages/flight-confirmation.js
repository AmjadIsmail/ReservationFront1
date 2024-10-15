import Meta from "@/components/common/Meta";
import BreadcrumbSectionFc from "@/components/flightConfirmation/BreadcrumbSection.Fc";
import FrontLayout from "@/components/layouts/Front.Layout";
import Image from "next/image";
import img1 from "@/public/images/flights/airlines/1.png";
import { Col, Container, Input, Label, Row } from "reactstrap";

const FlightConfirmation = () => {
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
                  <div className="flight_detail">
                    <Row>
                      <Col md={3}>
                        <div className="logo-sec">
                          <Image src={img1} className="img-fluid" alt="" />
                          <span className="title">Egyptair</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="airport-part">
                          <div className="airport-name">
                            <h6>
                              DXB <span>17.00</span>
                            </h6>
                            <p>sat, 12 oct 2019</p>
                          </div>
                          <div className="airport-progress">
                            <i className="fas fa-plane-departure float-start"></i>
                            <i className="fas fa-plane-arrival float-end"></i>
                          </div>
                          <div className="airport-name arrival">
                            <h6>
                              CDG <span>17.00</span>
                            </h6>
                            <p>sat, 12 oct 2019</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="duration">
                          <div>
                            <h6>20h 45m</h6>
                            <p>1 stop</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
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
                              airline fee : <span>$2012</span>
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
                              airline fee : <span>$2012</span>
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
                              Check-in Baggage : <span>15 kg</span>
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
                        <form>
                          <h6>adult 1</h6>
                          <Row>
                            <Col md={2} className="form-group">
                              <Label for="inputState">title</Label>
                              <Input type="select" className="form-control">
                                <option selected>Choose...</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                              </Input>
                            </Col>
                            <Col md={5} className="form-group">
                              <Label for="first">first name</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="firstt"
                              />
                            </Col>
                            <Col md={5} className="form-group">
                              <Label for="last">last name</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="lastt"
                              />
                            </Col>
                          </Row>
                        </form>
                        <form>
                          <h6>adult 2</h6>
                          <Row>
                            <Col md={2} className="form-group">
                              <Label for="inputState">title</Label>
                              <Input type="select" className="form-control">
                                <option selected>Choose...</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                              </Input>
                            </Col>
                            <Col md={5} className="form-group">
                              <Label for="first">first name</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="firstt"
                              />
                            </Col>
                            <Col md={5} className="form-group">
                              <Label for="last">last name</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="lastt"
                              />
                            </Col>
                          </Row>
                        </form>
                        <form>
                          <h6>contact details</h6>
                          <Row>
                            <Col md={6} className="form-group">
                              <Label for="inputEmail4">Email</Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                              />
                            </Col>
                            <Col md={6} className="form-group col-md-6">
                              <Label for="inputnumber">Phone no:</Label>
                              <Input
                                type="number"
                                className="form-control"
                                id="inputnumber"
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
                            $25/person
                          </h6>
                          <div className="form-check">
                            <Input
                              className="form-check-input radio_animated"
                              type="radio"
                              name="exampleRadios1"
                              id="exampleRadios1"
                              value="option1"
                              checked
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
                              <td>adults (3 X $2501)</td>
                              <td>$250</td>
                            </tr>
                            <tr>
                              <td>total taxes</td>
                              <td>$25</td>
                            </tr>
                            <tr>
                              <td>Insurance</td>
                              <td>$15</td>
                            </tr>
                            <tr>
                              <td>Convenience fee</td>
                              <td>$18</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="grand_total">
                          <h5>
                            grand total: <span>$2500</span>
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
              onclick="window.location.href='flight-booking-addons.html'"
              className="btn btn-solid"
              type="submit"
            >
              continue booking
            </button>
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
