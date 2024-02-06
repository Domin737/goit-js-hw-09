import Notiflix from 'notiflix';

function createPromise(position, delay) {
  position = Number(position);
  delay = Number(delay);

  if (isNaN(position) || isNaN(delay)) {
    throw new Error('Invalid position or delay');
  }

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const elements = form.elements;

  try {
    const firstDelay = Number(elements.namedItem('delay').value);
    const delayStep = Number(elements.namedItem('step').value);
    const amount = Number(elements.namedItem('amount').value);

    if (isNaN(firstDelay) || isNaN(delayStep) || isNaN(amount)) {
      throw new Error('Invalid input values');
    }

    const promises = [];
    for (let i = 1; i <= amount; i++) {
      const currentDelay = firstDelay + delayStep * (i - 1);
      promises.push(createPromise(i, currentDelay));
    }

    Promise.all(promises).then(
      results => {
        results.forEach(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        });
      },
      errors => {
        errors.forEach(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      }
    );
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

document.querySelector('.form').addEventListener('submit', handleFormSubmit);
