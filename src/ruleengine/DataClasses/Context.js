export default class Context {
    constructor(data) {
        this.deviceid = data.deviceid;
        this.light = data.light;
        this.time = data.time;
        this.activity = data.activity;
        this.loudness = data.loudness;
        this.in_vehicle = data.in_vehicle;
        this.on_bicycle = data.on_bicycle;
        this.on_foot = data.on_foot;
        this.running = data.running;
        this.walking = data.walking;
        this.still = data.still;
        this.tilting = data.tilting;
        this.unknown = data.unknown;
        this.mostProbableActivity = data.mostProbableActivity;
        this.mostProbableActivityConfidence = data.mostProbableActivityConfidence;
        this.timestamp = data.timestamp;
        this.batteryLevel = data.batteryLevel;
        this.charging = data.charging
    }
}