import Game from "./classes/Game.js"
//import Player from "./classes/Player.js"

const initGame = async () => {
 const game = await new Game()
 //console.log(game)
 //game.run()
}

window.onload = initGame

//initGame()