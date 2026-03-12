import { Search, createElement } from "lucide";
import { WeatherService } from "../../services/WeatherService.js";

export const SearchBar = (function () {

    const container = document.createElement("div");
    const search = document.createElement("input");
    const button = document.createElement("button");
    const searchIcon = createElement(Search);


    container.className = "app__search";
    search.className = "app__searchBox";
    button.className = "app__searchBtn";

    search.type = "search";
    search.id = "searchBox";

    button.addEventListener("click", (e) => {

        const query = search.value;

        WeatherService.weatherData(query)
            .then(data => {
                console.log(data);
            });

    });

    button.append(searchIcon);
    container.append(search, button);

    return container;


})();