import startMainLoop from "./utils/startMainLoop";
import initialiseThree from "./initialiseThree";
import makeScene from "./utils/makeScene";

window.onload = onLoad;


function onLoad() {
  const rendererOpts = {
    antialias: true,
  };

  const cameraOpts = {
    type: "perspective",
    near: 0.1,
    far: 1000,
  };
  
  const { renderer, camera, scene, cleanup } = initialiseThree(
    rendererOpts,
    cameraOpts
  );

  const onFrame = makeScene('apollo')({ renderer, camera, scene })

  // Function called on every frame
  // this moves (translation) the spot light and rotates the sphere
  function onLoop() {
    const t = performance.now() / 1000;

    onFrame(t)

    renderer.render(scene, camera);
  }

  const stopMainLoop = startMainLoop(onLoop);

  window.onbeforeunload = () => {
    cleanup();
    stopMainLoop();
  };
}
