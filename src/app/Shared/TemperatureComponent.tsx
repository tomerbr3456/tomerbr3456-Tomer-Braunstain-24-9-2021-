import { useTemperatureUnit } from "../reducers/userConfigurations";
import { fahrenheitToCelsius, temperatureUnitToUnicodeChar } from "./temperatureConverters";

export default function TemperatureComponent({ temperature }: { temperature: number }) {
    const tempUnit = useTemperatureUnit()

    return (
        <>
            <span>
                {tempUnit === "C" ? fahrenheitToCelsius(temperature) : temperature}
            </span>
            <span>
                {temperatureUnitToUnicodeChar[tempUnit]}
            </span>
        </>
    )
}