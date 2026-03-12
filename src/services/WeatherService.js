import { WeatherProvider } from "../classes/WeatherProvider.js";
import { VisualCrossing } from "../classes/VisualCrossing.js";

export const WeatherService = (function () {

    const weatherProvider = new WeatherProvider(new VisualCrossing());

    const weatherData = (location) => {
        return weatherProvider.getData(location);
    };


    return {
        weatherData
    };

})();