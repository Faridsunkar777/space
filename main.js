import * as THREE from 'three' ;
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import stars from "./src/img/stars.jpg"
import saturn from "./src/img/saturn.jpg"
import galaxy from "./src/img/galaxy.jpg"
import * as dat from "dat.gui";
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()

// camera

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1 ,1000)



// renderer

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)


renderer.setAnimationLoop(animate)

// orbit

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0,0,20)

orbit.update()


// html/css


// texture

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars,
])

const textureLoader = new THREE.TextureLoader();


// lights

const ambientLight = new THREE.AmbientLight(0xFFFFFF , 2)

scene.add(ambientLight)


const dLight = new THREE.DirectionalLight(0xFFFFFF, 2)

scene.add(dLight)

dLight.position.set(10,10,0)


// gui

const gui = new dat.GUI();

const option = {
    color : "#ffea00",
    wireframe:false,
    sphere2color : "#ffea00"
}

gui.addColor(option, "color").onChange(function(e){
    sphere.material.color.set(e)
    ring.material.color.set(e)
})
gui.addColor(option, "sphere2color").onChange(function(e){
    sphere3.material.color.set(e)
    sphere2.material.color.set(e)
    cone.material.color.set(e)
    cone1.material.color.set(e)
})


gui.add(option,'wireframe').onChange(function(e){
    sphere.material.wireframe = e
    sphere2.material.wireframe = e
    sphere3.material.wireframe = e
    ring.material.wireframe = e
    cone.material.wireframe = e
    cone1.material.wireframe = e
    oct.material.wireframe = e
    oct1.material.wireframe = e
})

const sphereGeo = new THREE.SphereGeometry(1,25,23)

const sphereMaterial = new THREE.MeshStandardMaterial({color:"purple" ,
    map:textureLoader.load(galaxy),
    
})

const sphere = new THREE.Mesh(sphereGeo ,sphereMaterial)

scene.add(sphere)




const ringGeo = new THREE.RingGeometry( 0.5, 2, 14 ); 
const ringMaterial = new THREE.MeshBasicMaterial( { color: "purple",
     side: THREE.DoubleSide,
    map:textureLoader.load(galaxy) } );
const ring = new THREE.Mesh( ringGeo, ringMaterial ); 

sphere.add( ring );


const sphereGeo2 = new THREE.SphereGeometry(1,25,23)

const sphereMaterial2 = new THREE.MeshStandardMaterial({color:"red" ,
    map:textureLoader.load(galaxy),
    
})

const sphere2 = new THREE.Mesh(sphereGeo2 ,sphereMaterial2)

sphere.add(sphere2)

sphere2.position.set(-10,0,0)

const sphereGeo3 = new THREE.SphereGeometry(1,25,23)

const sphereMaterial3 = new THREE.MeshStandardMaterial({color:"pink" ,
    map:textureLoader.load(galaxy),
    
})

const sphere3 = new THREE.Mesh(sphereGeo3 ,sphereMaterial3)

sphere.add(sphere3)

sphere3.position.set(10,0,0)


const coneGeometry = new THREE.ConeGeometry(5,10 ,35 )

const coneMaterial = new THREE.MeshStandardMaterial({map:textureLoader.load(galaxy),
    color :'green'
})


const cone = new THREE.Mesh(coneGeometry,coneMaterial);

sphere.add(cone)

const coneGeometry1 = new THREE.ConeGeometry(5,10 ,35)

const coneMaterial1 = new THREE.MeshStandardMaterial({map:textureLoader.load(galaxy),
    color :'green'
})


const cone1 = new THREE.Mesh(coneGeometry1,coneMaterial1);

sphere.add(cone1)


cone.position.set(0,10)
cone1.position.set(0,-10)

cone1.rotateZ(Math.PI / 1);


const octGeometry = new THREE.OctahedronGeometry(2, 0)

const octMaterial = new THREE.MeshBasicMaterial({color:"teal",
    map:textureLoader.load(galaxy)
})

const oct = new THREE.Mesh(octGeometry ,octMaterial)

sphere.add(oct)


oct.position.set(0,18)

const octGeometry1 = new THREE.OctahedronGeometry(2, 0)

const octMaterial1 = new THREE.MeshBasicMaterial({color:"teal",
    map:textureLoader.load(galaxy)
})

const oct1 = new THREE.Mesh(octGeometry1 ,octMaterial1)

sphere.add(oct1)


oct1.position.set(0,-18)

function animate() {

    sphere.rotateY(0.005)
    
    renderer.render(scene ,camera)
}

animate()

window.addEventListener('resize', function(){
    camera.aspect = this.window.innerWidth /this.window.innerHeight
    camera.updateProjectionMatrix
    renderer.setSize(window.innerWidth, window.innerHeight)
})