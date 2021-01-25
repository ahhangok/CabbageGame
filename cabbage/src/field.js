'use strict';

const CABBAGE__SIZE = 80;

export const ItemType = Object.freeze({
  cabbage: 'cabbage',
  bug: 'bug',
});

export class Field {
  constructor(cabbageCount, bugCount) {
    this.cabbageCount = cabbageCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = ''; 
    this._addItem('cabbage', this.cabbageCount, './cabbage/img/cabbage.png');
    this._addItem('bug', this.bugCount, './cabbage/img/bug3.png');
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CABBAGE__SIZE;
    const y2 = this.fieldRect.height - CABBAGE__SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.cabbage')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.cabbage);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
