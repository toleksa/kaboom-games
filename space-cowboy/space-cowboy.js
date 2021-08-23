// vim: ts=2:sw=2
document.addEventListener('DOMContentLoaded', () => {
  //const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const scoreDisplay = document.querySelector('#score')
  var iBad  = new Image()
  iBad.src = 'img/bad.png'
  var iGood = new Image()
  iGood.src = 'img/good.png'
  var canvas = document.getElementById('field');
  var ctx = canvas.getContext('2d');
  var delay = 0
  var score = 0

  function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function spawnEnemies(){
    x=rand(0,380)
    y=rand(0,380)
    ctx.drawImage(iBad,x,y,20,20) 
  }

  function startTimer(){
    timer = setInterval(function(){
      spawnEnemies()
    }, delay)
  }

  function gameInit(){
    const easy = document.createElement('img')
    easy.setAttribute('src','img/easy.png')
    easy.addEventListener('click', gameReset)
    control.appendChild(easy)
  }

  function gameReset(){
    score = 0
    delay = 1000
    ctx.fillRect(0, 0, 400, 400);
    scoreDisplay.textContent = 1
    startTimer()
  }

  gameInit()
})

