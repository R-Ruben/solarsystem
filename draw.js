var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.z = 1000;

var renderer = new THREE.WebGLRenderer({
    antialias: true
});

var bg = new THREE.TextureLoader().load( "textures/bg.jpg" );
scene.background = bg;

var light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

var controls = new THREE.OrbitControls(camera, document, renderer.domElement);
var grid = new THREE.GridHelper(1000, 10);

var universe = new Universe();
var planets = universe.solarsystem.planets;
var star = universe.solarsystem.star;

var render = function () {
    controls.update();
    universe.solarsystem.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

renderer.setClearColor('#111');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

render();