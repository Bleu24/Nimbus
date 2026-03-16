export class VisualCrossing {


    static #API_KEY = process.env.VISUAL_CROSSING_API_KEY;

    constructor() { }

    async getData(loc) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=uk&key=${VisualCrossing.#API_KEY}&contentType=json`);

            if (!response.ok) throw new Error("Error: " + response.status);

            const data = await response.json();

            return data;

        } catch (error) {
            console.error("VisualCrossing API: " + error);
        }
    }
}