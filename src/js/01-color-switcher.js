import throttle from 'lodash.throttle';

// Funkcja do generowania losowego koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Pobranie referencji do przycisków
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Zmienna do przechowywania identyfikatora interwału
let intervalId = null;

// Funkcja inicjująca zmianę koloru i blokująca przycisk start
function start() {
  if (intervalId) {
    return; // Jeśli interwał jest już ustawiony, ignorujemy kolejne kliknięcia
  }

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true; // Blokada przycisku start
  stopButton.disabled = false; // Aktywacja przycisku stop
}

// Funkcja zatrzymująca zmianę koloru i odblokowująca przycisk start
function stop() {
  clearInterval(intervalId);
  intervalId = null; // Wyczyszczenie identyfikatora interwału

  startButton.disabled = false; // Odblokowanie przycisku start
  stopButton.disabled = true; // Blokada przycisku stop
}

// Dodanie nasłuchiwania na przycisk start
startButton.addEventListener('click', throttle(start, 1000));

// Dodanie nasłuchiwania na przycisk stop
stopButton.addEventListener('click', throttle(stop, 1000));

// Na początku przycisk stop jest nieaktywny
stopButton.disabled = true;
