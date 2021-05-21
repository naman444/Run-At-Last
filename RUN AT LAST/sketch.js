var bg_img;
var prince_img;
var monster_img;
var play,play_img;
var bg2_img,bg3_img;
var start,start_img;
var playSound;
var prince,prince_img;
var monster,monster_img;
var coin_animation,coin_animation_img;
var gameOver;
var reset,reset_img;
var enemy;
var invisibleGround;
var coin,points,coin_img;



var score=0;
var gameState=0;

function preload()
{
   // load sounds here
   playSound=loadSound("sounds/play_sound.mp3");

	//load images here
   bg_img=loadImage("images/bg.jpg");
   bg2_img=loadImage("images/bg2.png");
   bg3_img=loadImage("images/bg3.png");
   gameOver=loadImage("images/gameover.png");
   play_img=loadImage("images/play.png");
   start_img=loadImage("images/start_button.png");
   reset_img=loadImage("images/restart.png");
   coin_img=loadImage("images/coin1.png");

   //load animations here
   prince_img=loadAnimation("images/p1.png" , "images/p2.png" , "images/p3.png");
   monster_img = loadAnimation("images/m1.png","images/m2.png","images/m3.png","images/m4.png","images/m5.png","images/m6.png","images/m7.png","images/m8.png")
   coin_animation_img = loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png");
   
   
}

function setup() {
createCanvas(windowWidth,windowHeight);

play=createSprite(200,500);
play.addImage(play_img);
play.visible=false;
//play.debug=true;
play.setCollider("rectangle",0,0,300,140)


start=createSprite(610,500);
start.addImage(start_img);
//start.debug=true;
start.visible=false;
start.setCollider("rectangle",0,0,400,160)

prince = createSprite(150,470);
prince.addAnimation("running" , prince_img);
prince.scale=0.6;
prince.visible=false;




coin_animation = createSprite(60,70);
coin_animation.addAnimation("rotate" , coin_animation_img);
coin_animation.scale=0.7;
coin_animation.visible=false;

reset=createSprite(900,400);
reset.addImage(reset_img);
reset.scale=0.4;
reset.visible=false;

invisibleGround=createSprite(10,560,2500,10);
invisibleGround.visible=false;

//all groups
monsterGroup=new Group();
coinsGroup=new Group();

}


function draw() { 
  background("yellow") 

 //if the gamestate is 0 what will hapen
 if(gameState === 0){
  image(bg_img,windowWidth-1368,windowHeight-640,windowWidth, windowHeight+20);
 
    play.visible=true;

  if(mousePressedOver(play) && gameState === 0){
    playSound.play();
    gameState=1;
    
  }
  textSize(70);
  fill("red")
  text("RUN AT LAST",60,350);

  
}

 if(gameState===1){
    play.destroy();
   

    image(bg2_img,windowWidth-1368,windowHeight-640,windowWidth, windowHeight+20);

    //text
    fill("black");
    textSize(40);
    text("YOU ARE PRINCE AND YOUR PRINCESS IS KIDNAPPED" , 140,70);
    text("YOU HAVE TO ESCAPE THE PRINCESS FROM THE CASTLE " , 110,150);
    text("GO GO GO YOU HAVE TO DO IT " , 340,230);
    text("CLICK 'START' TO SAVE THE PRINCESS"  , 260,300);

    //start button
    start.visible=true;

  }
  if(mousePressedOver(start) && gameState === 1){
    gameState=2;
 }

  if(gameState===2){
    image(bg3_img,windowWidth-1368,windowHeight-640,windowWidth, windowHeight+20);
       
      fill("red");
      textSize(70);
      textFont("Bold");
      text("= " +score,120,100);

      start.destroy();
      prince.visible=true;
      coin_animation.visible=true;
      
      //all functions
      enemy();
      points();
     
      prince.collide(invisibleGround);
      prince.setCollider("rectangle",0,0,120,200)
   

   if(keyWentDown("space") && prince.y>469){
      prince.velocityY=-20;
      
  }
  prince.velocityY= prince.velocityY+0.8;
  
  if(coinsGroup.isTouching(prince)){
   coinsGroup.destroyEach();
   score=score+1;
  }

  if(monsterGroup.isTouching(prince)){
     gameState=3;
  }

  
  }
  if(gameState===3){
    image(gameOver,windowWidth-1368,windowHeight-640,windowWidth, windowHeight+20);
    
    reset.visible=true;
    prince.visible=false;
    monster.visible=false;
    coin_animation.visible=false;
    prince.velocityX=0;
    monsterGroup.setVisibleEach(false);
    coinsGroup.destroyEach();
  
  }


drawSprites();  
}

function enemy() {
 
  if (frameCount % 120 === 0) {
    monster = createSprite(1400,482);
    monster.x=Math.round(random(1300,1800));
    monster.scale=1.2;
    monster.addAnimation("kill",monster_img);
    monster.velocityX = -7;
    
    monster.setCollider("rectangle",0,0,80,120)
    monsterGroup.add(monster);
  }
  
}
function points(){
if(frameCount % 150 === 0){
coin=createSprite(1400,460);
coin.addImage(coin_img);
coin.x=Math.round(random(1300,1600));
coin.scale=0.5;
coin.velocityX=-9;
//coin.debug=true;
coinsGroup.add(coin);
}

}


