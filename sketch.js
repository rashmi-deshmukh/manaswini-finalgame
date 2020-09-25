
var rewardGroup,obstaclesGroup;
var spaceship_img;
var bg, teddy, teddy_img, ground;
var bgImg;
var reward_img;
var score=0;
var life=3;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){

   bgImg=loadImage("bg.jpg")
   teddy_img= loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png")
   reward_img= loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png", "coin8.png", "coin9.png", "coin10.png")   
   spaceship_img = loadImage("spaceship.png")
   gameOverImg=  loadImage("gameover.png")
   restartImg=  loadImage("r.png")
}

function setup(){
   createCanvas(displayWidth-20,displayHeight-120);
   bg = createSprite(displayWidth/2,displayHeight/2-60,displayWidth*2,displayHeight-120)
   bg.addImage(bgImg)
   ground =createSprite(displayWidth/2,displayHeight-130,displayWidth,40)
   ground.visible=false; 
   teddy= createSprite(100,500,20,20); 
   teddy.addAnimation("fly", teddy_img)
   ground.shapeColor="yellow" ;
   teddy.shapeColor="red";
   bg.velocityX=-4;
   
   rewardGroup=new Group()
   obstaclesGroup=new Group()

   gameOver= createSprite(displayWidth/2 - 30, 200, 20,20);
   gameOver.addImage(gameOverImg);
   gameOver.visible= false
   restart= createSprite(displayWidth/2 - 30, 450, 100,100);
   restart.addImage(restartImg);
   restart.visible= false

}



function draw(){
   background("black");
   if (keyDown(UP_ARROW)) {
        teddy.velocityY=-4
   } 
   teddy.velocityY=teddy.velocityY+0.5
   teddy.collide(ground);

   if(bg.x<0){
      bg.x=bg.width/2
   }

   if(rewardGroup.isTouching(teddy)){
         score=score+1
         for(var i =0; i<rewardGroup.length; i++){
            if(teddy.isTouching(rewardGroup.get(i))){
             rewardGroup.get(i).destroy()
           }
           }
   }

   if(obstaclesGroup.isTouching(teddy)){
         life=life-1
         for(var i =0; i<obstaclesGroup.length; i++){
            if(teddy.isTouching(obstaclesGroup.get(i))){
             obstaclesGroup.get(i).destroy();
            }
         }
   }

   if(life===0){
      gameOver.visible = true;
      restart.visible = true;
   
      obstaclesGroup.destroyEach();
      rewardGroup.destroyEach();
      if(mousePressedOver(restart)) {
         reset();
      }
      
   }

   spawnObstacles();
   spawnReward();
   drawSprites();
   textSize(24)
   text("COINS : "+score,displayWidth-200,50)
   text("LIFE : "+life,100,50)
}

function reset(){
     
   gameOver.visible = false;
   restart.visible = false;
   
   spawnObstacles();
   spawnReward();
   
   score = 0;
   life=3;
   
 }

function spawnObstacles(){
   if (frameCount % Math.round(random(70,90)) === 0){
           var obstacle = createSprite(400,165,10,40);
           obstacle.velocityX = -6;
           obstaclesGroup.add(obstacle);
           obstacle.x=width
           obstacle.addImage(spaceship_img)
           obstacle.scale=0.2
            // //generate random obstacles
            var rand = Math.round(random(50,displayHeight-200));
            obstacle.y=rand
           
           // obstacle.scale = 0.5;
            obstacle.lifetime = 300;
   }
}

function spawnReward(){
   if (frameCount % Math.round(random(50,80)) === 0){
     var reward= createSprite(400,165,10,40);
     reward.velocityX = -6;
     rewardGroup.add(reward);
     reward.x=width
     reward.addAnimation("r", reward_img)
     reward.scale= 0.4
      // //generate random obstacles
      var rand1 = Math.round(random(50,displayHeight-200));
      reward.y=rand1
      reward.shapeColor="green"
     
      //assign scale and lifetime to the obstacle           
     // obstacle.scale = 0.5;
    
      reward.lifetime = 300;
   }
}