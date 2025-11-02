import {
  AmbientLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import "./style.css";

export const imports = {
  images: [
    require("./assets/icon.png"),
    require("./assets/profile_picture.png"),
    require("./assets/email.png"),
    require("./assets/github.png"),
    require("./assets/itch-io.png"),
    require("./assets/linkedin.png"),
  ],
};

export const scene = new Scene();
export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//"#303134"
//"#202124"
//"#171717"
//"#1E1E1E"
renderer.setClearColor("#ffffff", 1); // subtle purple-gray tone
renderer.domElement.id = "bg";
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "-1";
renderer.domElement.style.pointerEvents = "none";
document.body.prepend(renderer.domElement);

const light = new PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambient = new AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const geo = new TorusKnotGeometry(1, 0.3, 128, 16);
const mat = new MeshStandardMaterial({
  color: 0xab68fd,
  roughness: 0.4,
  metalness: 0.1,
});
const mesh = new Mesh(geo, mat);
scene.add(mesh);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let scrollY = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.001;

  // Optional subtle motion
  mesh.rotation.y += scrollY * 0.00001;

  renderer.render(scene, camera);
}
animate();
