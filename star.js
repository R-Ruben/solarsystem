class Star {

    constructor(solarsystem) {
        this.generate();
        this.solarsystem = solarsystem;
    }
    color(picked) {
        switch (picked) {
            case 1: // WHITE
                return 0xEEEEEE;
            case 2: // ORANGE
                return 0xFF9900;
            case 3: //GREEN
                return 0x00DD66;
            case 4: //RED
                return 0xFF2222;
            case 5: //BLUE
                return 0x0055FF;
        }
    }
    generate() {
        this.size = rnd(50,100);
        this.color_picked = this.color(rnd(1, 5));
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.geometry = new THREE.SphereGeometry(this.size, 30, 30);
        this.geometry.faces.forEach(face => {
            face.color.setRGB(Math.random(), Math.random(), Math.random());
        });
        this.material = new THREE.MeshLambertMaterial({
            vertexColors: THREE.FaceColors,
            emissive: this.color_picked
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);

        scene.add(this.mesh);

        this.spriteMaterial = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('textures/glow.png'),
            color: this.color_picked,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        this.sprite = new THREE.Sprite(this.spriteMaterial);
        this.sprite.scale.set(this.size*4, this.size*4, 1.0);
        this.mesh.add(this.sprite);


        this.light = new THREE.PointLight(this.color_picked, 5, 0, 2);
        this.light.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(this.light);
    }

    update() {
        this.mesh.rotation.z += 0.001 * universe.speed;
    }

}