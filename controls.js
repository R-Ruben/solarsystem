function setSpeed() {
    universe.speed = parseInt($('.controls #speed').val());
}

function setGrid() {
    if ($('#grid').is(':checked')) {
        scene.add(grid);
    } else {
        scene.remove(grid);
    }
}

function addPlanet() {
    var planet = new Planet(universe.solarsystem.star);
    universe.solarsystem.planets.push(planet);
}

function removePlanet() {
    let planet = universe.solarsystem.planets[universe.solarsystem.planets.length - 1];
    if (planet.moons) {
        planet.moons.forEach(function (moon) {
            scene.remove(moon.group);
        });
    }
    scene.remove(planet.group);
    universe.solarsystem.planets.pop();
}

function setPlanetOrbitLines() {
    if ($('#planet_orbits').is(':checked')) {
        planets.forEach(function (planet) {
            planet.group.add(planet.line);
        });
    } else {
        planets.forEach(function (planet) {
            planet.group.remove(planet.line);
        });
    }
}

function setMoonOrbitLines() {
    if ($('#moon_orbits').is(':checked')) {
        planets.forEach(function (planet) {
            planet.moons.forEach(function (moon) {
                moon.group.add(moon.line);
            });
        });
    } else {
        planets.forEach(function (planet) {
            planet.moons.forEach(function (moon) {
                moon.group.remove(moon.line);
            });
        });
    }
}