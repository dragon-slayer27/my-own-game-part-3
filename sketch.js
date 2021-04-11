var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score = 0;

var player,track;
var playerimg,trackimg;

var leftedge,rightedge;

var obst1,obst2,obst3,obst4;
var obstgroup;

var restart;
var restartimg;

var coinimg;
var coingroup;
var coinNumber = 0;

var lives = 3;

function preload(){
playerimg = loadImage("images/player.png");
trackimg = loadImage("images/track.gif");

obst1 = loadImage("images/obst-1.png");
obst2 = loadImage("images/obst-2.png");
obst3 = loadImage("images/obst-3.png");
obst4 = loadImage("images/obst-4.png");

coinimg = loadImage("images/coin.png");

restartimg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(800,800);

  track = createSprite(400,400,50,50);
  track.addImage(trackimg);

  player = createSprite(400, 720, 50, 50);
  player.addImage(playerimg);

  leftedge = createSprite(0, 400, 10, 800);

  rightedge = createSprite(800, 400, 10, 800);

  track.y = track.height/2;

  restart = createSprite(400,300,50,50);
  restart.addImage(restartimg);
  restart.visible = false;

  obstgroup = new Group();

  coingroup = new Group();

}

function draw() {
  background("grey");

  drawSprites();

  textFont("algerian");
  stroke("red");
  fill("yellow");
  textSize(30);
  text("Score: "+ score, 30,30);

  textSize(20);
  text("coins collected: "+ coinNumber,30,60);

  text("lives: "+ lives,30,90);

  player.scale = 1.3;
  track.scale = 2;

  player.collide(leftedge);
  player.collide(rightedge);

 if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/61);
  
  textSize(15);
  stroke("black");
  fill("red");
  text("press the right and left",590,30);
  text("arrow keys to move the car",575,50);
  text("collect the coins for extra",550,70);
  text("points",575,90);

  track.velocityY = (6+ 3*score/100);

  if(keyIsDown(LEFT_ARROW)){
    player.x = player.x - 10;
  }

  if(keyIsDown(RIGHT_ARROW)){
    player.x = player.x + 10;
  }

 if(track.y>800){
   track.y = track.height/2;
  }
  
  createobstacle();

  createcoins();

  if(player.isTouching(coingroup)){
    coingroup.destroyEach();
    score = score + 20;
    coinNumber = coinNumber + 1;
  }

  if(obstgroup.collide(player)){
    lives = lives-1;
    obstgroup.destroyEach();
  }

  if(lives===0){
    gameState = END;
  }
}

else if(gameState === END){
  track.velocityY = 0;
  obstgroup.setVelocityYEach(0);
  coingroup.setVelocityYEach(0);

  obstgroup.setLifetimeEach(-1);
  coingroup.setLifetimeEach(-1);
  textSize(25);
  stroke("green");
  fill("red");
  text("GAME OVER!!",330,400);
  restart.visible = true;
  if(mousePressedOver(restart)){
     reset();
  }
 }
}

function createobstacle(){
  if(frameCount%100==0){
   var obstacle = createSprite(random(100,700),0,50,50);
   obstacle.velocityY = (6 + 3*score/100);
   obstacle.scale = 1.3;

   var rand = Math.round(random(1,4));

   switch(rand) {
    case 1: obstacle.addImage(obst1);
            break;
    case 2: obstacle.addImage(obst2);
            break;
    case 3: obstacle.addImage(obst3);
            break;
    case 4: obstacle.addImage(obst4);
            break;
    default: break;
  }
    obstacle.lifetime = 300;

    obstgroup.add(obstacle);
  }
}

function createcoins(){
 if(frameCount%250==0){
   var coin = createSprite(random(200,600),0,50,50);
   coin.scale = 0.2;
   coin.velocityY = (6 + 3*score/100);

   coin.addImage(coinimg);
   coin.lifetime = 300;

   coingroup.add(coin);

 }

}

function reset(){
  gameState = PLAY;

  restart.visible = false;

  score = 0;
  
  obstgroup.destroyEach();
  coingroup.destroyEach();
  lives = lives + 3;
  coinNumber = 0;
}
