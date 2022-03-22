var trexSprite;
var trexAnimation;
var piso;
var pisoImage;
var pisoInvisivel;
var nuvens;
var nuvensImage;
var nuvensGroup;
var cacto;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var pontuacao=0;

function preload() {
  trexAnimation = loadAnimation("trex1.png", "trex2.png", "trex3.png");

  pisoImage = loadImage("ground2.png");

  nuvensImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");

  obstacle2 = loadImage("obstacle2.png");

  obstacle3 = loadImage("obstacle3.png");

  obstacle4 = loadImage("obstacle4.png");

  obstacle5 = loadImage("obstacle5.png");

  obstacle6 = loadImage("obstacle6.png");

  // string -> "2"
  // number 2 5
  // boolean true| false
}

function setup() {
  createCanvas(600, 200);
  // X, Y, WIDTH, HEIGHT
  trexSprite = createSprite(35, 150, 20, 50);
  trexSprite.scale = 0.5;
  trexSprite.addAnimation("correndo", trexAnimation);

  piso = createSprite(300, 175, width, 20);
  piso.x = piso.width / 2;
  piso.addImage("piso", pisoImage);

  pisoInvisivel = createSprite(300, 190, width, 10);
  pisoInvisivel.visible = false;

  nuvensGroup = createGroup();
}

function draw() {
  background("white");
  pontuacao=pontuacao + Math.round(getFrameRate()/25);
  text("pontuação: "+pontuacao,500,50);
  piso.velocityX = -4;
  pontuacao=0;

  // gravidade do trex
  trexSprite.velocityY = trexSprite.velocityY + 0.5;

  if (keyIsDown(32) && trexSprite.y > 161) {
    trexSprite.velocityY = -10;
  }

  trexSprite.collide(pisoInvisivel);

  // reset do chão
  if (piso.x < 0) {
    piso.x = piso.width / 2;
  }
  criarNuvens();
  criarCactos();
  drawSprites();
}
function criarNuvens() {
  if (frameCount % 60 == 0) {
    nuvens = createSprite(600, 100, 40, 10);
    nuvens.velocityX = -3;
    nuvens.lifetime = width / -nuvens.velocityX + 50;
    nuvens.addImage(nuvensImage);
    nuvens.y = Math.round(random(30, 80));
    nuvens.depth = trexSprite.depth;
    trexSprite.depth = trexSprite.depth + 1;
    nuvensGroup.add(nuvens);
  }
}
function criarCactos() {
  if (frameCount % 90 == 0) {
    cacto = createSprite(600, 165, 10, 40);
    cacto.velocityX = -4;
    cacto.lifetime = width / -cacto.velocityX + 50;
    var number = Math.round(random(1, 6));
    switch (number) {
      case 1:
        cacto.addImage("cacto1", obstacle1);
        break;
      case 2:
        cacto.addImage("cacto2", obstacle2);
        break;
      case 3:
        cacto.addImage("cacto3", obstacle3);
        break;
      case 4:
        cacto.addImage("cacto4", obstacle4);
        break;
      case 5:
        cacto.addImage("cacto5", obstacle5);
        break;
      case 6:
        cacto.addImage("cacto6", obstacle6);
        break;
      default:
        cacto.addImage("cacto6", obstacle6);
        break;
    }
    cacto.scale = 0.6;
  }
}
