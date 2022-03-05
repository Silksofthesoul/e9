const { min } = Math;
const elMain = document.body;

let fr = 60;
let width = elMain.offsetWidth || 640;
let height = elMain.offsetHeight || 640;
let step = min(height, width) / 7 || 50;
let degScene = 0;


const fontSize = 32;
let c = 1;
let y = 90;
let yy = 0.05;

const gx = (len, deg) => len * sin((-deg + 180) * PI / 180) + len;
const gy = (len, deg) => len * cos((deg + 180) * PI / 180) + len;


class Worm{
  constructor({x = 0, y = 0, deg = 0, stroke = 'rgb(0, 0, 0)'}) {
    this.x = x;
    this.y = y;
    this._deg = deg;
    this.stroke = stroke;
  }
  set deg(val) {
    this._deg = val % 360;
  }

  get deg() {
    return this._deg;
  }
  step({x = null, y = null, deg = null}) {
    this.deg = deg === null ? this.deg : deg;
    this.x = x || this.x;
    this.y = y || this.y;

    const convertX = val => val - step;
    const convertY = val => val - step;

    const nextX = floor(convertX(this.x) + gx(step, this.deg));
    const nextY = floor(convertY(this.y) + gy(step, this.deg));
    stroke(this.stroke);
    line(this.x, this.y, nextX, nextY);

  }
}

let worm0 = new Worm({x: 100, y: 100, deg: 10, stroke: 'rgb(255,0,0)'});
let worm180 = new Worm({x: 100, y: 100, deg: 10, stroke: 'rgb(0, 0,255)'});

function setup() {
  createCanvas(width, height);
  frameRate(fr);
}

function draw() {

  background('rgba(255, 255, 255, 0.02)');
  degScene += 2;

  worm0.step({
    deg: degScene,
    x: step * sin((degScene) * PI / y) + width / 2,
    y: step * cos((degScene) * PI / y) + height / 2,
  });

  worm180.step({
    deg: degScene,
    x: -step * sin((degScene) * PI / y) + width / 2,
    y: -step * cos((degScene) * PI / y) + height / 2,
  });


  if(y >= 180) yy = -yy;
  else if(y <= 70) yy = -yy;

  y += yy;
  c++;

  if(c > 360) c = 1;

}
