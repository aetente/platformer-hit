//import * as Matter from 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js'
//import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.6/pixi.min.js"
//const Matter = window.Matter
//const PIXI = window.PIXI
//import * as PIXI from 'pixi';
//import * as Matter from 'matter';

class Player {
  body
  obj
  constructor() {
    const boxObj = new PIXI.Graphics().rect(0,0,50,50).fill('#202020')
    boxObj.pivot.set(25, 25)
    const boxBody = Matter.Bodies.rectangle(150, 0, 50, 50); // x y w h
    this.obj = boxObj
    this.body = boxBody
  }
}

export default Player