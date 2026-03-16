import "normalize.css";
import "./styles.css";
import "./ui/home.css";

import { Home } from "./ui/home.js";
import { WeatherService } from "./services/WeatherService.js";


document.body.appendChild(Home);

WeatherService.initialize();