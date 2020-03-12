class Universe {

    constructor() {
        this.generate();
    }

    generate() {
        this.speed = parseInt($('.controls #speed').val());
        this.solarsystem = new SolarSystem();
    }


    

}