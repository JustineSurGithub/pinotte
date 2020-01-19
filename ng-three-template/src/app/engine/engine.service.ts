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
  private light: THREE.AmbientLight;

  private hand: THREE.Sprite;
  private dechetSprite: THREE.Sprite;

  private frameId: number = null;
  private backgroundScene: THREE.Scene;
  private backgroundCamera: THREE.Camera;

  public constructor(private ngZone: NgZone, private gameService: GameService) {}

  public ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  background() {

    // Create your background scene
    this.backgroundScene = new THREE.Scene();
    this.backgroundCamera = new THREE.Camera();

    const loader = new THREE.TextureLoader().load('/assets/poubelles_grande_friture.png',
    (texture) => {
      console.log('Correctly loaded the texture', texture);
      const tex = new THREE.MeshBasicMaterial({
        map: texture,
        depthTest: false,
        depthWrite: false,
      });
      const loaded = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), tex);
      this.backgroundScene.add(loaded);
    }, (event: ProgressEvent) => {

    }, (event: ErrorEvent) => {
      console.log('There was an error loading the texture:');
      console.warn(event);
    });

    this.backgroundScene.add(this.backgroundCamera);
  }


  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;
    // this.canvas = document.querySelector('#c');

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


    // main
    const spriteMap = new THREE.TextureLoader().load( '/assets/fabrice.png' );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    this.hand = new THREE.Sprite( spriteMaterial );
    this.hand.position.z = 3;
    this.hand.position.y = 1;
    this.hand.position.x = -1.4;
    this.scene.add( this.hand );

    //dechet 
    const dechetId = this.gameService.seekPile();
    const spriteDechetMap = new THREE.TextureLoader().load( `/assets/${dechetId}.png` );
    console.log(dechetId);
    //const spriteDechetMap = new THREE.TextureLoader().load( `/assets/0.png` );
    const spriteDechetMaterial = new THREE.SpriteMaterial( { map: spriteDechetMap, color: 0xffffff } );
    this.dechetSprite = new THREE.Sprite( spriteDechetMaterial );
    this.dechetSprite.scale.x = 0.5;
    this.dechetSprite.scale.y = 0.5;
    this.dechetSprite.position.z = 3;
    this.dechetSprite.position.y = 0.5;
    this.dechetSprite.position.x = -1.4;
    this.scene.add( this.dechetSprite );

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
      window.addEventListener('resize', () => {
        this.resize();
      });
      document.body.onkeyup = (e) => {
        if (e.key === ' ') {
            this.gameService.toggleGameState();
        }
        if (e.key === 'ArrowLeft') {
          // left
          if (this.hand.position.x - 1.15 > -1.5 ) {
            this.hand.translateX(-1.15);
            this.dechetSprite.translateX(-1.15);
          } else {
            this.hand.position.x = 2.05;
            this.dechetSprite.position.x = 2.05;
          }

        }
        if (e.key === 'ArrowRight') {
          // right
          if (this.hand.position.x + 1.15 < 2.10) {
            this.hand.translateX(1.15);
            this.dechetSprite.translateX(1.15);
          } else {
            this.hand.position.x = -1.4;
            this.dechetSprite.position.x = -1.4;
          }

        }
      };
    });
  }

  render() {
    // Where to update the things you know
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.autoClear = false;
    this.renderer.clear();
    this.renderer.render(this.backgroundScene, this.backgroundCamera);
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
