// Matter Modules
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composite = Matter.Composite
const Runner = Matter.Runner

const Assets = PIXI.Assets
const Sprite = PIXI.Sprite
const Application = PIXI.Application
const Graphics = PIXI.Graphics

const sceneObjects = []

const preload = async () => {
  const assets = [
  { alias: 'box', src: 'https://pixijs.com/assets/bunny.png' },
  { alias: 'ground', src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png' },
  ]
  
  await Assets.load(assets)
}


window.onload = async () => {
  // Matter.js
  const engine = Engine.create();
  const runner = Runner.create();
  const box = Bodies.rectangle(150, 0, 50, 50); // x y w h
  const ground = Bodies.rectangle(
    // x   y    w    h    options
    200, 200, 400, 120, { isStatic: true }
  );
  //const mouseConstraint = Matter.MouseConstraint.create(
  //  engine, { element: document.body }
  //);
  Composite.add(engine.world, [box, ground
  ]);
  //World.addBody(engine.world, ground)
  //World.addBody(engine.world, box)
  
  
  // Pixi.js
  const app = new Application
  await app.init({ background: "#f0f0f0", resizeTo: window });
  document.body.appendChild(app.canvas);
  
  await preload()
  
  const texture1 = await Assets.load("https://pixijs.com/assets/bunny.png")
  const texture2 = await Assets.load("https://pixijs.com/assets/bunny.png")
  //const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  
  const boxObj = new Graphics().rect(0,0,50,50).fill('#202020')
  const groundObj = new Graphics().rect(0, 0, 400, 120).fill('#202020')
  
  sceneObjects.push({obj: boxObj, body: box})
  sceneObjects.push({obj: groundObj, body: ground})
  
  const boxSprite = Sprite.from('box');
  const groundSprite = Sprite.from('ground');
  
  //boxObj.anchor.set(0.5, 0.5);
  //groundObj.anchor.set(0.5, 0.5);
  
  app.stage.addChild(boxObj);
  app.stage.addChild(groundObj);
  
  app.ticker.add((delta) => {
    sceneObjects.forEach(entity => {
      entity.obj.x = entity.body.position.x
      entity.obj.y = entity.body.position.y
      entity.obj.rotation = entity.body.angle
    })
    
    Runner.tick(runner, engine, delta * (1000 / 60));
  });
  Runner.run(runner, engine)
}