//import * as Matter from 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js'
//import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.6/pixi.min.js"
//const Matter = window.Matter
//const PIXI = window.PIXI


import Player from '../classes/Player.js'
import Ground from '../classes/Ground.js'

class Game {
  app
  engine
  runner
  root
  sceneObjects=[]
  constructor() {
    this.assemble()
  }
  
  async assemble() {
    console.log("start assemble")
    await this.preload()
    await this.initApp()
    this.compose()
    this.update()
  }
  
  async initApp() {
    this.root = document.body
    this.app = new PIXI.Application
    await this.app.init({ background: "#f0f0f0", resizeTo: window });
    this.root.appendChild(this.app.canvas);
    
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    this.engine = engine 
    this.runner = runner
    console.log("finish initApp")
  }
  
  async preload() {
    const assets = [
    { alias: 'box', src: 'https://pixijs.com/assets/bunny.png' },
    { alias: 'ground', src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png' },
    ]
    
    await PIXI.Assets.load(assets)
    console.log("finish preload")
  }
  
  update() {
    this.app.ticker.add((delta) => {
      this.sceneObjects.forEach(entity => {
        entity.obj.x = entity.body.position.x
        entity.obj.y = entity.body.position.y
        entity.obj.rotation = entity.body.angle
        //console.log(entity.obj.y)
      })
      
      Matter.Runner.tick(this.runner, this.engine, delta * (1000 / 60));
    });
    console.log("finish update")
  }
  
  compose() {
    const player = new Player(this.engine.world)
    const ground = new Ground(this.engine.world)
    console.log(ground)
    console.log( [player, ground], ground)
    this.sceneObjects = [player, ground]
    console.log(this.sceneObjects)
    /*
    const sceneBodies = this.sceneObjects.map(o => o.body)
    console.log(sceneBodies)
    Matter.Composite.add(this.engine.world, sceneBodies);
    */
    console.log("finish compose")
  }
  
  run() {
    Matter.Runner.run(this.runner, this.engine)
    console.log("run")
  }
}

export default Game
