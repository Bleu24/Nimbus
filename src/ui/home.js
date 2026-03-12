import { WeatherService } from "../services/WeatherService.js";

export const Home = (function () {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const search = document.createElement("input");
    const button = document.createElement("button");

    div.className = "app";

    search.type = "search";
    search.placeholder = "Manila";

    button.addEventListener("click", (e) => {

        const query = search.value;

        WeatherService.weatherData(query)
            .then(data => {
                p.textContent = data.currentConditions.temp;
                console.log(data);
            });

    });


    return div;
})();