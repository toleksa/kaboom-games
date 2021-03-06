document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const control = document.querySelector('.control')
  const minesDisplay = document.querySelector('#mines')
  var mode = 'easy'
  var sizeX = 10
  var sizeY = 10
  var mines = 10
  var minesLeft = mines
  var gameState = 'play'
  var seconds = 0
  var timer = null
  var timerRun = false

  function startTimer(){
    timer = setInterval(function(){
      seconds+=1
      var min = Math.floor(seconds / 60)
      var sec = Math.floor(seconds - min * 60)
      document.getElementById("timer").innerHTML = min + "m" + sec + "s"
    }, 1000)
    timerRun = true
  }

  function stopTimer(){
    clearTimeout(timer)
    timerRun = false
  }

  function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function createBoard(x,y,mines){
    stopTimer()

    const easy = document.createElement('img')
    easy.setAttribute('src','img/easy.png')
    easy.setAttribute('difficulty','easy')
    easy.addEventListener('click', gameReset)
    control.appendChild(easy)

    const medium = document.createElement('img')
    medium.setAttribute('src','img/medium.png')
    medium.setAttribute('difficulty','medium')
    medium.addEventListener('click', gameReset)
    control.appendChild(medium)

    const hard = document.createElement('img')
    hard.setAttribute('src','img/hard.png')
    hard.setAttribute('difficulty','hard')
    hard.addEventListener('click', gameReset)
    control.appendChild(hard)
    
    for (let i=0; i<x; i++){
      for (let j=0; j<y; j++){
        const field = document.createElement('img')
        field.setAttribute('src','img/new.png')
        field.setAttribute('coord',i + "x" + j)
        field.setAttribute('type','new')
        field.setAttribute('counter',0)
        field.addEventListener('click', clickField)
        field.addEventListener('contextmenu', clickFlag)
        grid.appendChild(field)
      }
    }

    //deploy mines
    var counter = 0
    while(true){
      var coord = randomInt(0,sizeX-1) + 'x' + randomInt(0,sizeY-1)
      var field = document.querySelector("[coord=" + CSS.escape(coord) + "]")
      if(field.getAttribute('type')!='mine'){
        field.setAttribute('type','mine')
        counter++
      }
      if(counter==mines){
        break
      }
    }

    //calculate counter for each field (num of mines around)
    for (let i=0; i<x; i++){
      for (let j=0; j<y; j++){
        var currField=document.querySelector("[coord=" + CSS.escape(i + 'x' + j) + "]")
        var counter = 0
        if(currField.getAttribute('type')=='mine'){
          continue
        }
        for(var k=i-1; k<=i+1; k++){
          if((k<0) || (k>=x)){
            continue
          } else {
            for(var l=j-1; l<=j+1; l++){
              if((l<0) || (l>=y)){
                continue
              } else {
                if((k==x) && (l==y)){
                  continue
                }
                var neighboor=document.querySelector("[coord=" + CSS.escape(k + 'x' + l) + "]")
                if(neighboor.getAttribute('type')=='mine'){
                  counter++
                }
              }
            }
          }
        }
        currField.setAttribute('counter',counter)
      }
    }
    minesDisplay.textContent = minesLeft
  } // END createBoard(x,y,mines)

  function checkNeighboors(coord){
    var fields = coord.split('x')
    var x = parseInt(fields[0])
    var y = parseInt(fields[1])
    for(var k=x-1; k<x+2; k++){
      if((k<0) || (k>=sizeX)){
        continue
      } else {
        for(var l=y-1; l<=y+1; l++){
          if((l<0) || (l>=sizeY)){
                continue
          } else {
            if((k==x) && (l==y)){
              continue
            }
            var neighboor=document.querySelector("[coord=" + CSS.escape(k + 'x' + l) + "]")
            var counter = neighboor.getAttribute('counter')
            if(neighboor.getAttribute('type')=='new' && neighboor.getAttribute('src')!='img/flag.png'){
              neighboor.setAttribute('type','field')
              if(counter=='0'){
                neighboor.setAttribute('src','img/empty.png')
                checkNeighboors(neighboor.getAttribute('coord'))
              } else {
                neighboor.setAttribute('src','img/' + counter + '.png')
              }
            }
          }
        }
      }
    }
  }

  function checkVictory(){
    if(minesLeft!=0){
      return
    }
    var counter = 0
    for(var x=0; x<sizeX; x++){
      for(var y=0; y<sizeY; y++){
        currentField = document.querySelector("[coord=" + CSS.escape(x + 'x' + y) + "]")
        if(currentField.getAttribute('type')=='mine' && currentField.getAttribute('src')=='img/flag.png'){
          counter++
        }
      }   
    }
    if(counter==mines){
      gameState='won'
      stopTimer()
      minesDisplay.textContent = 'You won :)'
    }
  }

  function clickField(){
    if(gameState!='play'){
      return
    }
    if(timerRun==false){
      startTimer()
    }
    if(this.getAttribute('src') == 'img/flag.png'){
      return
    }

    let type = this.getAttribute('type')
    if (type == 'new'){
      let counter = this.getAttribute('counter')
      if(counter!='0'){
        this.setAttribute('src','img/' + counter + '.png')
      } else {
        this.setAttribute('src','img/empty.png')
        checkNeighboors(this.getAttribute('coord'))
      }
      this.setAttribute('type','field')
      minesDisplay.textContent = minesLeft
    }
    if (type == 'mine'){
      minesDisplay.textContent = 'BOOM!'
      this.setAttribute('src','img/mine.png')
      gameState='lost'
      stopTimer()
    }
  }

  function clickFlag(e){
    e.preventDefault()
    if(gameState!='play'){
      return
    }
    if(timerRun==false){
      startTimer()
    }
    var type = this.getAttribute('type')
    if((type == 'new' || type == 'mine') && this.getAttribute('src') == 'img/new.png'){
      this.setAttribute('src','img/flag.png')
      minesLeft--
      minesDisplay.textContent = minesLeft
      if(minesLeft==0){
        checkVictory()
      }
      return 
    }
    if((type == 'new' || type == 'mine') && this.getAttribute('src') == 'img/flag.png'){
      this.setAttribute('src','img/new.png')
      minesLeft++
      minesDisplay.textContent = minesLeft
      if(minesLeft==0){
        checkVictory()
      }
      return
    }
  }

  function gameReset(){
    while (grid.lastElementChild) {
      grid.removeChild(grid.lastElementChild);
    }
    while (control.lastElementChild) {
      control.removeChild(control.lastElementChild);
    }
    mode=this.getAttribute('difficulty')
    if(mode=='easy'){
      sizeX=10
      sizeY=10
      mines=10
      grid.style.width = '400px'
      grid.style.height = '400px'
    }
    if(mode=='medium'){
      sizeX=15
      sizeY=15
      mines=25
      grid.style.width = '600px'
      grid.style.height = '600px'
    }
    if(mode=='hard'){
      sizeX=20
      sizeY=20
      mines=60
      grid.style.width = '800px'
      grid.style.height = '800px'
    }

    minesLeft=mines
    gameState='play'
    stopTimer()
    seconds=0
    document.getElementById("timer").innerHTML = '0m0s'
    createBoard(sizeX,sizeY,mines)
  }

  createBoard(sizeX,sizeY,mines)  
})

