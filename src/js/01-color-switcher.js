function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const body = document.querySelector('body')
const start = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let bgColor = null

start.addEventListener('click', () => {
  console.log('start'),
    start.setAttribute('disabled', ''),
    btnStop.removeAttribute('disabled'),
    bgColor = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

btnStop.addEventListener('click', () => {
  console.log('stop'),
    btnStop.setAttribute('disabled', ''),
      start.removeAttribute('disabled');
    clearInterval(bgColor);
});
