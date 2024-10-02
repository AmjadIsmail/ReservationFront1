import Image from "next/image";
import cloud from "@/public/images/cloud.png";
import { Button, Col, Container, Input, Label } from "reactstrap";
import SearchForm from "@/components/common/Search.Form";

const HeaderHome = () => {
  return (
    <>
      <div className="headerHome cab-section flight-section p-0">
        <div className="cloud">
          <Image
            src={cloud}
            width="50"
            height="50"
            alt=""
            className="bg-img d-none"
          />
        </div>
        <Container>
          <Col lg={6}>
            <div className="cab-content hContent">
              <div className="w-100">
                <div className="top-cls d-none d-sm-inline-block">#rica</div>
                <h2 className="text-uppercase fw400 mbLg10">
                  great journey begins
                </h2>
                <h3 className="text-uppercase fw800 mbLg30 mb20">
                  with a small step
                </h3>

                <SearchForm />
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default HeaderHome;
