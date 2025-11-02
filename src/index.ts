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
  articles: [
    require("./index.html"),
    require("./assets/articles/astronomous.html"),
    require("./assets/articles/chessbb.html"),
    require("./assets/articles/convergence.html"),
    require("./assets/articles/minecraft.html"),
    require("./assets/articles/pipeline.html"),
    require("./assets/articles/ppanzers.html"),
    require("./assets/articles/profmaren.html"),
    require("./assets/articles/resume.html"),
    require("./assets/articles/trajectory.html"),
    require("./assets/articlestyle.css"),
    require("./assets/fonts/arialroundedmtbold.ttf"),
  ],
  images: [
    require("./assets/icon.png"),
    require("./assets/profile_picture.png"),
    require("./assets/email.png"),
    require("./assets/github.png"),
    require("./assets/itch-io.png"),
    require("./assets/linkedin.png"),
  ],
  article_images: [
    require("./assets/images/Astronomous1.PNG"),
    require("./assets/images/Astronomous2.PNG"),
    require("./assets/images/Astronomous3.PNG"),
    require("./assets/images/CBB1.png"),
    require("./assets/images/CBB2.png"),
    require("./assets/images/Convergence1.PNG"),
    require("./assets/images/Convergence2.PNG"),
    require("./assets/images/Eric.png"),
    require("./assets/images/PCE1.png"),
    require("./assets/images/PCE2.png"),
    require("./assets/images/PCE3.png"),
    require("./assets/images/PMaren1.PNG"),
    require("./assets/images/PMaren2.PNG"),
    require("./assets/images/Trajectory1.png"),
    require("./assets/images/Trajectory2.png"),
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

function currentScrollAmount() {
  return document.documentElement.scrollTop + document.body.scrollTop;
}
function currentScrollPercentage() {
  return (
    currentScrollAmount() /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight)
  );
}

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.001;

  // Optional subtle motion
  mesh.rotation.y += scrollY * 0.00001;

  camera.position.y = -currentScrollPercentage() * 100;

  renderer.render(scene, camera);
}
animate();
