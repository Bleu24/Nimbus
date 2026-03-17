import { Observer } from "../../classes/Observer.js";
import { Search, createElement } from "lucide";
import { WeatherService } from "../../services/WeatherService.js";

const sanitizeQuery = (query) => {
    const coords = query.split(", ");
    const [latitude, longitude] = coords;

    if (!(isNaN(latitude) || isNaN(longitude))) return WeatherService.reverse(latitude, longitude);
    else return query;
};

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
    search.placeholder = "latitude, longitude or city name";

    button.addEventListener("click", () => {

        let query = search.value;

        query = sanitizeQuery(query);

        if (query instanceof Promise) {
            query
                .then(location => WeatherService.weatherData(`${location.city}, ${location.countryName}, ${location?.postcode}`))
                .then(data => Observer.emit("search:fetch", data));
        } else {
            WeatherService.weatherData(query)
                .then(data => {
                    Observer.emit("search:fetch", data);
                });
        }
    });

    button.append(searchIcon);
    container.append(search, button);

    return container;


})();