import { Vector3 } from "three";
import { GlobalTime, imports, isMobile, scene } from "..";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export let animationGroup1:any[] = [];
export let animationGroup2:any[] = [];
export let animationState = false;

function loadObject(mtlPath:string, objPath:string, onLoad:any) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        
        objLoader.setMaterials(materials);
        objLoader.load(objPath, onLoad);
    });
}

export function minecraft_build() {
    let object:any=undefined;
    let object2:any=undefined;
    loadObject(imports.crab.mtl, imports.crab.obj, (object:any) => {
        scene.add(object);
        object.position.set(5, -93, -0.1);
        if(isMobile)
        {
            object.position.set(2, -93, -0.1);
        }
        object.rotation.y = 2;
        object.scale.set(1, 1, 1);
        object.visible = false;
        animationGroup1.push(object);

        loadObject(imports.crab.mtl2, imports.crab.obj2, (object2:any) => {
            scene.add(object2);
            object2.object = object;
            object2.positionCall = () => {
                if (object) {
                    object.position.set(5, -93, -0.1);
                    if(isMobile)
                    {
                        object.position.set(1.5, -93, -0.1);
                    }
                    
                    object.position.y +=Math.sin(GlobalTime/100);
                    object.position.x +=Math.sin(GlobalTime/200);
                    
                    object2.position.copy(object.position);
                    object2.rotation.copy(object.rotation);
                }
            };

            object2.position.copy(object.position);
            object2.rotation.copy(object.rotation);
            object2.scale.copy(object.scale);
            object2.visible = false;
            animationGroup2.push(object2);
        });
    });
/*
    loadObject(imports.librarian.mtl, imports.librarian.obj, (librarian:any) => {
        scene.add(librarian);
        librarian.rotation.y = 3;
        librarian.scale.set(1, 1, 1);
        librarian.positionCall = () => {
            if (librarian) {
                librarian.position.set(5, -93, -0.1);
                if(isMobile)
                {
                    librarian.position.set(1.5, -93, -0.1);
                }
                
                librarian.position.y +=Math.sin(GlobalTime/100);
                librarian.position.x +=Math.sin(GlobalTime/200);
                
            }
        };
    });
    */
}

function toggleAnimation() {
    animationState = !animationState;
    
    animationGroup1.forEach((element:any) => {
        element.visible = animationState;
    });
    
    animationGroup2.forEach((element:any) => {
        element.visible = !animationState;
    });
}
function updatePositions()
{
    animationGroup1.forEach((element:any) => {
        if(element.positionCall)
        {
            element.positionCall();
        }
    });
    
    animationGroup2.forEach((element:any) => {
        if(element.positionCall)
        {
            element.positionCall();
        }
    });
}

setInterval(updatePositions, 1);
setInterval(toggleAnimation, 250);
