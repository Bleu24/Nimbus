import { Observer } from "../classes/Observer.js";
import { WeatherService } from "../services/WeatherService.js";
import { SearchBar } from "./components/SearchBar.js";
import { createCard, createHeroCard } from "./components/createCard.js";
import { CloudRain, createElement, Sun, Eye, Wind } from "lucide";

export const Home = (function () {
    const div = document.createElement("div");
    const days = document.createElement("div");
    const appTitle = document.createElement("h1");

    div.className = "app";
    days.className = "app__days";

    appTitle.textContent = "NIMBUS";
    appTitle.className = "app__title";

    const heroCard = createHeroCard();
    const createPrecipCard = createCard("trivial");
    const createUvCard = createCard("trivial");
    const createVisibilityCard = createCard("trivial");
    const createWindCard = createCard("trivial");

    div.appendChild(appTitle);
    div.appendChild(SearchBar);

    Observer.subscribe("search:fetch", (data) => {

        // Assumes div has already children. Search is for updating the ui
        Array.from(div.children)
            .filter(child => child.className.includes("card"))
            .forEach(child => child.remove());

        Array.from(days.children)
            .filter(child => child.className.includes("day"))
            .forEach(child => child.remove());

        const precipCard = createPrecipCard({ label: "Precipitation", data: data.currentConditions.precip, icon: createElement(CloudRain), unit: "mm" });
        const uvCard = createUvCard({ label: "UV Index", data: data.currentConditions.uvindex, icon: createElement(Sun) });
        const visibilityCard = createVisibilityCard({ label: "Visibility", data: data.currentConditions.visibility, icon: createElement(Eye), unit: "miles" });
        const windCard = createWindCard({ label: "Winds", data: data.currentConditions.windspeed, icon: createElement(Wind), unit: "mph" });
        const dataDates = data.days.slice(0, 7);

        for (const data of dataDates) {
            const card = createCard("per-day", data);
            days.appendChild(card);
        }

        heroCard.render(data);
        div.append(
            heroCard.el,
            precipCard,
            uvCard,
            visibilityCard,
            windCard,
            days
        );
    });

    Observer.subscribe("app:init", (data) => {
        const precipCard = createPrecipCard({ label: "Precipitation", data: data.currentConditions.precip, icon: createElement(CloudRain), unit: "mm" });
        const uvCard = createUvCard({ label: "UV Index", data: data.currentConditions.uvindex, icon: createElement(Sun) });
        const visibilityCard = createVisibilityCard({ label: "Visibility", data: data.currentConditions.visibility, icon: createElement(Eye), unit: "mi" });
        const windCard = createWindCard({ label: "Winds", data: data.currentConditions.windspeed, icon: createElement(Wind), unit: "mph" });

        const dataDates = data.days.slice(0, 7);

        for (const data of dataDates) {
            const card = createCard("per-day", data);
            days.appendChild(card);
        }

        heroCard.render(data);
        div.append(
            heroCard.el,
            precipCard,
            uvCard,
            visibilityCard,
            windCard,
            days
        );
    });

    return div;
})();