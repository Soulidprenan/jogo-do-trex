
var trexSprite;
var trexAnimation;
var piso;
var pisoImage;
var pisoInvisivel;

function preload(){
    trexAnimation=loadAnimation("trex1.png", "trex2.png","trex3.png");
    
    pisoImage=loadImage("ground2.png");
}

function setup() {
    createCanvas(600, 200);
    // X, Y, WIDTH, HEIGHT
    trexSprite=createSprite(35,150,20,50);
    trexSprite.scale = 0.5;
    trexSprite.addAnimation("correndo",trexAnimation);

    piso=createSprite(300,175,width,20);
    piso.x = piso.width /2;
    piso.addImage("piso",pisoImage);

    pisoInvisivel=createSprite(300,190,width,10);
    pisoInvisivel.visible=false;
}

function draw() {
    background("white");
    piso.velocityX = -4;

    // gravidade do trex
    trexSprite.velocityY = trexSprite.velocityY + 0.7;

    if(keyIsDown(32) && trexSprite.y>161) {
        trexSprite.velocityY = -10;
    }

    trexSprite.collide(pisoInvisivel);

    // reset do chão
    if(piso.x < 0) {
        piso.x = piso.width /2;
    }

    drawSprites();
}