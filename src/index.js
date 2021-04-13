import {
  SphereBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  AmbientLight,
  DirectionalLight,
  PlaneBufferGeometry, DoubleSide
} from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  // Scene camera positions: z = depth, x = left/ right, y = up/ down
  camera.position.z = 5
  camera.position.y = 2
  camera.position.x = 0

  // Create Ambient lighting for the scene
  const ambLight = new AmbientLight(0xcccccc, 0.4)
  scene.add(ambLight)

  // Create Directional lighting for the scene
  const dirLight = new DirectionalLight(0xffffff, 0.8)
  // dirLight.castshadow = true
  scene.add(dirLight)

  // Create Plane object - Add size, shape, material and colour
  const planeTexture = new TextureLoader().load( 'https://picsum.photos/id/1015/400/400' );
  const planeGeometry = new PlaneBufferGeometry('10', '10')
  const planeMaterial = new MeshStandardMaterial({
    // wireframe: true,
    // color: 0x1e90ff,
    map: planeTexture,
    side: DoubleSide,
  })

  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI/2
  // plane.receiveShadow = true
  scene.add(plane)

  // Create shape object (sphere in this case) - add size, material, colour and positioning
  const sphereTexture = new TextureLoader().load( 'https://picsum.photos/id/1018/400/400' );
  const sphereGeometry = new SphereBufferGeometry(1, 16, 16)
  const sphereMaterial = new MeshStandardMaterial({
    // wireframe: true,
    map: sphereTexture,
    // color: 0xffd500,
  })

  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.position.y = 1
  scene.add(sphere)


  // Set looping animation of shape
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

