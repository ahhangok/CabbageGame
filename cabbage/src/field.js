'use strict';

const CABBAGE__SIZE = 80; //버그와 양배추 중 큰사이즈 아이 사이즈 변수 설정

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
    //자바스크립트에서 어떤클래스를 누군가에게 전달해 줄때는 클래스 정보가 무시되기 때문에
    //클래스 정보를 무시하고 싶지 않을때는 (클래스와 함수를 묶는것)바인딩을 해줘야함
  }

  init() {
    this.field.innerHTML = ''; //새로추가할때 마다 버그랑 양배추가 늘어나는 것을 막아줌
    //벌레와 양배추를 생성한뒤 field에 추가해줌
    //addItem앞에 _은 외부에서 온 프라이빗한 아이임을 나타냄
    this._addItem('cabbage', this.cabbageCount, './cabbage/img/cabbage.png');
    this._addItem('bug', this.bugCount, './cabbage/img/bug3.png');
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    //   //필드전체에서 끝에서 시작되면 상대적으로 이미지가 큰
    //    양배추가 삐져나와서 양배추 사이즈를 빼줘야함
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

  //바인딩 하기: onClick이라는 멤버변수로 만들고 이 멤버변수는 이렇게 arrow fuction을 가리키고 있음
  onClick = (event) => {
    const target = event.target;
    //matches는 css셀렉터가 매칭되야할때
    if (target.matches('.cabbage')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.cabbage);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

//max의 숫자 포함하지않은 상태에서 랜덤함수 추출
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
