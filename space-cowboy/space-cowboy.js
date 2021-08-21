// vim: ts=2:sw=2
document.addEventListener('DOMContentLoaded', () => {
  //const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const scoreDisplay = document.querySelector('#score')

  function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function draw() {
    var canvas = document.getElementById('field');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillRect(0, 0, 400, 400);
    }
  }

  function gameInit(){
    const easy = document.createElement('img')
    easy.setAttribute('src','img/easy.png')
    easy.addEventListener('click', gameReset)
    control.appendChild(easy)
  }

  function gameReset(){
    draw()
    scoreDisplay.textContent = 1
    startTimer()
  }

  gameInit()
})

