import { SphereGeometry, Mesh, MeshStandardMaterial, AmbientLight, DirectionalLight, PlaneBufferGeometry, DoubleSide } from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  camera.position.z = 3
  camera.position.y = 2

  const planeGeometry = new PlaneBufferGeometry(10, 10)
  const planeMaterial = new MeshStandardMaterial({
    color: 0x0000ff,
    side: DoubleSide
  })
  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI/2
  plane.receiveShadow = true

  scene.add(plane)
  

  const sphereGeometry = new SphereGeometry(1, 16, 16)
  const sphereMaterial = new MeshStandardMaterial({
    color: 0xff00ff
  })
  const sphere = new Mesh(sphereGeometry, sphereMaterial)

  sphere.position.y = 2

  scene.add(sphere)

  const ambLight = new AmbientLight(0x404040, 0.7)

  scene.add(ambLight)

  const directionalLight = new DirectionalLight( 0xffffff, 0.5 );

  directionalLight.castShadow = true
  scene.add( directionalLight );

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

