kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0.5, 0.5, 0.5, 1],
})

document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'new',
      img: 'images/new.png'
    },
    {
      name: 'empty',
      img: 'images/empty.png'
    }
  ]

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
