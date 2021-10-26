const btn = document.getElementById('mainbtn')
const fullKnife = document.getElementById('knife')
const blood = document.getElementById('blood')
const drips = document.getElementsByTagName('canvas')

console.log(btn.textContent);

btn.addEventListener('click', function () {
    fullKnife.style.display = 'block'
    blood.style.display = 'block'
    drips[0].style.display = 'block'

    setTimeout(function() {
      btn.textContent = '💀💀💀💀💀💀'
    }, 300)
    
})


// p5js blood drips
let canvas = document.getElementsByTagName('canvas')
let container = document.getElementById('container')

var yposition = 0;
var xposition = 50;

function setup() { 
  createCanvas(400, 400);
} 

// setup()

function draw() { 
  
  clear()
  bloodDrops(139,0,0);
  
}


function bloodDrops(r,g,b){

  yposition++
  
  noStroke()
  fill(r,g,b)

  triangle(xposition-5,yposition,xposition+5,yposition,xposition,yposition-20)
  ellipse(xposition,yposition,10,10);
  
  yposition = yposition + 3;
  
  if (yposition > 450){
  yposition = 0;
  xposition = random(150);
  }  
  
}