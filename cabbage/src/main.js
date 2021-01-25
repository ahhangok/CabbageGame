'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(15)
  .withCabbageCount(20)
  .withBugCount(10)
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancle:
      message = 'REPLAY?';
      break;
    case Reason.win:
      message = 'YOU WON';
      break;
    case Reason.lose:
      message = 'YOU LOSE';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListner(() => {
  game.start();
});
