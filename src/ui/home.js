import { SearchBar } from "./components/SearchBar.js";

export const Home = (function () {
    const div = document.createElement("div");
    const appTitle = document.createElement("h1");

    div.className = "app";

    appTitle.textContent = "NIMBUS";
    appTitle.className = "app__title";

    div.appendChild(appTitle);
    div.appendChild(SearchBar);

    return div;
})();