class Moon {

    constructor(planet) {
        this.planet = planet;
        this.group = new THREE.Object3D();
        this.generate();
    }

    generate() {
        this.size = rndFloat(0.5, 5);
        this.radius = 10;
        this.position = {
            x: this.planet.mesh.position.x + rnd(5, 20),
            y: this.planet.mesh.position.y,
            z: this.planet.mesh.position.z
        };
        this.hexString = rnd(0, 16777215).toString(16);
        this.color = parseInt(this.hexString, 16);



        this.geometry = new THREE.SphereGeometry(this.size, 50, 50);
        this.geometry.faces.forEach(face => {
            face.color.setRGB(Math.random(), Math.random(), Math.random());
        });
        this.material = new THREE.MeshLambertMaterial({
            vertexColors: THREE.FaceColors,
            color: this.color
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.distanceToPlanet = this.mesh.position.distanceTo(this.planet.mesh.position);
        this.rotation_speed = (1 / this.distanceToPlanet) / 100;
        this.group.add(this.mesh);


        this.points = [];
        this.line_material = new THREE.LineBasicMaterial({
            color: 0x555555,
        });
        this.curve = new THREE.EllipseCurve(
            this.planet.mesh.position.x, this.planet.mesh.position.y, // ax, aY
            this.planet.size + this.radius, this.planet.size + this.radius, // xRadius, yRadius
            0, Math.PI * 2, // aStartAngle, aEndAngle
            false, // aClockwise
            0, // aRotation
        );
        this.points = this.curve.getPoints(4000);
        this.line_geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new THREE.Line(this.line_geometry, this.line_material);
        this.group.add(this.line);

        scene.add(this.group);

        this.curve_position = 0;
    }
    update() {
        var vect = new THREE.Vector3();
        this.planet.mesh.getWorldPosition(vect);
        var target = this.planet.mesh.parent.worldToLocal(vect);
        this.line.position.x = target.x - this.planet.distanceToStar;
        this.line.position.y = target.y;
        this.line.position.z = target.z;
        this.group.rotation.y = this.planet.rotation;
        this.mesh.rotation.y += 0.01;
        this.group.rotateY(this.rotation_speed);

        this.mesh.position.x = this.points[this.curve_position].x + this.line.position.x;
        this.mesh.position.y = this.points[this.curve_position].y + this.line.position.y;

        if (this.curve_position >= this.points.length - universe.speed) {
            this.curve_position = 0;
        } else {
            this.curve_position += universe.speed;
        }
    }

}