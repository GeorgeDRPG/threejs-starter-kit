import { SphereGeometry, Mesh, MeshStandardMaterial, AmbientLight, DirectionalLight, PlaneBufferGeometry, DoubleSide, DirectionalLightHelper, TextureLoader } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  
  const sunnyTexture = new TextureLoader().load( 'sunny.jpg' );
  const { renderer, camera, scene, cleanup } = initialiseThree()

  renderer.shadowMap.enabled = true

  camera.position.z = 3
  camera.position.y = 2

  const planeGeometry = new PlaneBufferGeometry(10, 10)
  const planeMaterial = new MeshStandardMaterial({
    color: 0x886644,
    side: DoubleSide
  })
  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI/2
  plane.receiveShadow = true

  scene.add(plane)
  

  const sphereGeometry = new SphereGeometry(1, 16, 16)
  const sphereMaterial = new MeshStandardMaterial({
    map: sunnyTexture
  })
  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.castShadow = true
  sphere.position.y = 2

  scene.add(sphere)

  const ambLight = new AmbientLight(0x404040, 0.7)

  scene.add(ambLight)

  const directionalLight = new DirectionalLight( 0xffffff, 0.5 );

  const directionalLighHelper = new DirectionalLightHelper( directionalLight, 5 );
  scene.add( directionalLighHelper );

 
  scene.add( directionalLight );

  directionalLight.castShadow = true

  directionalLight.position.y = 5

  const d = 10
  directionalLight.shadow.camera.left = - d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = - d;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = d;

  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024


  new OrbitControls( camera, renderer.domElement );

  new GLTFLoader().load('apollo.glb', gltf => {
    scene.add( gltf.scene );
  })

  function onLoop(){
    sphere.rotation.y -= 0.01

    renderer.render(scene, camera)
  }

  const stopMainLoop = startMainLoop(onLoop)

  window.onbeforeunload = () => {
    cleanup()
    stopMainLoop()
  }
}

