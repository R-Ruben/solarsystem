class SolarSystem {

    constructor() {
        this.generate();
    }

    generate() {
        this.size = 100;
        this.amount_planets = 9;
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
        this.angle = rnd(0,180);

        this.star = new Star(this);
        this.planets = [];
        this.generatePlanets();
    }

    update() {
        this.star.update();
        this.planets.forEach(function(planet){
            planet.update();
        });
    }

    generatePlanets() {
        for (var i = 0; i < this.amount_planets; i++) {
            this.planets.push(new Planet(this.star));
        }
    }
}