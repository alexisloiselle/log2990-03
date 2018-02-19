import { Component, OnInit } from "@angular/core";
import * as THREE from "three";


@Component({
    selector: "app-skybox",
    templateUrl: "./skybox.component.html",
    styleUrls: ["./skybox.component.css"]
})
export class SkyboxComponent implements OnInit {

    // private container = document.createElement('div');
    // private camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    private scene = new THREE.Scene();
    // private stats // 
    private material: THREE.ShaderMaterial;

    constructor() {
        this.createScene();
     }

    ngOnInit() { }

    public loadCubeTexture(): THREE.Texture {
        let urlPrefix = "./skybox/pictures/";
        let urls = [urlPrefix + "rt.png", urlPrefix + "lf.png",
        urlPrefix + "up.png", urlPrefix + "dn.png",
        urlPrefix + "ft.png", urlPrefix + "bk.png"];
        return THREE.ImageUtils.loadTextureCube(urls);
    }

    public initShader() {
        var shader = THREE.ShaderLib["cube"];
        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['tCube'].texture = this.loadCubeTexture();   // textureCube has been init before
        this.material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.DoubleSide
        });
        this.material.needsUpdate = true;
    }
    public createScene() {
        this.initShader();
        const skyboxMesh = new THREE.Mesh(new THREE.CubeGeometry(100000, 100000, 100000), this.material);
        this.material.needsUpdate = true;
        this.scene.add(skyboxMesh);
    }
}
