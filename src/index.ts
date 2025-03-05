import { BoxGeometry, Color, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, RingGeometry, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer } from "three";
export const bg_color="#121212"
export const fg_color="#ab68fd"



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
document.body.append( renderer.domElement );

document.body.style.height = "300vh";
function currentScrollAmount()
{
	return (document.documentElement.scrollTop + document.body.scrollTop);
}
function currentScrollPercentage()
{
    return (currentScrollAmount() / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
}
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

function animate() {

    console.log(currentScrollAmount());
	cube.position.y=currentScrollAmount()/100;

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;


	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );