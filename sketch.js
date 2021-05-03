var Start=0, Play=1, End=2, gameState=0;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage, ground, groundImage;
var foodGroup, obstacleGroup;
var score=0, survivalTime=0;
var gameOverImg,restartImg,invisibleGround,gameOver,restart;
var cloudsGroup, cloudImage, cloud;

function preload(){
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  cloudImage = loadImage("cloud.png");
}


function setup() {
  createCanvas(800,600);
  monkey=createSprite(50,450,20,20);
  monkey.scale=0.15;
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.visible=false;
  ground=createSprite(400,550,800,20);
  ground.addImage("ground",groundImage);
  foodGroup=createGroup();
  cloudsGroup=createGroup();
  obstacleGroup=createGroup();
  gameOver = createSprite(400,250,20,20);
  gameOver.addImage(gameOverImg);
  restart = createSprite(400,300,20,20);
  restart.addImage(restartImg);
  gameOver.scale = 0.75;
  restart.scale = 0.75;
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(0,480,400,10);
  invisibleGround.shapeColor="brown";
  invisibleGround.visible = false;
}

function draw() {
background("brown");
  if(gameState===Start){
    fill("red");
    textSize(32);
    text("Press 'S' to Start MONKEY GAME!",140,240);
    fill("black");
    textSize(32);
    text("&  To PLAY~~>",280,290);
    fill("yellow");
    textSize(32);
    text("Press 'SPACE' to jump MONKEY!",150,340);
    ground.visible=false;
    monkey.visible=false;
    restart.visible=false;
    gameOver.visible=false;
  }
  if(keyDown("s") && gameState === Start){
    gameState=Play;
  }
   if(gameState===Play){
      background(rgb(40,160,255));
      monkey.visible=true;
      ground.visible=true;
      ground.velocityX=-7; 
      
   monkey.velocityY += 0.8;
   
   stroke="white";
   textSize(20);
   fill("black");
   text("Survival Time : "+survivalTime,100,70);
   survivalTime=Math.ceil(frameCount/frameRate());
     
   textSize(20);
   fill("green");
   text("Score : "+score,590,70);
     
   spawnClouds();
   spawnObstacles();
   spawnbananas(); 
   
    cloudsGroup.depth = foodGroup.depth;
    foodGroup.depth = foodGroup.depth + 1;
    
    cloudsGroup.depth = restart.depth;
    restart.depth = restart.depth + 1;
     
    monkey.depth=ground.depth;
    monkey.depth+=1;
    
    monkey.depth=cloudsGroup.depth;
    monkey.depth+=1;
     
     if(keyDown("space") && monkey.y >= 300 && gameState===Play) {
        monkey.velocityY = -10;
       } 
     
     monkey.collide(invisibleGround); 
      
     if (ground.x < 100){
         ground.x = ground.width/2;
     }
     if (invisibleGround.x < 100){
         invisibleGround.x = invisibleGround.width/2;
     }
     
     if(foodGroup.isTouching(monkey)){
      score+=Math.round(random(1,5));
      foodGroup[0].destroy();
     }
     if(obstacleGroup.isTouching(monkey)){
      gameState=End;
     }
   }
     else if(gameState===End){
      background(rgb(40,160,255));
      monkey.changeAnimation("collided", monkey_collided);
      ground.velocityX = 0;
      monkey.velocityY=0;
      ground.visible=true;
      monkey.visible=true;
      gameOver.visible=true;
      restart.visible=true;
      obstacleGroup.setLifetimeEach(-2);
      foodGroup.setLifetimeEach(-2);
      cloudsGroup.setLifetimeEach(-2);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      textSize(32);
      fill("black");
      text("Your Score is : "+score,490,50);
      
      textSize(32);
      fill("blue");
      text("Your Survival Time is : "+survivalTime,70,50);
      
      if(mousePressedOver(restart)) {
      reset();
      }
      }
   
   
   drawSprites(); 
}


function reset(){
  gameState = Start;
  monkey.changeAnimation("running", monkey_running);
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  
} 

function spawnObstacles() {
  if(frameCount % 180 === 0){
    obstacle=createSprite(800,445,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-7;
    obstacle.lifetime=130;
    obstacleGroup.add(obstacle);
  }
}

function spawnbananas() {
  if(frameCount % 80 === 0){
    banana=createSprite(800,Math.round(random(200,400)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-6;
    banana.lifetime=130;
    foodGroup.add(banana);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    cloud = createSprite(800,Math.round(random(90,200 )),40,10);
    cloud.addImage(cloudImage);
    cloud.scale = 1.25;
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime=130;
    
    //adjust the depth
    
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}