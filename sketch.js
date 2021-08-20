let y=[];
let x=[];
let fourierY=[];
let fourierX=[];

let time = 0;
let wave = [];

function setup() {
  createCanvas(800, 400);
  for(let i=0;i<100;i++)
    x[i] = i;
  for(let i=0;i<100;i++)
    y[i] = sqrt(i);
  fourierY = dft(y);
  fourierX = dft(x);
}

function draw() {
  background(0);
  translate(200,200);

  let x=0;
  let y=0;
  let px=0;
  let py=0;
  
  for(let i=0; i < fourierY.length; i++){
    
    let freq = fourierY[i].freq;
    let radius = 20*fourierY[i].amp;
    let phase = fourierY[i].phase;
    
    x += radius * cos(freq * time + phase + PI/2);
    y += radius * sin(freq * time + phase + PI/2);
    stroke(255);
    noFill();
    ellipse(px,py,radius*2);
    fill(255);
    ellipse(x,y,3);
    line(x,y,px,py);
    px = x;
    py = y;
    
  }
  wave.unshift(y);
    line(x,y,230,wave[0]);
    beginShape();
    noFill();
    translate(230,0);
    for(i=0;i<wave.length;i++)
      {
        vertex(i,wave[i]);
      }
    endShape();
    time-= (2*PI)/fourierY.length;

    if(wave.length>300)
      wave.pop();
}