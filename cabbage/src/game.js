'use strict';

import { Field, ItemType } from './field.js';

export const Reason = Object.freeze({
  win: 'won',
  lose: 'lose',
  cancle: 'cancle',
});

//Builder pattern : 오브젝트를 간편하고 읽기 쉽게 만듬
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  cabbageCount(num) {
    this.cabbageCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.cabbageCount, this.bugCount);
  }
}

class Game {
  constructor(gameDuration, cabbageCount, bugCount) {
    this.gameDuration = gameDuration;
    this.cabbageCount = cabbageCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        //if는 안에 조건문이 참(true)이면 실행 그런데 지금 초기값 false임 그래서 else먼저 시작
        this.stop(Reason.cancle);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(cabbageCount, bugCount);
    this.gameField.setClickListner(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    //matches는 css셀렉터가 매칭되야할때
    if (item === ItemType.cabbage) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.cabbageCount) {
        this.stopGameTimer();
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      //벌레
      this.stopGameTimer();
      this.stop(Reason.lose);
    }
  };

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimesec = this.gameDuration;
    this.updateTimerText(remainingTimesec);
    this.timer = setInterval(() => {
      if (remainingTimesec <= 0) {
        clearInterval(this.timer);
        this.stop(this.cabbageCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimesec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.cabbageCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.cabbageCount - this.score;
  }
}
