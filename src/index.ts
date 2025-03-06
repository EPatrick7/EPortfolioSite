import { BoxGeometry, Color, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, RingGeometry, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer } from "three";
export const bg_color="#121212"
export const fg_color="#ab68fd"

const required_paths=[
require("./index.html"),
require("./assets/articles/astronomous.html"),
require("./assets/articles/astronomousgw.html"),
require("./assets/articles/chessbb.html"),
require("./assets/articles/convergence.html"),
require("./assets/articles/hhangover.html"),
require("./assets/articles/logico.html"),
require("./assets/articles/minecraft.html"),
require("./assets/articles/photonics.html"),
require("./assets/articles/pipeline.html"),
require("./assets/articles/pipeline3.html"),
require("./assets/articles/ppanzers.html"),
require("./assets/articles/profmaren.html"),
require("./assets/articles/resume.html"),
require("./assets/articles/simulators.html"),
require("./assets/articles/trajectory.html"),
require("./assets/style.css"),
require("./assets/fonts/arialroundedmtbold.ttf"),

require("./assets/images/AStar.png"), require("./assets/images/Astronomous1.PNG"), require("./assets/images/Astronomous2.PNG"), require("./assets/images/Astronomous3.PNG"), require("./assets/images/AstronomousGW1.PNG"), require("./assets/images/AstronomousGW2.PNG"), require("./assets/images/AstronomousGW3.PNG"), require("./assets/images/AtomSim.PNG"), require("./assets/images/CBB1.png"), require("./assets/images/CBB2.png"), require("./assets/images/Convergence1.PNG"), require("./assets/images/Convergence2.PNG"), require("./assets/images/dirt.png"), require("./assets/images/Eric.png"), require("./assets/images/EvoSim.PNG"), require("./assets/images/GravSim.PNG"), require("./assets/images/HH1.png"), require("./assets/images/Logico.PNG"), require("./assets/images/Logico2.png"), require("./assets/images/moon_dis.jpg"), require("./assets/images/moon.jpg"), require("./assets/images/PCE1.png"), require("./assets/images/PCE2.png"), require("./assets/images/PCE3.png"), require("./assets/images/Photonics1.png"), require("./assets/images/Photonics2.png"), require("./assets/images/Photonics3.png"), require("./assets/images/PiggyIcon.png"), require("./assets/images/Pipeline3_1.PNG"), require("./assets/images/Pipeline3_2.PNG"), require("./assets/images/Pipeline3_3.PNG"), require("./assets/images/PMaren1.PNG"), require("./assets/images/PMaren2.PNG"), require("./assets/images/Trajectory1.png"), require("./assets/images/Trajectory2.png"),
require("./assets/images/PiggyIcon.png"),
];



document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const handleScroll = () => {
        fadeElements.forEach((el) => {
            const element = el as HTMLElement;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Adjust this threshold (e.g., 0.3 = 30% visibility)
            const visibilityThreshold = 0.3;

            if (rect.top < windowHeight * (1 - visibilityThreshold)) {
                element.classList.add("show");
            } else {
                element.classList.remove("show"); // Optional: remove on scroll up
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on page load to check initial visibility
});


export const scene = new Scene();
export const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background=new Color(bg_color);



const light = new DirectionalLight( 0x404040,100); // soft white light
light.position.add(new Vector3(0,-2,5));
scene.add( light );



const geometry = new TorusGeometry( );
const material = new MeshStandardMaterial( { color: fg_color } );

const cube = new Mesh( geometry, material );
cube.castShadow=true;
scene.add( cube );

camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.position="fixed";
renderer.domElement.style.zIndex="-1";
document.body.append( renderer.domElement );
document.body.scrollTo(0,0);
//document.body.style.height = "300vh";
function currentScrollAmount()
{
	return (document.documentElement.scrollTop + document.body.scrollTop);
}
function currentScrollPercentage()
{
    return (currentScrollAmount() / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
}


function rescale() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener("resize", () => {
	rescale();
});


function animate() {
	rescale();
    console.log(currentScrollAmount());
	cube.position.y=currentScrollAmount()/100;

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;


	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );