document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const scoreDisplay = document.querySelector('#score')

  function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function gameInit(){
    const easy = document.createElement('img')
    easy.setAttribute('src','img/easy.png')
    easy.addEventListener('click', gameReset)
    control.appendChild(easy)
  }

  function gameReset(){
    scoreDisplay.textContent = 1
    startTimer()
  }

  gameInit()

})

