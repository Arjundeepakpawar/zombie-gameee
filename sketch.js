var bg, bgImg
var player, shooterImg, shooterShooting
var zombie, zombieImg, zombieGroup
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var  life = 3
var score = 0
var monsterZombie, monsterZombieImg
var princess, princessImg
var bullets, bulletGroup

function preload(){
bgImg = loadImage("./assets/bg.jpeg")
shooterImg = loadImage("./assets/shooter_2.png")
shooterShooting = loadImage("./assets/shooter_3.png")
zombieImg = loadImage("./assets/zombie.png")
heart1Img = loadImage("./assets/heart_1.png")
heart2Img = loadImage("./assets/heart_2.png")
heart3Img = loadImage("./assets/heart_3.png")
monsterZombieImg = loadImage("./assets/monstar_zombie.png")
princessImg = loadImage("./assets/princess.png")
}






function setup() {
  createCanvas(windowWidth, windowHeight);
 bg = createSprite(displayWidth/2 - 20,displayHeight/2 - 40,20 , 20 )
bg.addImage(bgImg)
bg.scale = 1.1
player = createSprite(displayWidth - 1150, displayHeight - 300,50,50  )
player.addImage(shooterImg)
player.scale = 0.3
player.setCollider("rectangle",0, 0, 300, 300)
zombieGroup = new Group()
heart1 = createSprite(displayWidth - 150,40,20,20)
heart1.addImage("heart1",heart1Img)
heart1.visible = false
heart1.scale = 0.4

heart2 = createSprite(displayWidth - 100,40,20,20)
heart2.addImage("heart2",heart2Img)
heart2.visible = false
heart2.scale = 0.4

heart3 = createSprite(displayWidth - 150,40,20,20)
heart3.addImage("heart3",heart3Img)
heart3.scale = 0.4
 
princess = createSprite(displayWidth - 1250,displayHeight - 300,50,50)
//princess.addImage(princessImg)

bulletGroup = new Group()

}


function draw() {
  background(0);  
  if(life === 3){
    heart3.visible = true
    heart2.visible  = false
    heart1.visible = false
  }
  else if(life === 2){
    heart3.visible = false
    heart2.visible  = true
    heart1.visible = false


  }
else if(life === 1){

  heart3.visible = false
    heart2.visible  = false
    heart1.visible = true
}



  if(keyDown("UP_ARROW")&&player.y> 60 ){
  player.y = player.y - 30
  }
  if(keyDown("DOWN_ARROW")&&player.y<displayHeight - 195  ){
    player.y = player.y + 30
    }
  if(keyWentDown("space")){
  bullets = createSprite(displayWidth - 1150,player.y - 30,20,10)
  bullets.velocityX = 20
  bulletGroup.add(bullets)
  player.depth = bullets.depth
  player.depth = player.depth + 2
  player.addImage(shooterShooting)

  }
  else if(keyWentUp("space")){

player.addImage(shooterImg)
  }
if(zombieGroup.isTouching(player)){
for(var i = 0; i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy()
life = life-1

}

}


}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy()
  score = score+2
  bulletGroup.destroyEach()
  
  }
  
  }
  
  
  }

if(score<=50){
  enemy()

}
else if(score>50&&score<60){
monsterZombie = createSprite(displayWidth - 200,random(100,500),40,40)
monsterZombie.addImage(monsterZombieImg)
monsterZombie.velocityX = -1
monsterZombie.setCollider("rectangle",0,0,600,600)
}

  drawSprites()  
  textSize(20)
  fill("white")
   text("Score ="+ score,displayWidth - 200,displayHeight/2 - 220)
}
function enemy(){
  if(frameCount%100===0){
    zombie = createSprite(random(displayWidth  +  200,390),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }
  

}
