var boy,boyImg;
var dino,dinImg;
var food,foodImg;
var obstacle,obstacleImg;
var eatingsound;
var gameoversound;
var restart,restartImg;
var gameOver,gameOverImg;
var bgImg;
var ground;
var gameState="PLAY";
var dead,deadImg;
var idel,idelImg;
var poisonousPlant,posisonousPlantImages;

function preload(){
bgImg = loadImage("images/background.jpg");

boyImg = loadAnimation("boy/Run (1).png" , "boy/Run (2).png" , "boy/Run (3).png" , "boy/Run (4).png" , "boy/Run (5).png" , "boy/Run (6).png" , "boy/Run (7).png" , "boy/Run (8).png" , "boy/Run (9).png" , "boy/Run (10).png");

dinoImg = loadAnimation("dino/Run (1).png" , "dino/Run (2).png" , "dino/Run (3).png" , "dino/Run (4).png" , "dino/Run (5).png" , "dino/Run (6).png" , "dino/Run (7).png" , "dino/Run (8).png");

foodImg = loadImage("images/food.png");

obstacleImg = loadAnimation("obstacles/dragon1.png" , "obstacles/dragon2.png" , "obstacles/dragon3.png" , "obstacles/dragon4.png" , "obstacles/dragon5.png");

restartImg = loadImage("icons/restart-icon.png");

gameOverImg = loadImage("icons/game-over-icon.png");

eatingsound = loadSound("food-eating-sound.mp3");

gameoversound = loadSound("game-sound.mp3");

posisonousPlantImages = loadImage("obstacles/poisonous-plant.png");

//deadImg = loadImage("boy/Dead (1).png" , "boy/Dead (2).png" , "boy/Dead (3).png" , "boy/Dead (4).png" , "boy/Dead (5).png" , "boy/Dead (6).png" , "boy/Dead (7).png" , "boy/Dead (8).png" , "boy/Dead (9).png" , "boy/Dead (10).png" , "boy/Dead (11).png" , "boy/Dead (12).png" , "boy/Dead (13).png" , "boy/Dead (14).png" , "boy/Dead (15).png");

idleImg=loadImage("boy/Idle (1).png" )
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    ground = createSprite(displayWidth/2,displayHeight-40,displayWidth+500,25);
    ground.visible=true;
    
    boy = createSprite(displayWidth/2-200,displayHeight-60,20,20);
    boy.addAnimation("boy",boyImg);
    boy.scale=0.2;
    boy.setCollider("rectangle",-130,10,200,440);

    dino = createSprite(displayWidth/2-400,displayHeight-60,20,20);
    dino.addAnimation("dino",dinoImg);
    dino.scale=0.4;
    dino.setCollider("rectangle",-60,0,500,400);

    obGroup = new Group();

}

function draw(){
    background(bgImg);
    boy.collide(ground);
    dino.collide(ground);
    spawnObstacle();
    spawndr();
    if(ground.x<0){
        ground.x=ground.width/2;
    }

    if(gameState ==="PLAY"){
        boy.velocityX=4;
        dino.velocityX=4;
       if(keyDown("SPACE") && boy.isTouching(ground)){
           boy.velocityY=-15;
       }
           boy.velocityY+=0.5;
       if(dino.isTouching(obGroup)){
           dino.velocityY=-15;
       }
       dino.velocityY+=0.5;

     /*  if(boy.isTouching(obGroup)){
           boy.addImage("id",idleImg);
           boy.velocityX=0;
           gameState="END"
       }*/

       if(gameState==="END"){
        background("red");
           boy.visible=false;
           dino.visible=false;
           textSize(40);
           strokeWeight(4);
           stroke("blue");
           fill("green");
           textFont("Sans serif fonts")
           text("GAME OVER",displayWidth/2+600,displayHeight/2);
           dino.velocity=0;
          // ob.visible=false;
           //drag.visible=false;
           obGroup.setLifetimeEach(-1);   
           camera.x=displayWidth/2;    
       }

}
camera.position.x=boy.x;
drawSprites();
}

function spawnObstacle(){
if(frameCount%100===0){
    var ob = createSprite(displayWidth+50,displayHeight-115,20,20);
    ob.addImage("po",posisonousPlantImages);
    ob.velocityX=-5;
  ob.scale=0.5;
  obGroup.add(ob); 
   ob.lifetime=400;
}
}

function spawndr(){
    if(frameCount%200===0){
        var drag = createSprite(displayWidth+50,displayHeight-300,20,20);
        drag.addAnimation("dragon",obstacleImg);
        drag.velocityX=-5;
        drag.scale=0.5;
        obGroup.add(drag);
        drag.lifetime=400;
    }
}