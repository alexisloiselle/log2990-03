import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import { CubeTextureLoader } from "three";



@Component({
    selector: "app-skybox",
    templateUrl: "./skybox.component.html",
    styleUrls: ["./skybox.component.css"],
    //providers:[RenderService],
})
export class SkyboxComponent implements OnInit {

    // private container = document.createElement('div');
    private camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    private scene = new THREE.Scene();
    // private stats // 
    private material: THREE.ShaderMaterial;
    private renderer = new THREE.WebGLRenderer();
    private container = document.createElement( 'div' );
    

    constructor() {
     }

    ngOnInit() { 
	
      this.createScene();
	}
	
	public async createScene() : Promise<void>{
		
		
		this.scene=  new THREE.Scene();
		this.initSceneMesh();
		this.loadCubeTexture();
		this.initShader();
		
		
		this.initRenderer();
		this.renderer.render(this.scene,this.camera);
	}

    public loadCubeTexture(){
	   
		this.scene.background= new CubeTextureLoader()
		.setPath('./pictures')
		.load([
			'rt.png',
			'lf.png',
			'up.png',
			'dn.png',
			'ft.png',
			'bk.png',
		]);
	
    }

    public initShader() {
        let shader = THREE.ShaderLib['cube'];
        let uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['tCube'].texture = this.loadCubeTexture();   // textureCube has been init before
        this.material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
			side: THREE.DoubleSide
		
        });
        // this.scene.add(uniforms);
    }
    public initSceneMesh() {
		const skyboxMesh = new THREE.Mesh(new THREE.CubeGeometry(100000, 100000, 100000), this.material);
		this.scene.add(skyboxMesh);
       
        
    }
    public initRenderer() {

	  this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container.appendChild( this.renderer.domElement );
	document.body.appendChild(this.container ); // not sure about that
	
    
    }

    
}
