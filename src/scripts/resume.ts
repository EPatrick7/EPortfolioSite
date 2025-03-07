import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { imports, register_object, scene, textureLoader } from "..";



export function resume_build()
{ 
    
    
  
    
    const moon = new Mesh( new SphereGeometry(2, 64, 64), new MeshStandardMaterial({
        map: textureLoader.load(imports.moon_textures.main),                  
        displacementMap: textureLoader.load(imports.moon_textures.disp),
        displacementScale: 0.01,               
        displacementBias: -0.25,         
        roughness: 0.9,                       
        metalness: 0.3,                      
      }));
    moon.position.x=5;
    moon.position.y=2;

    moon.rotation.y=0.3;
    register_object(moon,0,0.01);
    scene.add(moon);

    
    const radius=4;

    const earth = new Mesh( new SphereGeometry(radius, 64, 64), new MeshStandardMaterial({
        map: textureLoader.load(imports.earth_textures.main),                  
        roughnessMap: textureLoader.load(imports.earth_textures.rough),        
        displacementMap: textureLoader.load(imports.earth_textures.specular),        
        normalMap: textureLoader.load(imports.earth_textures.normal),    
        displacementScale:-0.01,
        metalness:0.9,
        roughness:0.5,           
        
      }));

    scene.add(earth);


    const earth_cloud = new Mesh( new SphereGeometry(radius+0.05, 64, 64), new MeshStandardMaterial({
        map: textureLoader.load(imports.earth_textures.clouds),                  
        displacementMap: textureLoader.load(imports.earth_textures.specular),      
        displacementScale:-0.01,
        alphaMap:textureLoader.load(imports.earth_textures.clouds),
        transparent:true,
        opacity:0.2,
        
      }));

    scene.add(earth_cloud);

    earth.rotation.x=0.6;
    earth.rotation.y=0.5;

    earth.position.x=-7;
    earth.position.y=-1;
    earth.position.z=-5;

    earth_cloud.position.x=earth.position.x;
    earth_cloud.position.y=earth.position.y;
    earth_cloud.position.z=earth.position.z;

    
    register_object(earth,0,-0.03);
    register_object(earth_cloud,0,-0.04);
}