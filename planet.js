class Planet {

    constructor(star) {
        this.star = star;
        this.group = new THREE.Object3D();
        this.generate();
    }

    generate() {
        this.size = rnd(8, 25);
        this.position = {
            x: rnd(this.star.size, 500),
            y: rnd(-5, 10),
            z: 0
        };
        this.hexString = rnd(0, 16777215).toString(16);
        this.color = parseInt(this.hexString, 16);
        this.moons = [];


        this.geometry = new THREE.SphereGeometry(this.size, 20, 20);
        this.geometry.faces.forEach(face => {
            face.color.setRGB(Math.random(), Math.random(), Math.random());
        });
        this.material = new THREE.MeshLambertMaterial({
            vertexColors: THREE.FaceColors,
            color: this.color
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.group.add(this.mesh);

        this.distanceToStar = this.mesh.position.distanceTo(this.star.mesh.position);
        this.rotation_speed = (1 / this.distanceToStar) / 100;

        this.points = [];
        this.line_material = new THREE.LineBasicMaterial({
            color: 0x555555,
        });
        
        this.xRadius = this.star.size+this.distanceToStar + rnd(0,this.distanceToStar/4);
        this.yRadius = this.star.size+this.distanceToStar;
        
        this.curve = new THREE.EllipseCurve(
            this.star.position.x, this.star.position.x, // ax, aY
            this.xRadius, this.yRadius,// xRadius, yRadius
            0, Math.PI*2, // aStartAngle, aEndAngle
            false, // aClockwise
            rnd(0,Math.PI*2)// aRotation
        );
        
        this.points = this.curve.getPoints(this.distanceToStar*100);
        this.line_geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new THREE.Line(this.line_geometry, this.line_material);
        this.group.add(this.line);

        this.rotation = rndFloat(0,Math.PI/8);
        this.group.rotation.y = this.rotation;
        this.group.rotation.x = (Math.PI * 2) / 360 * this.star.solarsystem.angle;

        // GENERATE MOONS
        if(rnd(1,3) == 1) {
            this.amount_moons = rnd(1,5);
            for(var i = 0; i < this.amount_moons;i++){
                this.moons.push(new Moon(this));
            }

        }
        scene.add(this.group);
        this.curve_position = 0;
    }

    update() {
        this.mesh.rotation.z += 0.001 * universe.speed;
        this.mesh.position.x = this.points[this.curve_position].x;
        this.mesh.position.y = this.points[this.curve_position].y;
        
        if (this.curve_position >= this.points.length - universe.speed) {
            this.curve_position = 0;
        } else {
            this.curve_position += universe.speed;
        }
        
        this.moons.forEach(function(moon){
            moon.update();
            moon.group.rotation.x = (Math.PI * 2) / 360 * universe.solarsystem.angle;
        });
    }

}