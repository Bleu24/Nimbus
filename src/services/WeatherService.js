import { WeatherProvider } from "../classes/WeatherProvider.js";
import { VisualCrossing } from "../classes/VisualCrossing.js";
import { Observer } from "../classes/Observer.js";
import { BigDataCloud } from "../classes/BigDataCloud.js";

const getCoordinates = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
            pos => res(pos.coords),
            err => rej(err)
        );
    });
};


export const WeatherService = (function () {

    const weatherProvider = new WeatherProvider(new VisualCrossing(), new BigDataCloud());

    const weatherData = (location) => {
        return weatherProvider.getData(location);
    };

    const reverse = (lat, long) => {
        return weatherProvider.reverse(lat, long);
    };

    const getDays = (loc) => {
        return weatherProvider.getDays(loc);
    };

    const initialize = () => {

        getCoordinates()
            .then(coordsData => weatherProvider.reverse(coordsData.latitude, coordsData.longitude)) //coordsData is position.coords
            .then(location => weatherProvider.getData(`${location.city}, ${location.countryName}, ${location?.postcode}`))
            .then(data => Observer.emit("app:init", data));
    };



    return {
        weatherData,
        reverse,
        getDays,
        initialize
    };

})();