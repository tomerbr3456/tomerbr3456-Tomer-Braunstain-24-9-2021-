import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch } from "react-redux";
import {
  setTempUnit,
  useTemperatureUnit,
} from "../../reducers/userConfigurations";

export default function TempUnitToggleButtons() {
  const tempUnit = useTemperatureUnit();

  const dispatch = useDispatch();

  const handleSetTemp = (event: any, newTempUnit: any) => {
    dispatch(setTempUnit(newTempUnit));
  };

  return (
    <ToggleButtonGroup
      value={tempUnit}
      exclusive
      onChange={handleSetTemp}
      aria-label="text alignment"
    >
      <ToggleButton
        style={{ height: 40 }}
        value="C"
        aria-label="Celsius"
        disabled={tempUnit === "C"}
      >
        <span>&#8451;</span>
      </ToggleButton>
      <ToggleButton
        style={{ height: 40 }}
        value="F"
        aria-label="Fahrenheit"
        disabled={tempUnit === "F"}
      >
        <span>&#8457;</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
