import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let selectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    else {
      console.log(selectedDates[0]);
      start.removeAttribute('disabled');
      selectedDate = selectedDates[0].getTime();
          }
  },
};

flatpickr('#datetime-picker', options);

start.setAttribute('disabled', '');
start.addEventListener('click', onBtnClick);

function onBtnClick() {
  let timer = setInterval(() => {
    start.setAttribute('disabled', '');
    const timeDifference = selectedDate - new Date().getTime();
    if (timeDifference <= 0) {
     return clearInterval(timer);
    }
    else{
    let arrayTime = convertMs(timeDifference);
    console.log(arrayTime);
    days.textContent = addLeadingZero(arrayTime.days);
    hours.textContent = addLeadingZero(arrayTime.hours);
    minutes.textContent = addLeadingZero(arrayTime.minutes);
      seconds.textContent = addLeadingZero(arrayTime.seconds);}
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
