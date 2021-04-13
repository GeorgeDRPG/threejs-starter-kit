// alternatively import * as THREE from 'three'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  MathUtils,
  OrthographicCamera,
} from "three";

// The webgl renderer containing the canvas and 'webgl' context, which Three.js draws to, and is attached to the HTML DOM.
function initRenderer(rootElement, options = {}) {
  const renderer = new WebGLRenderer(options);

  // device pixel ratio is usually 1 but can be different based on the device. lower this number to increase performance but decrease resolution.
  renderer.setPixelRatio(window.devicePixelRatio);

  rootElement.appendChild(renderer.domElement);
  return renderer;
}

// near clipping plane, far clipping plane, field of view, aspectRatio
function initPerspectiveCamera({
  near = 0.1,
  far = 1000,
  fov = 75,
  aspectRatio = 1,
} = {}, customResizeFn = null) {
  // the field of view and aspect ratio are set in the resize handler so may be overwritten
  const perspectiveCamera = new PerspectiveCamera(fov, aspectRatio, near, far);

  function onPerspectiveResize() {
    if(customResizeFn){
      customResizeFn()
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    // ensure the scene does not get stretched and the objects in the middle are fully visible regardless width/height

    const planeAspectRatio = 1; // could be 16 / 9 for widescreen, but using 1 to reduce arbitrariness

    perspectiveCamera.aspect = width / height;

    if (perspectiveCamera.aspect > planeAspectRatio) {
      // window too large
      perspectiveCamera.fov = fov;
    } else {
      // window too narrow
      const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
      const ratio = perspectiveCamera.aspect / planeAspectRatio;
      const newCameraHeight = cameraHeight / ratio;
      perspectiveCamera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
    }

    perspectiveCamera.updateProjectionMatrix();
  }

  return {
    camera: perspectiveCamera,
    resizeHandler: onPerspectiveResize
  }

}

// TODO: orthographic camera still needs testing to ensure it works. it can be more confusing than perspective to work with.
function initOrthographicCamera({
  width = window.innerWidth,
  height = window.innerHeight,
  aspect = width / height,
  frustumSize = 1000,
  near = 0.1,
  far = 1000,
} = {}) {
  const getLeft = (frustumSize, aspect) => (-frustumSize * aspect) / 2
  const getRight = (frustumSize, aspect) => (frustumSize * aspect) / 2
  const getTop = frustumSize => frustumSize / 2
  const getBottom = frustumSize => (-frustumSize / 2)
  const orthographicCamera = new OrthographicCamera(
    getLeft(frustumSize, aspect),
    getRight(frustumSize, aspect),
    getTop(frustumSize),
    getBottom(frustumSize),
    near,
    far
  );
  const onOrthographicResize = (
    width = window.innerWidth,
    height = window.innerHeight,
    aspect = width / height,
    fSize = frustumSize
  ) => {
    orthographicCamera.left = getLeft(fSize, aspect);
    orthographicCamera.right = getRight(fSize, aspect);
    orthographicCamera.top = getTop(fSize);
    orthographicCamera.bottom = getBottom(fSize);

    orthographicCamera.updateProjectionMatrix();
  };
  return {
    camera: orthographicCamera,
    resizeHandler: onOrthographicResize,
  };
}

// The camera from which your scene is visible
function makeCamera(cameraType = "perspective", cameraOptions) {
  const cameraTypes = {
    perspective: initPerspectiveCamera,
    orthographic: initOrthographicCamera,
  };
  if (!cameraType in cameraTypes) {
    throw new Error(
      `initCamera cameraType '${cameraType}' not available. Choose one of ${Object.keys(
        cameraTypes
      )
        .map((t) => `'${t}'`)
        .join(", ")}`
    );
  }
  return cameraTypes[cameraType](cameraOptions);
}

// The Three.js Scene where your 3D world will live in
function initScene() {
  return new Scene();
}

function onResize(handleResize) {
  window.addEventListener("resize", handleResize);
  // return a clean up function, in case you want to remove the resize event listener
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}

function initialiseThree(
  rendererOptions = { antialias: true },
  cameraOptions = { type: "perspective" }
) {
  // rootElement is where the canvas will be attached in the DOM
  const rootElement = document.getElementById("threejs-root");

  // this creates the canvas and 'webgl' context, and is what Three.js draws to
  const renderer = initRenderer(rootElement, rendererOptions);

  const { type: cameraType, ...cameraOpts } = cameraOptions;
  // camera to view the scene from
  const {camera, resizeHandler} = makeCamera(cameraType, cameraOpts);

  // this is where you add your Three.js objects such as lights, camera and models.
  const scene = initScene();

  // here we start adding things to the scene, in this case the camera (in case we want to attach geometry to the camera and have it visible)
  scene.add(camera);

  function handleResize(){
    resizeHandler(cameraOpts)
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  const cleanupResize = onResize(handleResize);
  // also call resize initially to set the canvas width/height
  handleResize();

  return {
    renderer,
    scene,
    camera,
    cleanup: () => {
      cleanupResize();
    },
  };
}

export default initialiseThree;
