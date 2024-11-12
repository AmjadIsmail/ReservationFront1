import FrontNavOnly from "@/components/navbars/Front.NavOnly";
import {
  faCoffee,
  faUser,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Collapse,
  Input,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const FrontNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="frontNavbar">
        <Navbar expand="lg" container {...props}>
          <NavbarBrand href="/">
            Reservation<span className="opacity-50">System</span>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <div className="d-flex justify-content-end p-3">
              <NavbarToggler onClick={toggle}>
                <FontAwesomeIcon icon={faXmark} />
              </NavbarToggler>
            </div>

            <FrontNavOnly {...props} />
          </Collapse>

          <div className="actions-nav">
           
            <Input type="select">
              <option value="volvo">GBP</option>              
            </Input>
            <Input type="select" className="ms15">
              <option value="volvo">ENG</option>             
            </Input>
            <Button
              size="md"
              color="transparent"
              className="ms15"             
            >
              <FontAwesomeIcon icon={faUser} />
            </Button>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default FrontNavbar;
