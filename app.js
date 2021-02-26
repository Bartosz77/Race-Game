'use strict';

const car1 = document.querySelector('.car1');
const car2 = document.querySelector('.car2');
const car = document.querySelector('.car');
const cash = document.querySelector('.cash');
const message = document.querySelector('.message');
const btnPlay = document.querySelector('.play');
const btnNewGame = document.querySelector('.play-again');
const btnChangeCar = document.querySelector('.change-car');
const btnMusic = document.querySelector('.music');
const btnFullScr = document.querySelector('.full-screen');
const btnYes = document.querySelector('.yes');
const btnNo = document.querySelector('.no');
const dollar = document.querySelector('.dollar');
const dollarBet = document.querySelector('.dollar-bet');
const elem = document.documentElement;

let activCar = 1;
let money, bet, winner;
let playing = true;
let gameReset = false;
let fullScreenStatus = true;
money = 200;
cash.textContent = money;

const fullScreen = function () {
  if (fullScreenStatus) {
    fullScreenStatus = false;
    btnFullScr.textContent = 'fullscreen off'
    /* View in fullscreen */
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    fullScreenStatus = true;
    btnFullScr.textContent = 'fullscreen'
    /* Close fullscreen */
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
};

const click = function (num) {
  document.querySelector(`.c${num}`).play();
};

const playSound = function () {
  click(2);
  const music = document.querySelector('.sound');
  if (music.paused) {
    music.play();
    btnMusic.textContent = 'music off';
  } else {
    music.pause();
    music.currentTime = 0;
    btnMusic.textContent = 'music';
  }
};

const displayMessage = function (msg) {
  message.textContent = msg;
  if (msg === 'You win!!!') {
    message.style.color = ' #4caf50';
  } else {
    message.style.color = '#F00824';
  }
};

const changeCar = function () {
  if (playing) {
    click(2);
    if (activCar) {
      car.src = `img/car2.png`;
      activCar = 0;
    } else if (!activCar) {
      car.src = `img/car1.png`;
      activCar = 1;
    }
  }
};

const showModal = function () {
  if (gameReset) {
    document.querySelector('.modal').classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
  }
};

const quit = function () {
  newGame();
  hideModal();
  gameReset = false;
};

const hideModal = function () {
  document.querySelector('.modal').classList.toggle('hidden');
  document.querySelector('.overlay').classList.toggle('hidden');
};

const newGame = function () {
  click(2);
  money = 200;
  playing = true;
  if (activCar === 0) {
    changeCar();
  }
  cash.textContent = money;
  init();
};

const init = function () {
  car1.classList.remove('win');
  car2.classList.remove('win');
  car1.classList.remove('lost');
  car2.classList.remove('lost');
  document.querySelector('.bet').value = '';
  displayMessage('');
  cash.classList.remove('cashWin');
  cash.classList.remove('cashLost');
  playing = true;
  gameReset = true;
};

const checkCanPlay = function () {
  if (money <= 0) {
    displayMessage('No more money! Game over');
    cash.classList.remove('cashLost');
    playing = false;
    gameReset = true;
  } else {
    setTimeout(init, 400);
  }
};

const increaseMoney = function () {
  click(3);
  money = money + bet;
  cash.classList.add('cashWin');
  cash.textContent = money;
  setTimeout(init, 800);
};

const decreaseMoney = function () {
  click(4);
  money = money - bet;
  cash.classList.add('cashLost');
  cash.textContent = money;
  setTimeout(checkCanPlay, 400);
};

const win = function () {
  if (activCar) {
    car1.classList.add('win');
    car2.classList.add('lost');
    setTimeout(displayMessage, 4200, 'You win!!!');
    setTimeout(increaseMoney, 4500);
  } else {
    car1.classList.add('lost');
    car2.classList.add('win');
    setTimeout(displayMessage, 4200, 'You win!!!');
    setTimeout(increaseMoney, 4500);
  }
};
const lost = function () {
  if (activCar) {
    car1.classList.add('lost');
    car2.classList.add('win');
    setTimeout(displayMessage, 4200, 'You lost!!!');
    setTimeout(decreaseMoney, 4500);
  } else {
    car1.classList.add('win');
    car2.classList.add('lost');
    setTimeout(displayMessage, 4200, 'You lost!!!');
    setTimeout(decreaseMoney, 4500);
  }
};

const play = function () {
  if (playing) {
    click(2);
    bet = Number(document.querySelector('.bet').value);
    if (!bet) {
      displayMessage('INVALID BET');
    } else if (bet > money) {
      displayMessage("You don't have enough money");
    } else {
      gameReset = false;
      playing = !playing;
      click(2);
      click(1);
      winner = Math.round(Math.random());
      if (winner) {
        win();
      } else if (!winner) {
        lost();
      }
    }
  }
};

btnPlay.addEventListener('click', play);
btnNewGame.addEventListener('click', showModal);
btnChangeCar.addEventListener('click', changeCar);
btnMusic.addEventListener('click', playSound);
btnYes.addEventListener('click', quit);
btnNo.addEventListener('click', hideModal);
btnFullScr.addEventListener('click', fullScreen);
