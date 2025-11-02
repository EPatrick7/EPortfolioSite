import { BackSide, BoxGeometry, Clock, Color, CubeTextureLoader, DirectionalLight, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, RingGeometry, Scene, SphereGeometry, TextureLoader, TorusGeometry, Vector3, WebGLRenderer } from "three";
import { resume_build } from "./scripts/resume";
import { minecraft_build } from "./scripts/minecraft";
export const bg_color="#121212"
export const fg_color="#ab68fd"
export const isMobile = window.innerWidth < 600;
export const imports={
    articles:[
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
require("./assets/style.css"),
require("./assets/fonts/arialroundedmtbold.ttf"),],
article_images:[
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
 require("./assets/images/PiggyIcon.png"), 
 require("./assets/images/PMaren1.PNG"), 
 require("./assets/images/PMaren2.PNG"), 
 require("./assets/images/Trajectory1.png"), 
 require("./assets/images/Trajectory2.png"),
require("./assets/images/PiggyIcon.png"),
],

moon_textures:{
    main:require("./assets/images/moon.jpg"),
    disp:require("./assets/images/moon_dis.jpg"),
},

earth_textures:{
    clouds: require("./assets/images/8k_earth_clouds.jpg"),

    main: require("./assets/images/8k_earth_daymap.jpg"),
    normal: require("./assets/images/8k_earth_normal_map.jpg"),
    rough: require("./assets/images/8k_earth_rough_map.jpg"),
    specular: require("./assets/images/8k_earth_specular_map.jpg"),
    bump: require("./assets/images/8081_earthbump4k.jpg"),
},

skybox:
{
    
    bk: require("./assets/images/skybox/space_bk.png"),
    dn: require("./assets/images/skybox/space_dn.png"),
    ft: require("./assets/images/skybox/space_ft.png"),
    lf: require("./assets/images/skybox/space_lf.png"),
    rt: require("./assets/images/skybox/space_rt.png"),
    up: require("./assets/images/skybox/space_up.png"),

},

crab:{
    mtl:require("./assets/models/crab_1.mtl"),
    mtl2:require("./assets/models/crab_2.mtl"),
    obj:require("./assets/models/crab_1.obj"),
    obj2:require("./assets/models/crab_2.obj"),
    tex:require("./assets/models/crab.png"),
},


};

let scrolling_elements:any[]=[];
export function register_object(obj:any,do_rotation_x:number|undefined=undefined,do_rotation_y:number|undefined=undefined)
{
    obj.y=obj.position.y;
    obj.do_rotation_x=do_rotation_x;
    obj.do_rotation_y=do_rotation_y;
    scrolling_elements.push(obj);
}

function resizeIframes(): void {

    const iframes = document.querySelectorAll("iframe.article");

    for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i] as HTMLIFrameElement;
        
      
        if (iframe.contentWindow && iframe.contentWindow.document.body) {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight+ "px";
        };
    }
}
  

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

export const textureLoader = new TextureLoader();
export const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );





const light = new DirectionalLight( 0x404040,100); // soft white light
light.position.add(new Vector3(0,-2,5));
scene.add( light );



const geometry = new TorusGeometry( );
const material = new MeshStandardMaterial( { color: fg_color } );

//const cube = new Mesh( geometry, material );
//cube.castShadow=true;
//scene.add( cube );
//register_object(cube,1,1);



const skyboxTexture = new CubeTextureLoader().load([
    
    imports.skybox.bk,
    imports.skybox.ft,
    imports.skybox.dn, 
    imports.skybox.up,  
    imports.skybox.lf,
    imports.skybox.rt, 
]);
scene.backgroundIntensity=2;
scene.background = skyboxTexture;
const skyboxMesh = new Mesh(new SphereGeometry(1500, 64, 64), new MeshBasicMaterial({

    envMap:skyboxTexture, 
    side: DoubleSide,
    transparent:true,
    opacity:0.5,
}));
skyboxMesh.material.color.multiplyScalar(3);
scene.add(skyboxMesh);



camera.position.z = 5;

export const renderer = new WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.position="fixed";
renderer.domElement.style.zIndex="-1";
renderer.setClearColor(0x000000, 0);

setTimeout(()=>{

    document.body.append( renderer.domElement );
    document.body.scrollTo(0,0);

},0.1)
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
    resizeIframes();
    camera.aspect = window.outerWidth / window.outerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.outerWidth, window.outerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener("resize", () => {
	rescale();
});

export let GlobalTime=0;
resume_build();
minecraft_build();
const clock = new Clock();
function animate() {
    const delta= clock.getDelta();
    GlobalTime+=delta;
	rescale();

    camera.position.y=-currentScrollPercentage()*100;
    scrolling_elements.forEach((obj:any)=>{
      //  obj.position.y=obj.y +currentScrollAmount()/100

        if(obj.do_rotation_x)
        {
                obj.rotation.x-=obj.do_rotation_x*delta;
        }
        if(obj.do_rotation_y)
        {
            obj.rotation.y-=obj.do_rotation_y*delta;
        }
    });



	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

