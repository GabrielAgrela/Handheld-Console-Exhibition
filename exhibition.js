import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'; //Threejs lib
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'; //Mouse Controls
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'; // Model loader

var exhibitionScene = document.getElementById("Exhibition");
var CANVAS_WIDTH = document.getElementById("carousel_a5f2").clientWidth*.7;
var CANVAS_HEIGHT = document.getElementById("carousel_a5f2").clientHeight;

// SCENE
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );


// CAMERA 
const camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );
camera.position.set(0, 0, 2);

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

// controls
var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 5;
controls.enablePan = false;

// load Console Model and set its position
const loader = new GLTFLoader();
var console;
loader.load( 'https://gabrielagrela.github.io/Handheld-Console-Exhibition/models/ps2/scene.gltf', function ( gltf ) 
{
    console=gltf.scene;
    scene.add( console);
    animate();
}, undefined, function ( error ) {
    console.error( error );
} );

// LIGHTS
var spotLight1 = new THREE.SpotLight(0xffffff);
spotLight1.position.set(0, 10, 10);
spotLight1.intensity = 2;
scene.add(spotLight1);

var ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

// Console animation
const animate = function () {
    requestAnimationFrame( animate );
    /*console.rotation.x += 0.002;
    console.rotation.y += 0.002;
    console.rotation.z += 0.002;*/
    scene.background = new THREE.Color( 0x1F1520 );
    renderer.render( scene, camera ); //render per frame
};

// FINISH SCENE SETUP
exhibitionScene.appendChild(renderer.domElement); // append scene to exhibitionScene div

renderer.render(scene, camera); //first render