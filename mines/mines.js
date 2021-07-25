document.addEventListener('DOMContentLoaded', () => {
  const typesArray = [
    {
      name: 'new',
      img: 'img/new.png'
    },
    {
      name: 'empty',
      img: 'img/empty.png'
    },
    {
      name: 'mine',
      img: 'img/mine.png'
    },
    {
      name: 'flag',
      img: 'img/flag.png'
    },
    {
      name: '1',
      img: 'img/1.png'
    },
  ]

  const board=[]

  const grid = document.querySelector('.grid')
  const minesDisplay = document.querySelector('#mines')
  const timerDisplay = document.querySelector('#timer')
  let mines = 10
  let minesLeft = mines

  function createBoard(x,y,mines){
    for (let i=0; i<x; i++){
      for (let j=0; j<y; j++){
        const field = document.createElement('img')
        field.setAttribute('src','img/new.png')
        field.setAttribute('x',i)
        field.setAttribute('y',j)
        field.setAttribute('coord',i + "x" + j)
        field.setAttribute('type','new')
        field.setAttribute('counter',0)
        field.addEventListener('click', clickField)
        field.addEventListener('contextmenu', clickFlag)
        grid.appendChild(field)
      }
    }
    for(let i=0; i<mines; i++){
      let coord = i + 'x' + i
      let newMine = document.querySelector("[coord=" + CSS.escape(coord) + "]")
      newMine.setAttribute('type','mine')
    }

    document.querySelector("[coord='9x1']").setAttribute('counter','1')
    document.querySelector("[coord='9x2']").setAttribute('counter','2')
    document.querySelector("[coord='9x3']").setAttribute('counter','3')
    document.querySelector("[coord='9x4']").setAttribute('counter','4')
    document.querySelector("[coord='9x5']").setAttribute('counter','5')
    document.querySelector("[coord='9x6']").setAttribute('counter','6')
    document.querySelector("[coord='9x7']").setAttribute('counter','7')
    document.querySelector("[coord='9x8']").setAttribute('counter','8')
  }

  function clickField(){
    let type = this.getAttribute('type')
    if (type == 'new'){
      let counter = this.getAttribute('counter')
      this.setAttribute('type','empty')
      this.setAttribute('src','img/empty.png')
    }
    if (type == 'mine'){
      this.setAttribute('src','img/mine.png')
    }
    minesDisplay.textContent = minesLeft
  }

  function clickFlag(e){
    e.preventDefault();
    if(this.getAttribute('type') == 'flag'){
      this.setAttribute('type','new')
      this.setAttribute('src','img/new.png')
      minesLeft++
      minesDisplay.textContent = minesLeft
      return
    }
    if(this.getAttribute('src') == 'img/new.png'){
      this.setAttribute('type','flag')
      this.setAttribute('src','img/flag.png')
      minesLeft--
      minesDisplay.textContent = minesLeft
      return 
    }
  }

  createBoard(10,10,mines)
})

