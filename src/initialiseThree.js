// alternatively import * as THREE from 'three'
import { Scene, WebGLRenderer, PerspectiveCamera, MathUtils } from 'three'

// The webgl renderer containing the canvas and 'webgl' context, which Three.js draws to, and is attached to the HTML DOM.
function initRenderer(rootElement, options = {}){

  const renderer = new WebGLRenderer({
    antialias: true,
    ...options
  });

  renderer.shadowMap.enabled = true
  // device pixel ratio is usually 1 but can be different based on the device. lower this number to increase performance but decrease resolution.
  renderer.setPixelRatio(window.devicePixelRatio)

  rootElement.appendChild( renderer.domElement );
  return renderer
}

// The camera from which your scene is visible
function initCamera() {
  // clipping planes near and far
  const near = 0.1;
  const far = 1000;

  // the field of view and aspect ratio are set in the resize handler so these are overwritten
  const fov = 75;
  const aspectRatio = 1;
  const camera = new PerspectiveCamera( fov, aspectRatio, near, far );
  return camera
}

// The Three.js Scene where your 3D world will live in
function initScene(){
  return new Scene();
}

function onResize(handleResize){
  window.addEventListener('resize', handleResize)
  // return a clean up function, in case you want to remove the resize event listener
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}

function initialiseThree(){
  // rootElement is where the canvas will be attached in the DOM
  const rootElement = document.getElementById('threejs-root')

  // this creates the canvas and 'webgl' context, and is what Three.js draws to
  const renderer = initRenderer(rootElement)

  // camera to view the scene from
  const camera = initCamera()

  // this is where you add your Three.js objects such as lights, camera and models.
  const scene = initScene()

  // here we start adding things to the scene, in this case the camera
  scene.add(camera)

  // let's keep the canvas the same size as the browser window
  function handleResize(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    // ensure the scene does not get stretched and the objects in the middle are fully visible regardless width/height
    
    // the desired field of view
    const fov = 75;
    
    const planeAspectRatio = 1; // 16 / 9

    camera.aspect = width / height;
	
    if (camera.aspect > planeAspectRatio) {
      // window too large
      camera.fov = fov;
    } else {
      // window too narrow
      const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
      const ratio = camera.aspect / planeAspectRatio;
      const newCameraHeight = cameraHeight / ratio;
      camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
    }


    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
  }
  const cleanupResize = onResize(handleResize)
  // also call resize initially to set the canvas width/height
  handleResize()
  
  return {
    renderer,
    scene,
    camera,
    cleanup: () => {
      cleanupResize()
    },
  }
}

export default initialiseThree
