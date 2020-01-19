import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;

  private backgroundScene: THREE.Scene;
  private backgroundCamera: THREE.Camera;

  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone, private gameService: GameService) {}

  public ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  background() {
    // Set up the main camera
    //this.camera.position.z = 5;

    // Load the background texture
    //const texture = new THREE.TextureLoader().load('poubelle-poly.jpg');
    //var material = new THREE.MeshBasicMaterial({map: texture});
    //let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const loader = new THREE.TextureLoader();
   


    //material.color.set(0xff0000);
    const backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        material);

    
    // Create your background scene
    this.backgroundScene = new THREE.Scene();
    this.backgroundCamera = new THREE.Camera();
    this.backgroundScene.add(this.backgroundCamera);
    this.backgroundScene.add(backgroundMesh);
  }


  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;
    //this.canvas = document.querySelector('#c');

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.z = 10;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const loader = new THREE.TextureLoader().load('poubelle-poly.jpg',
      function(texture) {
        material = new THREE.MeshBasicMaterial({
          map: texture
        });
        //const material = new THREE.MeshBasicMaterial({ map: texture });
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add(this.cube);
    });
    

    

  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });

      document.body.onkeyup = ((e) => {
        if (e.keyCode === 32) {
            this.gameService.startGame();
        }
      });
    });
  }

  render() {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;
    
    
    //this.renderer.render(this.backgroundScene, this.backgroundCamera);

    this.renderer.render(this.scene, this.camera);

    
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

}
