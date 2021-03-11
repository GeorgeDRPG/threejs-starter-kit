import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three"
import startMainLoop from "./utils/startMainLoop"
import initialiseThree from "./initialiseThree"

window.onload = onLoad

function onLoad(){
  const { renderer, camera, scene, cleanup } = initialiseThree()

  camera.position.z = 2

  const boxGeometry = new BoxBufferGeometry(1, 1, 1)
  const boxMaterial = new MeshBasicMaterial({
    wireframe: true,
  })
  const box = new Mesh(boxGeometry, boxMaterial)

  scene.add(box)

  function onLoop(){

    box.rotation.y -= 0.01

    renderer.render(scene, camera)
  }

  const stopMainLoop = startMainLoop(onLoop)

  window.onbeforeunload = () => {
    cleanup()
    stopMainLoop()
  }
}

