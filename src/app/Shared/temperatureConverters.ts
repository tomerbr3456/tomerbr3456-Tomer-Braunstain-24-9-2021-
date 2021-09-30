export const fahrenheitToCelsius = (f: number) => Math.round((5/9 * (f - 32)) / 0.5) * 0.5

export const temperatureUnitToUnicodeChar = {
    C: "\u2103",
    F: "\u2109",
}