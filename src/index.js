import {
  SphereBufferGeometry,
  TorusKnotBufferGeometry,
  CylinderBufferGeometry,
  CameraHelper,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  AmbientLight,
  DirectionalLight,
  PlaneBufferGeometry,
  DoubleSide,
  PCFSoftShadowMap,
} from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

  // Scene camera positions: z = depth, x = left/ right, y = up/ down
  camera.position.z = 7
  camera.position.y = 3
  camera.position.x = 0

  // Create Ambient lighting for the scene
  const ambLight = new AmbientLight(0xcccccc, 0.4)
  scene.add(ambLight)

  // Create Directional lighting for the scene
  const dirLight = new DirectionalLight(0xffffff, 1, 100)
  dirLight.position.set( 0, 1, 0 );
  dirLight.castshadow = true
  dirLight.shadow.mapSize.width = 512;
  dirLight.shadow.mapSize.height = 512;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 500;
  scene.add(dirLight)

  // Create Plane object - Add size, shape, material and colour
  const planeTexture = new TextureLoader().load( 'https://picsum.photos/id/1015/400/400' );
  const planeGeometry = new PlaneBufferGeometry(20, 20, 32, 32 )
  const planeMaterial = new MeshStandardMaterial({
    // wireframe: true,
    map: planeTexture,
    side: DoubleSide,
  })

  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI/2
  plane.receiveShadow = true
  scene.add(plane)

  // Create shape object (sphere) - add size, material, colour and positioning
  const sphereTexture = new TextureLoader().load( 'https://picsum.photos/id/1018/500/500' );
  const sphereGeometry = new SphereBufferGeometry(1, 20, 20)
  const sphereMaterial = new MeshStandardMaterial({
    // wireframe: true,
    // color: 0xffff00,
    map: sphereTexture,
  })

  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.position.y = 1
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = false; //default
  scene.add(sphere)

  // Create shape object (cylinder) - add size, material, colour/ texture and positioning
  const cylinderGeometry = new CylinderBufferGeometry(1, 1, 2, 16 )
  const cylinderMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0xff0040,
  })

  const cylinder = new Mesh(cylinderGeometry, cylinderMaterial)
  cylinder.position.y = 1
  cylinder.position.x = -4
  cylinder.castShadow = true; //default is false
  cylinder.receiveShadow = false; //default
  scene.add(cylinder)

  // Create shape object (torus) - add size, material, colour/ texture and positioning
  const torusGeometry = new TorusKnotBufferGeometry(1, 0.4, 64, 8)
  const torusMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0x0040ff,
  })

  const torus = new Mesh(torusGeometry, torusMaterial)
  torus.position.y = 1.7
  torus.position.x = 4
  torus.castShadow = true; //default is false
  torus.receiveShadow = false; //default
  scene.add(torus)

  // Helpers
  const helper = new CameraHelper( dirLight.shadow.camera );
  scene.add( helper );

  // Set looping animation of objects
  function onLoop() {
    sphere.rotation.y -= 0.01
    cylinder.rotation.y -= 0.01
    torus.rotation.y -= 0.01
    renderer.render(scene, camera)
  }

  const stopMainLoop = startMainLoop(onLoop)

  window.onbeforeunload = () => {
    cleanup()
    stopMainLoop()
  }
}

