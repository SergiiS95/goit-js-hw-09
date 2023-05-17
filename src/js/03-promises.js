import Notiflix from 'notiflix';


const form = document.querySelector('.form')
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmitForm)

function onSubmitForm(evt) {

  evt.preventDefault();
  const form = evt.currentTarget;
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);
  let position = 1;

  if (amount <= 0 || delay < 0 || step < 0) {
    Notiflix.Notify.failure(` Please input correct values (>0)`);
    return
  }

  for (let i = position; i <= amount; i++) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
    position +=1
}

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
          resolve({ position, delay });
       } else {
         reject({ position, delay });
       }
      }, delay);
  });