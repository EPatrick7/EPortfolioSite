import {
  AmbientLight,
  CubeTextureLoader,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
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
  skybox: {
    bk: require("./assets/images/skybox/space_bk.png"),
    dn: require("./assets/images/skybox/space_dn.png"),
    ft: require("./assets/images/skybox/space_ft.png"),
    lf: require("./assets/images/skybox/space_lf.png"),
    rt: require("./assets/images/skybox/space_rt.png"),
    up: require("./assets/images/skybox/space_up.png"),
  },
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
  10000
);
camera.position.z = 5;
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//"#303134"
//"#202124"
//"#171717"
//"#1E1E1E"
renderer.setClearColor("#1E1E1E", 1);
renderer.domElement.id = "bg";
renderer.domElement.style.overflow = "hidden";
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
const skyboxTexture = new CubeTextureLoader().load([
  imports.skybox.bk,
  imports.skybox.ft,
  imports.skybox.dn,
  imports.skybox.up,
  imports.skybox.lf,
  imports.skybox.rt,
]);
scene.backgroundIntensity = 2;
scene.background = skyboxTexture;
const skyboxMesh = new Mesh(
  new SphereGeometry(1500, 64, 64),
  new MeshBasicMaterial({
    envMap: skyboxTexture,
    side: DoubleSide,
    transparent: true,
    opacity: 0.5,
  })
);
skyboxMesh.material.color.multiplyScalar(3);
scene.add(skyboxMesh);
const geo = new TorusKnotGeometry(1, 0.3, 128, 16);
const mat = new MeshStandardMaterial({
  color: 0xab68fd,
  roughness: 0.4,
  metalness: 0.1,
});
const mesh = new Mesh(geo, mat);
//scene.add(mesh);
function resizeIframes(): void {
  const iframes = document.querySelectorAll("iframe.article");
  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes[i] as HTMLIFrameElement;
    if (iframe.contentWindow && iframe.contentWindow.document.body) {
      iframe.style.height =
        iframe.contentWindow.document.body.scrollHeight + "px";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  resizeIframes();
  const handleScroll = () => {
    fadeElements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.outerHeight;
      // Adjust this threshold(e.g., 0.3 = 30% visibility)
      const visibilityThreshold = 0.3;
      if (rect.top < windowHeight * (1 - visibilityThreshold)) {
        element.classList.add("show");
      } else {
        element.classList.remove("show");
        // Optional: remove on scroll up
      }
    });
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  // Run on page load to check initial visibility
});
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  resizeIframes();
});
window.onload = function () {
  resizeIframes();
};
resizeIframes();
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
