//import * as Matter from 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js'
//import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.6/pixi.min.js"
//const Matter = window.Matter
//const PIXI = window.PIXI
//import * as PIXI from 'pixi';
//import * as Matter from 'matter';

class Ground {
  obj
  body
  constructor() {
    const groundObj = new PIXI.Graphics().rect(0, 0, 400, 120).fill('#202020')
    groundObj.pivot.set(200,60)
    const groundBody = Matter.Bodies.rectangle(200, 200, 400, 120, { isStatic: true });
    this.obj = groundObj
    this.body = groundBody
    //console.log(this.obj, this.body)
  }
}

export default Ground