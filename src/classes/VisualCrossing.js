export class VisualCrossing {


    static #API_KEY = "D759WJHZQVRR57EJTNAWV2WG5";

    constructor() { }

    async data(loc) {
        try {
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=us&key=${VisualCrossing.#API_KEY}&contentType=json`);

            if (!res.ok) throw new Error("Error: " + res.status);

            const data = await res.json();

            return data;

        } catch (err) {
            console.error(err);
        }
    }
}