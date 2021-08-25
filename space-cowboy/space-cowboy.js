// vim: ts=2:sw=2
document.addEventListener('DOMContentLoaded', () => {
  //const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const scoreDisplay = document.querySelector('#score')
  var enemies = []
  var iBad  = new Image()
  iBad.src = 'img/bad.png'
  var iGood = new Image()
  iGood.src = 'img/good.png'
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
      x=rand(0,380)
      y=rand(0,380)
      enemies.push([x,y])
      ctx.drawImage(iBad,x,y,20,20) 
    }
    timer = setInterval(endRound, delay)
  }

  function endRound(){
    console.log("endRound()")
    clearTimeout(timer)
    if(enemies.length>0){
      scoreDisplay.textContent = 'bang'
      gameState = 'dead'
    } else {
      drawCanvas()
      var num = Math.ceil(score/5)
      timer = setInterval(function(){spawnEnemies(num)}, 1000)
    }
  }

  function click(){
    if(gameState==='play'){
      console.log('click()')
      const X = Math.floor(event.clientX - rect.left);
      const Y = Math.floor(event.clientY - rect.top);
      console.log([X,Y])
      for(i=enemies.length-1;i>=0;i--){
        if(X>=enemies[i][0] && X<=enemies[i][0]+20 && Y>=enemies[i][1] && Y<=enemies[i][1]+20){
          score+=1
          scoreDisplay.textContent = score
          ctx.drawImage(iGood,enemies[i][0],enemies[i][1],20,20) 
          enemies.splice(i,1);
        }
      }
    }
  }

  function drawCanvas(){
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

