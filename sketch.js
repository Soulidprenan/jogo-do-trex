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
var pontuacao = 0;
var cactosGroup;
var trexCollide;
var gameOver;
var restart;
var gameOverImg;
var restartImg;

const ENCERRAR = 1;
const JOGANDO = 0;
var estado = JOGANDO;

function preload() {
  trexAnimation = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trexCollide = loadAnimation("trex_collided.png");

  pisoImage = loadImage("ground2.png");

  nuvensImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");

  obstacle2 = loadImage("obstacle2.png");

  obstacle3 = loadImage("obstacle3.png");

  obstacle4 = loadImage("obstacle4.png");

  obstacle5 = loadImage("obstacle5.png");

  obstacle6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

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
  trexSprite.addAnimation("chorando", trexCollide);
  //trexSprite.debug=true
  trexSprite.setCollider("circle", -1, 0, 40);

  piso = createSprite(300, 175, width, 20);
  piso.x = piso.width / 2;
  piso.addImage("piso", pisoImage);

  pisoInvisivel = createSprite(300, 190, width, 10);
  pisoInvisivel.visible = false;

  gameOver = createSprite(300, 100);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(300, 130);
  restart.addImage("restart", restartImg);
  restart.scale = 0.3;

  nuvensGroup = createGroup();
  cactosGroup = createGroup();
}

function draw() {
  background("white");

  text("pontuação: " + pontuacao, 500, 50);

  drawSprites();

  if (estado == JOGANDO) {
    pontuacao = pontuacao + Math.round(getFrameRate() / 25);
    piso.velocityX = -4;
    gameOver.visible=false;
    restart.visible=false;
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
    if (trexSprite.isTouching(cactosGroup)) {
      estado = ENCERRAR;
    }
  } else if (estado == ENCERRAR) {
    cactosGroup.setVelocityXEach(0);
    nuvensGroup.setVelocityXEach(0);
    piso.velocityX = 0;
    nuvensGroup.setLifetimeEach(-1);
    cactosGroup.setLifetimeEach(-1);
    trexSprite.velocityY = 0;
    trexSprite.changeAnimation("chorando");
    gameOver.visible=true;
    restart.visible=true;

    if (mousePressedOver(restart)) {
      reset();
    }
  }
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
    cactosGroup.add(cacto);
  }
}
function reset() {
  estado = JOGANDO;
  nuvensGroup.destroyEach();
  cactosGroup.destroyEach();
  trexSprite.changeAnimation("correndo");
  pontuacao = 0;
}
