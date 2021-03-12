# threejs-starter-kit

For the Three.js beginner workshop.
# Prerequisites

- Any recent LTS version of `node` and `npm`.
> You can download Node.js (LTS) from https://nodejs.org/en/ which comes with `npm`.
This has been tested on node 10, 12 and 14

Optional: `yarn` instead of `npm` which you can install with `npm i -g yarn`

- A web browser which supports WebGL and decent dev tools such as Chrome or Firefox.
# Getting started

First open your code editor and a terminal such as VSCode and the integrated terminal.

cd to your projects directory, where you want to clone the threejs-starter-kit and follow the steps below.

> clone the repository
0. `git clone git@git.drp.digital:George.Campbell/threejs-starter-kit.git`

> open the local repository in your code editor and terminal

If you are using vscode you may be able to open the folder as a project with

`code threejs-starter-kit`

Otherwise just
1. `cd threejs-starter-kit`

> Make sure your terminal is located in the root of the threejs-starter-kit folder before continuing

> install npm modules

2. `npm i` or `yarn`

---

Look in `package.json` scripts to see what scripts you can run. For example:

`npm start` or `yarn start` - this will build and serve the project, and be accessible from http://localhost:3123 in your browser. It will reload on save.

# Workshop

Create your own branch to play in e.g.

`git checkout -b my-cool-sandbox`

Feel free to commit and push code to your branch, and share your creations.

The objectives in this workshop are below:
0. 
1. Give geometry a material
2. Add lighting to the scene
3. Add a plane geometry and enable shadows
4. Add OrbitControls, talk about three.js JSM example modules
5. Give box a texture like a crate or a building
6. Load .gltf model to scene

Hopefully in the workshop we will have time to achieve at least a few of these.

# Links

Here are some links you may find useful

> The official three.js website
https://threejs.org/

> BoxGeometry reference
https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry

> Example with code of instanced buffer geometry
https://threejs.org/examples/?q=instanc#webgl_buffergeometry_instancing_interleaved

> Example with code of physics
https://threejs.org/examples/?q=instanc#physics_ammo_instancing

> More useful links
https://threejs.org/docs/index.html#manual/en/introduction/Useful-links



