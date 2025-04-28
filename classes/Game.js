import Matter from 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js'
import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.6/pixi.min.js"
//const Matter = window.Matter
//const PIXI = window.PIXI

console.log(window)


import Player from '/classes/Player'
import Ground from '/classes/Ground'

class Game {
  app
  engine
  runner
  root
  constructor() {
    console.log ("init game")
    initApp()
    preload()
    compose()
    update()
  }
  
  async initApp() {
    this.root = document.body
    const app = new PIXI.Application
    await app.init({ background: "#f0f0f0", resizeTo: this.root });
    this.root.appendChild(this.app.canvas);
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    this.engine = engine 
    this.runner = runner
  }
  
  async preload() {
    const assets = [
    { alias: 'box', src: 'https://pixijs.com/assets/bunny.png' },
    { alias: 'ground', src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png' },
    ]
    
    await Assets.load(assets)
  }
  
  update() {
    this.app.ticker.add((delta) => {
    this.sceneObjects.forEach(entity => {
      entity.obj.x = entity.body.position.x
      entity.obj.y = entity.body.position.y
      entity.obj.rotation = entity.body.angle
    })
    
    Matter.Runner.tick(this.runner, this.engine, delta * (1000 / 60));
  });
  }
  
  compose() {
    const player = new Player()
    const ground = new Ground()
    this.sceneObjects.push(player)
    this.sceneObjects.push(ground)
    
  }
}

export default Game

new Game()