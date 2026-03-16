import partlyCloudyDaySvg from "../../assets/icons/partly-cloudy-day.svg";
import partlyCloudyNightSvg from "../../assets/icons/partly-cloudy-night.svg";
import clearDaySvg from "../../assets/icons/clear-day.svg";
import clearNightSvg from "../../assets/icons/clear-night.svg";
import rainSvg from "../../assets/icons/rain.svg";
import rainSnowSvg from "../../assets/icons/rain-snow.svg";
import rainSnowShowersDaySvg from "../../assets/icons/rain-snow-showers-day.svg";
import rainSnowShowersNightSvg from "../../assets/icons/rain-snow-showers-night.svg";
import showersDaySvg from "../../assets/icons/showers-day.svg";
import showersNightSvg from "../../assets/icons/showers-night.svg";
import sleetSvg from "../../assets/icons/sleet.svg";
import snowSvg from "../../assets/icons/snow.svg";
import snowShowersDaySvg from "../../assets/icons/snow-showers-day.svg";
import fogSvg from "../../assets/icons/fog.svg";
import hailSvg from "../../assets/icons/hail.svg";
import windSvg from "../../assets/icons/wind.svg";
import thunderSvg from "../../assets/icons/thunder.svg";
import thunderRainSvg from "../../assets/icons/thunder-rain.svg";
import thunderShowersDaySvg from "../../assets/icons/thunder-showers-day.svg";
import thunderShowersNightSvg from "../../assets/icons/thunder-showers-night.svg";
import cloudySvg from "../../assets/icons/cloudy.svg";
import snowShowersNightSvg from "../../assets/icons/snow-showers-night.svg";
import { getDay } from "date-fns";

const svgLibrary = {
    "clear-day": clearDaySvg,
    "clear-night": clearNightSvg,
    "cloudy": cloudySvg,
    "fog": fogSvg,
    "hail": hailSvg,
    "partly-cloudy-day": partlyCloudyDaySvg,
    "partly-cloudy-night": partlyCloudyNightSvg,
    "rain-snow-showers-day": rainSnowShowersDaySvg,
    "rain-snow-showers-night": rainSnowShowersNightSvg,
    "rain-snow": rainSnowSvg,
    "rain": rainSvg,
    "showers-day": showersDaySvg,
    "showers-night": showersNightSvg,
    "sleet": sleetSvg,
    "snow-showers-day": snowShowersDaySvg,
    "snow-showers-night": snowShowersNightSvg,
    "snow": snowSvg,
    "wind": windSvg,
    "thunder": thunderSvg,
    "thunder-rain": thunderRainSvg,
    "thunder-showers-day": thunderShowersDaySvg,
    "thunder-showers-night": thunderShowersNightSvg,
};

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export function createCard(mode = "", data = {}) {

    if (mode === "trivial") {
        return ({ label, icon, data }) => {
            const container = document.createElement("div");
            const iconHolder = document.createElement("div");
            const info = document.createElement("p");

            container.className = `card__${label.toLowerCase()}`;
            iconHolder.className = `icon__${label.toLowerCase()}`;
            info.textContent = `${label}: ${data ? data : "N/A"}`;

            iconHolder.append(icon);

            container.append(iconHolder, info);
            return container;
        };
    }

    const isModeNullish = mode || true;

    if (isModeNullish || mode === "per-day") {
        // Per day basis
        const container = document.createElement("div");
        const day = document.createElement("h1");
        const iconHolder = document.createElement("div");
        const avgTempHolder = document.createElement("p");
        const feelsLikeHolder = document.createElement("p");
        const tempsHolder = document.createElement("div");

        container.className = `card__${days[getDay(data.datetime)].toLowerCase()}`;
        day.className = "card__day";
        iconHolder.className = "card__icon";
        avgTempHolder.className = "card__temp";
        feelsLikeHolder.className = "card__feelsLike";
        tempsHolder.className = "card__tempsHolder";

        day.textContent = days[getDay(data.datetime)];
        iconHolder.innerHTML = svgLibrary[data.icon];
        feelsLikeHolder.textContent = `Feels Like: ${data.feelslike} C`;
        avgTempHolder.textContent = `Temp: ${data.temp}`;

        tempsHolder.append(avgTempHolder, feelsLikeHolder);

        container.append(
            day,
            iconHolder,
            tempsHolder
        );

        return container;
    }
}



export function createHeroCard() {
    const container = document.createElement("div");
    const header = document.createElement("div");
    const iconHolder = document.createElement("div");
    const avgTempHolder = document.createElement("h1");
    const feelsLikeHolder = document.createElement("p");
    const conditionsHolder = document.createElement("p");
    const timezoneHolder = document.createElement("h3");
    const addressHolder = document.createElement("h2");

    const iconAndTempContainer = document.createElement("div");

    container.className = "card hero";
    iconHolder.className = "card__icon";
    avgTempHolder.className = "card__temp";
    feelsLikeHolder.className = "card__feelsLike";
    conditionsHolder.className = "card__conditions";
    timezoneHolder.className = "card__timezone";
    addressHolder.className = "card__address";
    iconAndTempContainer.className = "card__tempContainer";
    header.className = "card__header";


    header.append(timezoneHolder, addressHolder);
    iconAndTempContainer.append(iconHolder, avgTempHolder);

    container.append(
        header,
        iconAndTempContainer,
        conditionsHolder,
        feelsLikeHolder
    );

    const render = (data) => {
        timezoneHolder.textContent = data.timezone;
        addressHolder.textContent = data.resolvedAddress;
        iconHolder.innerHTML = svgLibrary[data.currentConditions.icon];
        avgTempHolder.textContent = `${data.currentConditions.temp} C`;
        conditionsHolder.textContent = data.currentConditions.conditions;
        feelsLikeHolder.textContent = `Feels like: ${data.currentConditions.feelslike} C`;
    };



    return {
        el: container,
        render
    };
}