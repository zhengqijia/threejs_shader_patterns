import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

import { fragment } from './glsl/fragment.js';
import { vertex } from './glsl/vertex.js';

/**
 * Sizes
 */

const gui = new dat.GUI();
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

window.addEventListener('resize', () => {
  // Save sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

let uniforms = {
  uName: { value: 1 },
  uMultiple: { value: 1 },
  uIsMod: { value: false },
  uIsStep: { value: false },
  uStepV: { value: 0.5 },
};
//geometry
const planeGeom = new THREE.PlaneBufferGeometry(1, 1);
const shaderMaterial = new THREE.ShaderMaterial({
  fragmentShader: fragment,
  vertexShader: vertex,
  uniforms,
});

const plane = new THREE.Mesh(planeGeom, shaderMaterial);

let obj = {
  pattern: '纹理坐标-U',
};

gui
  .add(obj, 'pattern', ['纹理坐标-U', '纹理坐标-V', '纹理坐标-UV', '网格'])
  .name('样式')
  .onFinishChange((v) => {
    switch (v) {
      case '纹理坐标-U':
        uniforms.uName.value = 1;
        break;
      case '纹理坐标-V':
        uniforms.uName.value = 2;
        break;
      case '纹理坐标-UV':
        uniforms.uName.value = 3;
        break;
      case '网格':
        uniforms.uName.value = 4;
        break;
    }
  });
gui.add(uniforms.uMultiple, 'value').min(1).max(20).name('倍数');
gui.add(uniforms.uIsMod, 'value').name('mod函数');
gui.add(uniforms.uIsStep, 'value').name('step函数');
gui.add(uniforms.uStepV, 'value').min(0.01).max(1).step(0.01).name('倍数');
scene.add(plane);

// control
const controls = new OrbitControls(camera, renderer.domElement);
const textureLoader = new THREE.TextureLoader();
/**
 * Loop
 */
const clock = new THREE.Clock();
const loop = () => {
  // Update
  // cube.rotation.y += 0.01

  let elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);
  controls.update();
  // Keep looping
  window.requestAnimationFrame(loop);
};
loop();
