import { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const PassengersQty = ({ onFocus }) => {
  const [valueAdult, setValueAdult] = useState(1);
  const [valueChildren, setValueChildren] = useState(1);
  const [valueInfant, setValueInfant] = useState(1);

  const handleIncrementAdult = () => {
    setValueAdult((prevValue) => prevValue + 1);
  };

  const handleDecrementAdult = () => {
    setValueAdult((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleChangeAdult = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueAdult(newValue);
    }
  };

  const handleIncrementChildren = () => {
    setValueChildren((prevValue) => prevValue + 1);
  };

  const handleDecrementChildren = () => {
    setValueChildren((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleChangeChildren = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueChildren(newValue);
    }
  };

  const handleIncrementInfant = () => {
    setValueChildren((prevValue) => prevValue + 1);
  };

  const handleDecrementInfant = () => {
    setValueChildren((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleChangeInfant = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueInfant(newValue);
    }
  };

  return (
    <>
      <div className="showPassengers" onFocus={onFocus}>
        <div className="rowSt">
          <Label>adult</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleDecrementAdult}
            >
              -
            </Button>
            <Input
              type="text"
              value={valueAdult}
              onChange={handleChangeAdult}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleIncrementAdult}
            >
              +
            </Button>
          </div>
        </div>
        <div className="rowSt mt10">
          <Label>children</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleDecrementChildren}
            >
              -
            </Button>
            <Input
              type="text"
              value={valueChildren}
              onChange={handleChangeChildren}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleIncrementChildren}
            >
              +
            </Button>
          </div>
        </div>
        <div className="rowSt mt10">
          <Label>Infant</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleDecrementInfant}
            >
              -
            </Button>
            <Input
              type="text"
              value={valueInfant}
              onChange={handleChangeInfant}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={handleIncrementInfant}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flightClass">
          <Label check className="mt7 mb4">
            <Input name="flightClass" type="radio" className="me10" /> economy
          </Label>
          <Label check className="mt7 mb4">
            <Input name="flightClass" type="radio" className="me10" /> premium
          </Label>
          <Label check className="mt7 mb4">
            <Input name="flightClass" type="radio" className="me10" /> business
          </Label>
        </div>

        <div className="bottomPart">
          <Button color="transparent" className="btn">
            apply
          </Button>
        </div>
      </div>
    </>
  );
};

export default PassengersQty;
