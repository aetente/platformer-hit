//import * as Matter from 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js'
//import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.6/pixi.min.js"
//const Matter = window.Matter
//const PIXI = window.PIXI
//import * as PIXI from 'pixi';
//console.log(PIXI)
//import * as Matter from 'matter';




import Player from '../classes/Player.js'
import Ground from '../classes/Ground.js'

class Game {
  app
  engine
  runner
  root
  sceneObjects=[]
  renderer
  constructor() {
    this.assemble()
  }
  
  async assemble() {
    console.log("start assemble")
    await this.preload()
    await this.initApp()
    this.compose()
    this.update()
    console.log("finish assemble")
    this.run()
  }
  
  async initApp() {
    this.root = document.body
    this.app = new PIXI.Application
    await this.app.init({ background: "#f0f0f0", resizeTo: window });
    this.root.appendChild(this.app.canvas);
    this.renderer = new PIXI.Graphics()
    //const groundObj = new PIXI.Graphics().rect(0, 0, 400, 120).fill('#202020')
    
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
        //console.log(entity.obj.y)
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
    //console.log(player)
    //console.log(ground)
    //console.log( [player, ground], ground)
    this.sceneObjects = [player, ground]
    
    const sceneBodies = this.sceneObjects.map(o => o.body)
    this.sceneObjects.forEach(o => {
      this.app.stage.addChild(o.obj)
    })
    console.log(sceneBodies)
    Matter.Composite.add(this.engine.world, sceneBodies);
    
    console.log("finish compose")
  }
  
  run() {
    Matter.Runner.run(this.runner, this.engine)
    console.log("run")
  }
}

export default Game
