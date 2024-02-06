import Notiflix from 'notiflix';

// Funkcja tworzy obietnicę, która po określonym czasie (delay) zostanie rozwiązana lub odrzucona
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // 70% szans na rozwiązanie obietnicy
    setTimeout(() => {
      if (shouldResolve) {
        // Jeśli warunek spełniony, obietnica zostaje rozwiązana
        resolve({ position, delay });
      } else {
        // Jeśli warunek niespełniony, obietnica zostaje odrzucona
        reject({ position, delay });
      }
    }, delay);
  });
}

// Funkcja obsługująca wysłanie formularza
function handleFormSubmit(event) {
  event.preventDefault(); // Zapobiega domyślnemu zachowaniu formularza

  const form = event.currentTarget; // Pobieranie aktualnego formularza
  const firstDelay = Number(form.elements.namedItem('delay').value); // Pobranie pierwszego opóźnienia
  const delayStep = Number(form.elements.namedItem('step').value); // Pobranie kroku opóźnienia
  const amount = Number(form.elements.namedItem('amount').value); // Pobranie ilości obietnic

  // Pętla tworząca obietnice z odpowiednim opóźnieniem i numerem
  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + delayStep * (i - 1);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        // Obsługa rozwiązanej obietnicy
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // Obsługa odrzuconej obietnicy
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

// Dodanie słuchacza zdarzeń do formularza na zdarzenie 'submit'
document.querySelector('.form').addEventListener('submit', handleFormSubmit);
