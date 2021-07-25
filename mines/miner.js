document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    {
      name: 'new',
      img: 'images/new.png'
    },
    {
      name: 'empty',
      img: 'images/empty.png'
    },
    {
      name: 'mine',
      img: 'images/mine.png'
    },
  ]

  const grid = document.querySelector('.grid')
  const minesDisplay = document.querySelector('#mines')
  const timerDisplay = document.querySelector('#timer')

  function createBoard(x,y,mines){
    for (let i=0; i<x; i++){
      for (let j=0; j<y; j++){
        const field = document.createElement('img')
        field.setAttribute('src','img/new.png')
        field.setAttribute('x',i)
        field.setAttribute('y',j)
        field.addEventListener('click', clickField)
        grid.appendChild(field)
      }
    }
  }

  createBoard(10,10,10)
})

