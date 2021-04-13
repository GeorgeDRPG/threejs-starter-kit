import {
  SphereBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  PlaneBufferGeometry, DoubleSide
} from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  // Camera positions z = depth, x = left/ right, y = up/ down
  camera.position.z = 5
  camera.position.y = 2
  camera.position.x = 0

  // Create Plane object - Add size, shape, material and colour
  const planeGeometry = new PlaneBufferGeometry('10', '10')
  const planeMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0x1e90ff,
    side: DoubleSide,
  })

  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI/2
  plane.receiveShadow = true
  scene.add(plane)

  // Create shape object (sphere in this case) - add size, material, colour and positioning
  const sphereGeometry = new SphereBufferGeometry(1, 16, 16)
  const sphereMaterial = new MeshStandardMaterial({
    // wireframe: true,
    color: 0xffd500,
  })

  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.position.y = 2
  scene.add(sphere)

  // Create Ambient lighting for the scene
  const ambLight = new AmbientLight(0x1e90ff, 1)
  scene.add(ambLight)

  // Create Directional lighting for the scene
  const dirLight = new DirectionalLight(0xffffff, 1)
  dirLight.castshadow = true
  scene.add(dirLight)

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

