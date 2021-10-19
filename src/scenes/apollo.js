import {
    IcosahedronGeometry,
    Mesh,
    MeshStandardMaterial,
    AmbientLight,
    SpotLight,
    PlaneBufferGeometry,
    DoubleSide,
    SpotLightHelper,
    TextureLoader,
  } from "three";
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  
  export default function apolloScene({ renderer, camera, scene }){
    // For dynamic shadows to work, this needs to be set to true
  renderer.shadowMap.enabled = true;

  // Camera positions z = depth, x = left/ right, y = up/ down
  camera.position.z = 3;
  camera.position.y = 2;

  // Create Plane object - Add size, shape, material and colour
  const planeGeometry = new PlaneBufferGeometry(10, 10);
  const planeMaterial = new MeshStandardMaterial({
    color: 0x0000ff,
    side: DoubleSide,
  });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  plane.receiveShadow = true;

  scene.add(plane);

  // Create shape object (sphere in this case) - add size, material, colour and positioning

  const sphereGeometry = new IcosahedronGeometry(1, 2);
  const sunnyTexture = new TextureLoader().load( 'sunny.jpg' );
  const sphereMaterial = new MeshStandardMaterial({
    map: sunnyTexture
  })
  const sphere = new Mesh(sphereGeometry, sphereMaterial);

  sphere.position.y = 2;

  sphere.castShadow = true;

  scene.add(sphere);

  // Create Ambient lighting for the scene
  const ambLight = new AmbientLight(0xff7700, 0.7);

  scene.add(ambLight);

  // Create Spot light for the scene and a spotlight 'helper' to highlight where it is
  const spotLight = new SpotLight(0xffffff, 0.5);
  spotLight.position.y = 4;

  const spotLightHelper = new SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  spotLight.castShadow = true;
  scene.add(spotLight);

  new OrbitControls( camera, renderer.domElement );

  new GLTFLoader().load('apollo.glb', gltf => {
    scene.add( gltf.scene );
  })
  const PI = Math.PI;
  return t => {
    spotLight.position.x = Math.sin((t / 12) * PI * 2) * 4;
    spotLight.position.z = Math.cos((t / 20) * PI * 2) * 4;
    spotLight.position.y = Math.cos((t / 15) * PI * 2) * 2 + 4;

    sphere.rotation.y -= 0.01;
  }
}