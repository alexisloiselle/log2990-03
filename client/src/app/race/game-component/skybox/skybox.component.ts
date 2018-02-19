import { Component, OnInit } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-skybox",
  templateUrl: "./skybox.component.html",
  styleUrls: ["./skybox.component.css"]
})
export class SkyboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public generateSkybox(){
    let scene = new THREE.Scene( );
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		let renderer = new THREE.WebGLRenderer( );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		// check when the browser size has changed and adjust the camera accordingly
		window.addEventListener( "resize", function( )
		{
			let WIDTH = window.innerWidth;
			let HEIGHT = window.innerHeight;
			renderer.setSize( WIDTH, HEIGHT );
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix( );
		} );
		// let controls = new THREE.OrbitControls( camera, renderer.domElement ); //Uncomment after test
		camera.position.z = 7;
		// CUBE
		// Skybox texture website http://www.custommapmakers.org/skyboxes.php
		let geometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
		let cubeMaterials =
		[
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/rt.png" ), side: THREE.DoubleSide } ), // Right side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/lf.png" ), side: THREE.DoubleSide } ), // Left side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/up.png" ), side: THREE.DoubleSide } ), // Top side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/dn.png" ), side: THREE.DoubleSide } ), // Bottom side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/ft.png" ), side: THREE.DoubleSide } ), // Front side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( "./skybox/pictures/bk.png" ), side: THREE.DoubleSide } ) // Back side
		];
		// Create a MeshFaceMaterial, which allows the cube to have different materials on each face
		let cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
		let cube = new THREE.Mesh( geometry, cubeMaterial );
		scene.add( cube );
		let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
		scene.add( ambientLight );
		let light1 = new THREE.PointLight( 0xff0040, 4, 50 );
		scene.add( light1 );
		let light2 = new THREE.PointLight( 0x0040ff, 3, 50 );
		scene.add( light2 );
		let light3 = new THREE.PointLight( 0x80ff80, 4, 50 );
		scene.add( light3 );
		let directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
		directionalLight.position.set( 0, 1, 0 );
		scene.add( directionalLight );
		let spotLight = new THREE.SpotLight( 0xFF45F6, 25 );
		spotLight.position.set( 0, 3, 0 );
		scene.add( spotLight );
		// game logic
		let update = function( )
		{
			let time = Date.now( ) * 0.0005;
			light1.position.x = Math.sin( time * 0.7 ) * 30;
			light1.position.y = Math.cos( time * 0.5 ) * 40;
			light1.position.z = Math.cos( time * 0.3 ) * 30;
			light2.position.x = Math.cos( time * 0.3 ) * 30;
			light2.position.y = Math.sin( time * 0.5 ) * 40;
			light2.position.z = Math.sin( time * 0.7 ) * 30;
			light3.position.x = Math.sin( time * 0.7 ) * 30;
			light3.position.y = Math.cos( time * 0.3 ) * 40;
			light3.position.z = Math.sin( time * 0.5 ) * 30;
		};
		// draw scene
		let render = function( )
		{
			renderer.render( scene, camera );
		};
		// run game loop (update, render, repeat)
		let GameLoop = function( )
		{
			requestAnimationFrame( GameLoop );
			update( );
			render( );
		};
    GameLoop( );
  }
}
