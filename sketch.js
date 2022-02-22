//NameSpacing - nicknames
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var rope, fruit, fruitCON;
var rabbitIMG, melonIMG, backgroundIMG
var rabbit, blink, eat, sad;
var button

function preload(){
 
  rabbitIMG = loadImage("Rabbit-01.png");
  backgroundIMG = loadImage("background.png");
  melonIMG = loadImage("melon.png");

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", 'eat_1.png', 'eat_2.png', 'eat_3.png', 'eat_4.png')
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;

}

function setup() {
  createCanvas(500,700);
  frameRate(80)
  //Creating an universe & a world that we can manipulate
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200, 680, 600, 20)

  rope = new Rope(7, {x: 245, y: 30})

  fruit = Bodies.circle(300, 300, 20)
  Matter.Composite.add(rope.body, fruit)
  fruitCON = new Link(rope, fruit);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit = createSprite(250, 620, 100, 100)
  rabbit.addAnimation('blinking', blink);
  rabbit.addAnimation('eating', eat);
  rabbit.addAnimation('crying', sad);

  rabbit.changeAnimation('blinking');
  rabbit.scale = 0.2

  button = createImg("cut_btn.png")
  button.position(200, 30)
  button.size(50, 50)
  button.mouseClicked(drop)



  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() {
  background(50);
  //imageMode(CENTER);  
  image(backgroundIMG, 0, 0, width, height);

  rope.display();

  //drawing the fruit image only when the fruit body exists
  if(fruit!=null){
    image(melonIMG, fruit.position.x, fruit.position.y, 60, 60)
  }
  Engine.update(engine);
  ground.display();

  if(collide(fruit, rabbit)){
    rabbit.changeAnimation("eating")
  }
  if(collide(fruit, ground.body)){
    rabbit.changeAnimation("crying")
  }
  
  drawSprites();
}

function drop(){
  rope.break()
  fruitCON.detach()
  fruitCON = null
}

function collide(body, sprite){
  if(body!= null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d<=80){
      World.remove(engine.world, fruit)
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}