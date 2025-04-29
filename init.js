import Game from "./classes/Game.js"
//import Player from "./classes/Player.js"

const initGame = async () => {
 const game = new Game()
 game.run()
}

window.onload = initGame

//initGame()