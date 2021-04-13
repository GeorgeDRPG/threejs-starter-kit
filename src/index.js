import { SphereGeometry, Mesh, MeshStandardMaterial, AmbientLight, SpotLight, PlaneBufferGeometry, DoubleSide, SpotLightHelper } from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad
const PI = Math.PI
function onLoad(){
  const rendererOpts = {
    antialias: true
  }

  const cameraOpts = {
    type: 'perspective',
    near: 0.1,
    far: 1000,
  }

  const { renderer, camera, scene, cleanup } = initialiseThree(rendererOpts, cameraOpts)

  // for dynamic shadows to work, this needs to be set to true
  renderer.shadowMap.enabled = true;

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

  sphere.castShadow = true

  scene.add(sphere)

  const ambLight = new AmbientLight(0xFF7700, 0.7)

  scene.add(ambLight)

  const spotLight = new SpotLight( 0xffffff, 0.5 );
  spotLight.position.y = 4
  
  const spotLightHelper = new SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  spotLight.castShadow = true
  scene.add( spotLight );

  function onLoop(){
    const t = Date.now()/1000
    spotLight.position.x = Math.sin(t/12 * PI*2)*4
    spotLight.position.z = Math.cos(t/20 * PI*2)*4
    spotLight.position.y = Math.cos(t/15 * PI*2)*2+4
    
    sphere.rotation.y -= 0.01

    renderer.render(scene, camera)
  }

  const stopMainLoop = startMainLoop(onLoop)

  window.onbeforeunload = () => {
    cleanup()
    stopMainLoop()
  }
}

