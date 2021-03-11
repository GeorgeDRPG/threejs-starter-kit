// start and stop the main loop, and do logic each frame by passing a callback function as the first argument
function startMainLoop(callback){
    const raf = { current: requestAnimationFrame(animate) };
    
    function animate() {
      callback()
      raf.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(raf.current)
}

export default startMainLoop