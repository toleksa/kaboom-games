// vim: ts=2:sw=2
//
// gun https://www.fesliyanstudios.com/royalty-free-sound-effects-download/gun-shooting-300
// gameover https://mixkit.co/free-sound-effects/game-over/
//
document.addEventListener('DOMContentLoaded', () => {
  //const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const scoreDisplay = document.querySelector('#score')
  var enemies = []
  var enemySize = 20
  var iBad  = new Image()
  iBad.src = 'img/bad.png'
  var iGood = new Image()
  iGood.src = 'img/good.png'
  //var gun = new Audio('gun4.mp3');
  var canvas = document.getElementById('field');
  canvas.addEventListener('click', click, false);
  var rect = canvas.getBoundingClientRect();
  var ctx = canvas.getContext('2d');
  var delay
  var score
  var timer
  var gameState

  function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function spawnEnemies(num){
    console.log("spawnEnemies()")
    clearTimeout(timer)
    for(i=0;i<num;i++){
      x=rand(0,400-enemySize)
      y=rand(0,400-enemySize)
      enemies.push([x,y])
      ctx.drawImage(iBad,x,y,enemySize,enemySize) 
    }
    timer = setInterval(endRound, delay)
  }

  function endRound(){
    console.log("endRound()")
    clearTimeout(timer)
    if(enemies.length>0){
      var sound = new Audio('gameover.mp3')
      sound.play()
      ctx.fillStyle = "blue";
      ctx.font = "bold 46px Arial";
      ctx.fillText("GameOver", (canvas.width * 0.2), (canvas.height / 2));
      gameState = 'dead'
    } else {
      drawCanvas()
      var num = Math.ceil((score+1)/5)
      timer = setInterval(function(){spawnEnemies(num)}, 1000)
    }
  }

  function click(){
    if(gameState==='play'){
      console.log('click()')
      var gun = new Audio('gun4.mp3');
      gun.play();
      const X = Math.floor(event.clientX - rect.left);
      const Y = Math.floor(event.clientY - rect.top);
      console.log([X,Y])
      for(i=enemies.length-1;i>=0;i--){
        if(X>=enemies[i][0] && X<=enemies[i][0]+enemySize && Y>=enemies[i][1] && Y<=enemies[i][1]+enemySize){
          score+=1
          scoreDisplay.textContent = score
          ctx.drawImage(iGood,enemies[i][0],enemies[i][1],enemySize,enemySize) 
          enemies.splice(i,1);
        }
      }
    }
  }

  function drawCanvas(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
  }

  function gameInit(){
    const easy = document.createElement('img')
    easy.setAttribute('src','img/easy.png')
    easy.addEventListener('click', gameReset)
    control.appendChild(easy)
  }

  function gameReset(){
    console.log("gameReset()")
    score = 0
    delay = 3000
    gameState = 'play'
    enemies = []
    drawCanvas()
    scoreDisplay.textContent = score
    timer = setInterval(function(){spawnEnemies(1)}, 1000)
  }

  gameInit()
})

