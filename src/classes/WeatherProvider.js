export class WeatherProvider {

    constructor(provider) {
        this.provider = provider;
    }

    async getData(loc) {
        return this.provider.data(loc);
    }


}