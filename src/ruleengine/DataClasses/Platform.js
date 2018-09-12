export default class Platform {
    constructor(data) {
        this.deviceid = data.deviceid;
        this.name = data.name;
        this.fontscale = data.fontscale;
        this.model = data.model;
        this.systemname = data.systemname;
        this.systemversion = data.systemversion;
        this.timezone = data.timezone;
        this.tablet = data.tablet;
        this.timestamp = data.timestamp;
        this.screenwidth = data.screenwidth;
        this.screenheight = data.screenheight;
        
    }
}