import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import { convertMs } from './convertMs';
import Notiflix from 'notiflix';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';

// Funkcja do konwersji milisekund na dni, godziny, minuty i sekundy
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Wybór elementów DOM
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let timerId = null;
let selectedTime = null;

// Opcje konfiguracyjne dla Flatpickr
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    startButton.disabled = selectedTime <= Date.now();
    if (startButton.disabled) {
      Notiflix.Notify.failure('Please choose a date in the future.');
    }
  },
  // Plugin potwierdzania wyboru daty
  plugins: [
    new confirmDatePlugin({
      confirmIcon: "<i class='fa fa-check'></i>", // Ikona przycisku / Można użyć ikony Font Awesome
      confirmText: 'OK', // Tekst na przycisku zatwierdzania
      showAlways: false, // Ustawienie na true spowoduje, że przycisk będzie wyświetlany cały czas
      theme: 'light', // lub "dark"
    }),
  ],
};

// Inicjalizacja Flatpickr
flatpickr('#datetime-picker', flatpickrOptions);

// Funkcje pomocnicze
const addLeadingZero = value => String(value).padStart(2, '0');

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
};

// Funkcja rozpoczynająca odliczanie
const startCountdown = () => {
  if (!selectedTime) return;

  startButton.disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = selectedTime - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      return;
    }

    const timeComponents = convertMs(timeLeft);
    updateTimerDisplay(timeComponents);
  }, 1000);
};

// Nasłuchiwacze zdarzeń
startButton.addEventListener('click', startCountdown);
