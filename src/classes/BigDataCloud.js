export class BigDataCloud {

    static #API_KEY = process.env.BIG_DATA_CLOUD_API_KEY;

    constructor() { }

    async getData(lat, long) {
        try {
            const response = await fetch(`https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${long}&key=${BigDataCloud.#API_KEY}`);

            if (!response.ok) throw new Error(response.status);

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("API Error: " + error);
        }
    }


}