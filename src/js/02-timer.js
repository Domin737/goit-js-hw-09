import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './convertMs';
import throttle from 'lodash.throttle';

// Wybór elementów DOM
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let timerId = null;

// Inicjalizacja wyboru daty
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    if (selectedTime < Date.now()) {
      alert('Proszę wybrać datę w przyszłości.');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Rozpoczęcie odliczania
const startCountdown = () => {
  const endTime = new Date(
    document.getElementById('datetime-picker').value
  ).getTime();

  startButton.disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      return;
    }

    const timeComponents = convertMs(timeLeft);
    updateTimerDisplay(timeComponents);
  }, 1000);
};

// Aktualizacja wyświetlacza z nowym czasem
const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
};

// Dodawanie zera na początku do liczb
const addLeadingZero = value => String(value).padStart(2, '0');

// Nasłuchiwacze zdarzeń
startButton.addEventListener('click', throttle(startCountdown, 1000));

// Ta funkcja zatrzymuje odliczanie i resetuje przycisk start
const stopCountdown = () => {
  clearInterval(timerId);
  startButton.disabled = false;
};

// Eksport funkcji (opcjonalnie)
export { startCountdown, stopCountdown };
