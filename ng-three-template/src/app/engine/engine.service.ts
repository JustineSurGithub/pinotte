import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { GameService } from '../services/game.service';
import { Dechet } from '../classes/dechet';

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

  private spriteDechetMaterial: THREE.SpriteMaterial;

  private fallingSprites: THREE.Sprite[] = [];

  private frameId: number = null;
  private backgroundScene: THREE.Scene;
  private backgroundCamera: THREE.Camera;
  private dechetInHand: Dechet;
  private dechetInHandSprite: THREE.Sprite;
  private changeWasFromHere = false;

  public constructor(private ngZone: NgZone, private gameService: GameService) {
    this.gameService.pile.subscribe((newestStack) => {
      // Check also if a check for game being started is really necessary..
      console.log(`Update from stack (game state is ${this.gameService.gameInProgress}`);
      if (this.dechetInHand === undefined && this.gameService.gameInProgress && !this.changeWasFromHere) {
        console.log('Empty hand detected with update');
        const top = this.gameService.popFromPile(false);
        if (top !== undefined) {
          this.placeInHand(top);
        } else {
          console.log(`Impossible`);
        }
      }
    });
  }

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
    this.hand.scale.x = 0.8;
    this.hand.scale.y = 0.8;
    this.hand.position.z = 3;
    this.hand.position.y = 0.95;
    this.hand.position.x = -1.4;
    this.scene.add( this.hand );

    // dechet
    // const dechet = this.gameService.popFromPile();
    // const spriteDechetMap = new THREE.TextureLoader().load( `/assets/0.png` );
    // console.log(dechet.id);
    // this.spriteDechetMaterial = new THREE.SpriteMaterial( { map: spriteDechetMap, color: 0xffffff } );
    // this.dechetSprite = new THREE.Sprite( this.spriteDechetMaterial );
    // this.dechetSprite.scale.x = 0.5;
    // this.dechetSprite.scale.y = 0.5;
    // this.dechetSprite.position.z = 3;
    // this.dechetSprite.position.y = 0.46;
    // this.dechetSprite.position.x = -1.4;
    // this.scene.add( this.dechetSprite );

  }

  private placeInHand(dechet: Dechet): void {
    // TODO Change image id
    this.dechetInHand = dechet;
    const spriteDechetMap = new THREE.TextureLoader().load( `/assets/0.png` );
    const dechetMaterial = new THREE.SpriteMaterial( { map: spriteDechetMap, color: 0xffffff } );
    this.dechetInHandSprite = new THREE.Sprite(dechetMaterial);
    this.dechetInHandSprite.scale.x = 0.5;
    this.dechetInHandSprite.scale.y = 0.5;
    this.dechetInHandSprite.position.z = 3;
    this.dechetInHandSprite.position.y = 0.46;
    this.dechetInHandSprite.position.x = this.hand.position.x;
    this.scene.add( this.dechetInHandSprite );
  }

  private dropDechet(): void {
    // TODO: Drop the current dechet
    this.dechetInHand = undefined;
    this.fallingSprites.push(this.dechetInHandSprite);
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
          // start game
          // drop item

          // update points
          // TODO
          if (this.dechetInHand !== undefined) {
            this.dropDechet();
            // this.fallingSprites.push(this.dechetSprite);
          }
          // get next item from pile
          this.changeWasFromHere = true;
          const dechet = this.gameService.popFromPile();
          console.log(dechet, this.gameService.pile.value);
          if (dechet !== undefined) {
            this.placeInHand(dechet);
          }
          this.changeWasFromHere = false;
        }
        if (e.key === 'ArrowLeft') {
          // left
            if (this.hand.position.x - 1.15 > -1.5 ) {
              this.hand.translateX(-1.15);
              if (this.dechetInHand !== undefined) {
                this.dechetInHandSprite.translateX(-1.15);
              }
            } else {
              this.hand.position.x = 2.05;
              if (this.dechetInHand !== undefined) {
                this.dechetInHandSprite.position.x = 2.05;
              }
            }
        }
        if (e.key === 'ArrowRight') {
          // right
          if (this.hand.position.x + 1.15 < 2.10) {
            this.hand.translateX(1.15);
            if (this.dechetInHand !== undefined) {
              this.dechetInHandSprite.translateX(1.15);
            }
          } else {
            this.hand.position.x = -1.4;
            if (this.dechetInHand !== undefined) {
              this.dechetInHandSprite.position.x = -1.4;
            }
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

    for (const dech of this.fallingSprites) {
      dech.translateY(-0.05);

      if (dech.position.y < -0.5) {
        this.scene.remove(dech);
      }

    }

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
