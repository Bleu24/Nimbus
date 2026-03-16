export class WeatherProvider {

    constructor(provider, geocoder) {
        this.provider = provider;
        this.geocoder = geocoder;
    }

    async getData(loc) {
        return this.provider.getData(loc);
    }

    async reverse(lat, long) {
        return this.geocoder.getData(lat, long);
    }

    async getDays(loc) {
        return this.provider.getDays(loc);
    }


}