export class Observer {
    static listeners = {};

    static subscribe(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];

        this.listeners[event].push(callback);
    }

    static unsubscribe(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    static emit(event, data) {
        for (const cb of this.listeners[event]) {
            try {
                cb(data);
            } catch (err) {
                console.error("ObserverError: " + err);
            }
        }
    }
}