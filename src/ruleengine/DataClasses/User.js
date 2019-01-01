export default class User {
    constructor(data) {  
        this.age = data.age;
        this.mood = data.mood;
        this.facedetected = data.facedetected;
        this.impairments = data.impairments;
        this.experience = data.experience;
        this.usagetime = data.usagetime;
    }
}