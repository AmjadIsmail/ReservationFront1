import { faAlignCenter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import sunrise from "@/public/images/icon/time/sunrise.png";
import sun from "@/public/images/icon/time/sun.png";
import night from "@/public/images/icon/time/night.png";
import { useState } from "react";
import ReactSlider from "react-slider";
import { Button, Input, Label } from "reactstrap";

const LeftSidebarSr = () => {
  const [range, setRange] = useState([0, 100]);

  const [open, setOpen] = useState(false);
  const [openStops, setOpenStops] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openAirlines, setOpenAirlines] = useState(false);
  const [openDepTime, setOpenDepTime] = useState(false);
  const [openArrTime, setOpenArrTime] = useState(false);

  const toggleCollapse = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const toggleCollapseStops = (e) => {
    e.preventDefault();
    setOpenStops(!openStops);
  };
  const toggleCollapsePrice = (e) => {
    e.preventDefault();
    setOpenPrice(!openPrice);
  };
  const toggleCollapseAirlines = (e) => {
    e.preventDefault();
    setOpenAirlines(!openAirlines);
  };
  const toggleCollapseDepTime = (e) => {
    e.preventDefault();
    setOpenDepTime(!openDepTime);
  };
  const toggleCollapseArrTime = (e) => {
    e.preventDefault();
    setOpenArrTime(!openArrTime);
  };

  return (
    <div className="left-sidebar">
      <div className="back-btn">back</div>
      <div className="search-bar">
        <Input type="text" placeholder="Search here.." />
        <i>
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div>
      <div
        className={`middle-part collection-collapse-block ${
          open ? "" : "open"
        }`}
      >
        <Button
          block
          color="transparent"
          onClick={toggleCollapse}
          className="section-title collapse-block-title d-flex justify-content-between shadow-none p-0 border-0 rounded-0"
        >
          <h5>latest filter</h5>
          {/* <Image
          src="../assets/images/icon/adjust.png"
          className="img-fluid 
          alt=""
        /> */}
          <FontAwesomeIcon icon={faAlignCenter} />
        </Button>
        <div
          className="collection-collapse-block-content"
          style={{
            maxHeight: open ? "0" : "1000px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${openStops ? "" : "open"}`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseStops}
              >
                stops
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openStops ? "0" : "110px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="free-d"
                    />
                    <Label className="form-check-label" for="free-d">
                      non stop
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="time"
                    />
                    <Label className="form-check-label" for="time">
                      1 stop
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="zara"
                    />
                    <Label className="form-check-label" for="zara">
                      2 stop
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${openPrice ? "" : "open"}`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapsePrice}
              >
                price
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openPrice ? "0" : "100px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="wrapper">
                  <div className="range-slider">
                    {/* <Input type="text" className="js-range-slider" value="" /> */}

                    <ReactSlider
                      id="range-slider"
                      className="horizontal-slider"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      defaultValue={range}
                      min={0}
                      max={100}
                      pearling
                      minDistance={0}
                      onChange={(value) => setRange(value)}
                      renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                      )}
                    />
                    <p>
                      Selected range: {range[0]} - {range[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${
                openAirlines ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseAirlines}
              >
                airlines
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openAirlines ? "0" : "330px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="wifi"
                    />
                    <Label className="form-check-label" for="wifi">
                      Qatar airways
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="spa"
                    />
                    <Label className="form-check-label" for="spa">
                      singapore airlines
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="pet"
                    />
                    <Label className="form-check-label" for="pet">
                      Nippon Airways
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="parking"
                    />
                    <Label className="form-check-label" for="parking">
                      Cathay Pacific
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="swimming"
                    />
                    <Label className="form-check-label" for="swimming">
                      Emirates
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="chinese"
                    />
                    <Label className="form-check-label" for="chinese">
                      Hainan Airlines
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="restaurant"
                    />
                    <Label className="form-check-label" for="restaurant">
                      Qantas Airways
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block open ${
                openDepTime ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseDepTime}
              >
                departure time
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openDepTime ? "0" : "330px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="suomi"
                    />
                    <Label className="form-check-label" for="suomi">
                      <Image src={sunrise} className="img-fluid me-1" alt="" />{" "}
                      morning (6am to 12pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="english"
                    />
                    <Label className="form-check-label" for="english">
                      <Image src={sun} className="img-fluid me-1" alt="" /> noon
                      (12pm to 6pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="sign"
                    />
                    <Label className="form-check-label" for="sign">
                      <Image src={night} className="img-fluid me-1" alt="" />{" "}
                      evening (after 6pm)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${
                openArrTime ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseArrTime}
              >
                arrival time
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openArrTime ? "0" : "130px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="morning"
                    />
                    <Label className="form-check-label" for="morning">
                      <Image src={sunrise} className="img-fluid me-1" alt="" />{" "}
                      morning (6am to 12pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="noon"
                    />
                    <Label className="form-check-label" for="noon">
                      <Image src={sun} className="img-fluid me-1" alt="" /> noon
                      (12pm to 6pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="evening"
                    />
                    <Label className="form-check-label" for="evening">
                      <Image src={night} className="img-fluid me-1" alt="" />
                      evening (after 6pm)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <h5>
          <span>i</span> need help
        </h5>
        <h4>856 - 215 - 211</h4>
        <h6>Monday to Friday 9.00am - 7.30pm</h6>
      </div>
    </div>
  );
};

export default LeftSidebarSr;
