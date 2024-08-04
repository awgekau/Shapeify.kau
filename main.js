import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import gsap from 'gsap';

//Scene
const scene = new THREE.Scene();

// Create our sphere
const geometry = new THREE.SphereGeometry( 9, 100, 100 ); 
const material = new THREE.MeshStandardMaterial( { 
  color: "hotpink",
  roughness: 1} ); 
const mesh = new THREE.Mesh( geometry, material ); 
scene.add(mesh);

// const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
// const material = new THREE.MeshStandardMaterial( { 
//     color: "hotpink",
//     roughness: 1} );
// const mesh = new THREE.Mesh( geometry, material ); 
// scene.add(mesh);


//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Lights
// const light = new THREE.SpotLight(0xffffff, 1, 500);
// light.intensity = 100; 
// light.distance = 1000; 
// light.position.set(0, 10, 10);
// scene.add(light);
const spotLight1 = new THREE.SpotLight(0xffffff, 50, 1000, Math.PI / 4, 0.5, 2);
spotLight1.position.set(0, 10, 10);
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff, 100, 500, Math.PI / 4, 0.5, 2);
spotLight2.position.set(10, 10, 10); 
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 100, 500, Math.PI / 4, 0.5, 2);
spotLight3.position.set(-10, 10, 10); 
scene.add(spotLight3);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 20;
scene.add(camera);



//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(3)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate=true;
controls.autoRotate = 5;
//Resize
window.addEventListener('resize', () => {  
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width/sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()

//timeline magic

const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0,x:0,y:0}, {z:1,x:1,y:1})
tl.fromTo('nav', {y:'-100%'}, {y:'0%'});
tl.fromTo('.title',{opacity: 0},{opacity:1});

//Mouse animator color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup",() => (mouseDown = false))
window.addEventListener("mousemove", (e)=>{
  if (mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width) * 255),
      Math.round((e.pageY/sizes.height) * 255), 
      150]

      //lets animate
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
      gsap.to(mesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b:newColor.b
      })
      
      
      
    
  }
})

//spotify embed
document.getElementById('musicButton').addEventListener('click', function() {
  const spotifyEmbed = document.querySelector('.spotify-embed');
  spotifyEmbed.classList.toggle('visible');

});