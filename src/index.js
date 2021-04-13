import {
  SphereBufferGeometry,
  TorusKnotBufferGeometry,
  ConeBufferGeometry,
  TextGeometry,
  CameraHelper,
  DirectionalLightHelper,
  FontLoader,
  Mesh,
  MeshStandardMaterial,
  MeshNormalMaterial,
  TextureLoader,
  AmbientLight,
  DirectionalLight,
  PlaneBufferGeometry,
  DoubleSide,
  PCFSoftShadowMap,
} from "three"
import startMainLoop from "./utils/startMainLoop"
import { OrbitControls } from "./utils/orbitControls"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

  // Scene camera positions: z = depth, x = left/ right, y = up/ down
  // camera.position.z = 7
  // camera.position.y = 3
  // camera.position.x = 0

  // Create Orbit Controls
  const controls = new OrbitControls( camera, renderer.domElement );

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set( 0, 3, 7 );
  controls.update();

  // Create Ambient lighting for the scene
  const ambLight = new AmbientLight(0xcccccc, 0.4)
  scene.add(ambLight)

  // Create Directional lighting for the scene
  const dirLight = new DirectionalLight(0xffffff, 1)
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
    // color: 0xffff00,
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
  sphere.position.y = 1.2
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = false; //default
  scene.add(sphere)

  // Create shape object (cone) - add size, material, colour/ texture and positioning
  const coneGeometry = new ConeBufferGeometry( 1, 3, 8 )
  const coneMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0xff0040,
  })

  const cone = new Mesh(coneGeometry, coneMaterial)
  cone.position.y = 1.7
  cone.position.x = -4
  cone.castShadow = true; //default is false
  cone.receiveShadow = false; //default
  scene.add(cone)

  // Create shape object (torusKnot) - add size, material, colour/ texture and positioning
  const torusGeometry = new TorusKnotBufferGeometry(1, 0.4, 64, 8)
  const torusMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0x0040ff,
  })

  const torusKnot = new Mesh(torusGeometry, torusMaterial)
  torusKnot.position.y = 2
  torusKnot.position.x = 4
  torusKnot.castShadow = true; //default is false
  torusKnot.receiveShadow = false; //default
  scene.add(torusKnot)

  // Create text shape with custom font - add size, material, colour/ texture and positioning
  const loader = new FontLoader();

  loader.load( 'https://threejs.org/examples/fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry( 'Welcome to my Universe!', {
      font: font,
      size: 0.5,
      height: 0.5,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 3
    });

    textGeometry.center();

    const textMaterial = new MeshNormalMaterial()

    const text = new Mesh(textGeometry, textMaterial)
    text.position.y = 5
    text.castShadow = true; //default is false
    text.receiveShadow = false; //default
    scene.add(text)
  });

  // Helpers
  const cameraHelper = new CameraHelper( dirLight.shadow.camera );
  const directionalLightHelper = new DirectionalLightHelper( dirLight, 0.8 );
  scene.add( cameraHelper, directionalLightHelper);

  // Set looping animation of objects
  function onLoop() {
    sphere.rotation.y -= 0.01
    cone.rotation.y -= 0.01
    torusKnot.rotation.y -= 0.01
    renderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

  }

  const stopMainLoop = startMainLoop(onLoop)

  window.onbeforeunload = () => {
    animate()
    cleanup()
    stopMainLoop()
  }
}

