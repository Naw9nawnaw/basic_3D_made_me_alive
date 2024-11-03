//3D grid of boxs
//FFT

let catModel;
let timer = 0;
var somet = 100;
let counter = 0;


let img0;
let img1;
let img2;
let img3;
let img4;

let mainCounter = 0;
let sideCounter = 0;
let otherCounter = 0;

let audioStarted = false; // needed to get it to work in full screen mode
let audioIn; // selecting the right audio interface
let mic; // this is so we can get audio in

let fft;
let spectrum;
var levelsLow;
var levelsHigh;

function preload() {
  
  img0 = loadImage('IMG_6444.jpg');
  img1 = loadImage('IMG_6507.jpg');
  img2 = loadImage('IMG_6508.jpg');
  img3 = loadImage('IMG_6509.jpg');
  img4 = loadImage('IMG_6505.jpg');
  catModel = loadModel('cat.obj', true);

}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL); 
  // camera(90, -330, 150, 0, 120, -60, 0, 3, 3);
  // perspective(PI/2, 1, 50*sqrt(3), 300*sqrt(3));
  // debugMode();//////
  angleMode(DEGREES);
  normalMaterial();
  
   fft = new p5.FFT();
  mic = new p5.AudioIn(); 
  mic.getSources(gotSources); // for audio interface
  fft.setInput(mic);
  
  getAudioContext().suspend(); // needed to get it to work in full screen mode
  
}

function draw() {
   background(255, 228, 225);
  
     let spectrum = fft.analyze();
  
  // console.log(spectrum);
  
  if(spectrum[9] > 81){
    levelsLow = spectrum[9];
  }
  
  if(spectrum[270] > 42){
    levelsHigh = spectrum[270];
  }
  
   orbitControl();//////
  
  //3D grid boxes
  push();
  angleMode(RADIANS);
     for (let x=0; x < 631; x +=150+(levelsLow/60)){
      for (let z=0; z < 631; z +=120+(levelsHigh/120)){
       for (let y=0; y < 631; y +=90+(levelsHigh/30)){
      push();
          // translate(x-30+levelsLow/10, y-27+levelsHigh/10, z-30+levelsLow/10);  
        
       
         // rotate(PI)
       if(millis() - counter < levelsLow*10) {  
//     //color1
    translate(0,0,0);
  rotateX(millis() / -x/27);
  rotateY(millis() / x/27);
  rotateZ(millis() / x/9);
   
    }
  if (millis() - counter >= levelsLow*10 && millis() - counter < levelsLow*20) {
    //color2
    translate(-250,-levelsLow,-250);
  rotateX(millis() / -z/63); //the z-rotation is opposite clockwise here
  rotateY(millis() / z/63);
  rotateZ(millis() / z/21);
   
    }
      
      if (millis() - counter >= levelsLow*20 && millis() - counter < levelsLow*30) {
    //color2
        
        translate(125,levelsLow/2,125);
  rotateX(millis() / -y/126); 
  rotateY(millis() / y/21);
  rotateZ(millis() / y/12);
   
    }
  
   if (millis() - counter >= levelsLow*30){
      counter = millis();
     }
     
         translate(x-300+levelsLow/2, y-270-levelsLow/6, z-300+levelsLow/3);//original at the start
      let r = map(x, 0, 631, 0, 210);
      let g = map(z, 0, 631, 60, 0);
      let b = map(y, 0, 631, 0, 60);
     
  // translate(x-10+levelsLow/3, y-90, z-100);  
         
         if(levelsHigh>10){
               ambientLight(100);
  imageLight(img3);
  specularMaterial(120);
  shininess(360);
           stroke(b,g,r);
         fill(r,g,b,120-levelsLow/4);
      box(levelsLow/2-levelsHigh/12);
      
           }
            if(levelsHigh>90){
              normalMaterial();
              ambientLight(25); // white light
  ambientMaterial(255, 127, 80); // coral material
              noStroke(0);
         fill(r,g,b,120-levelsHigh/6);
      sphere(levelsLow/2-levelsHigh/10);
    
           }
            if(levelsLow>186){
                let locX = mouseX - width ;
  let locY = mouseY - height ;
  pointLight(255, 255, 255, locX, locY, 50);
  imageLight(img2);
  specularMaterial(25);
  shininess(240-(levelsLow/10));
  metalness(210);
           noStroke(0);
         fill(r,g,b,120-levelsLow/3);
      cone(levelsLow/2-levelsHigh/random(6,15),levelsHigh-levelsLow/3);
      
           }
           pop(); 
         
      }
     }
    }
  
  pop();
  
  ////////////////////////////
  angleMode(DEGREES);
  push();
  normalMaterial();
  // orbitControl();
  fill(255,0,0,128);
    
  var numVertices = 100;
  translate(0,numVertices,0);
  rotateY(millis()/10);
  scale(24);
  ambientLight(100);
  imageLight(img0);
  specularMaterial(255);
  shininess(360);
  // metalness(3);
  beginShape();
  // a simple spiral shape
  for(let i = 0; i < numVertices; i++) {
    push();
    rotateY(frameCount * 0.0003);
  rotateZ(frameCount * 0.00018);
  rotateY(frameCount * 0.0018);
  rotateX(frameCount * 0.0018);  
    var ver1 = vertex(
      cos((i/numVertices*360)*3)*sin(i/numVertices*180)*3,
      -i+60, 
      sin((i/numVertices*360)*3)*sin(i/numVertices*180)*3,
      );
    pop();
    
    
  }
  
  
  endShape();
  pop();
  
  ////////////////////////////////////
  
   push();
  normalMaterial();
  // orbitControl();
  fill(255,0,0,128);
    
  var numVertices = 100;
  translate(-100,numVertices,-100);
  rotateY(millis()/10);
  scale(36);
  ambientLight(100);
  imageLight(img0);
  specularMaterial(255);
  shininess(360);
  // metalness(3);
  beginShape();
  // a simple spiral shape
  for(let i = 0; i < numVertices; i++) {
    push();
    rotateY(frameCount * 0.3);
  rotateZ(frameCount * 0.018);
  rotateY(frameCount * 0.00018);
  rotateX(frameCount * 0.00018);  
    var ver1 = vertex(
      cos((i/numVertices*180)*3)*sin(i/numVertices*360)*3,
      -i+60, 
      sin((i/numVertices*180)*3)*sin(i/numVertices*360)*3,
      );
    pop();
    
    
  }
  
  
  endShape();
  pop();
  
  ///////////////////////////////////////
   push();
 
  normalMaterial();
  translate(0, -360, 0); 
    if(millis() - counter < 3000) {  
//     //color1
    translate(0,0,0);
   
    }
  if (millis() - counter >= 3000 && millis() - counter < 6000) {
    //color2
    translate(-250,-30,-250);
   
    }
      
      if (millis() - counter >= 6000 && millis() - counter < 9000) {
    //color2
        
        translate(250,30,250);
   
    }
  
   if (millis() - counter >= 9000){
      counter = millis();
     }
    // angleMode(RADIANS);
  rotateY(frameCount * 9);
  rotateZ(frameCount * 0.0006);
  rotateY(frameCount * 0.06);
  rotateX(frameCount * 0.06);  

  ambientLight(60);

  // add point light to showcase specular material
  let locX = mouseX - width ;
  let locY = mouseY - height ;
  pointLight(255, 255, 255, locX, locY, 50);
  imageLight(img0);
  specularMaterial(255);
  shininess(240-(levelsLow/6));
  metalness(90);
  
  torus(30+levelsLow, 30+(levelsHigh/10), 16, 12);
  pop();
  
  

  angleMode(DEGREES);
  ////////////////////
  push();
  normalMaterial();
  rotateY(frameCount/3 * 0.3);
  rotateX(150); 
  rotateY(frameCount * 0.01);
  rotateZ(frameCount/3 * 2);
  rotateX(frameCount/(levelsLow/150) * 0.01); 
  translate(-270+(levelsLow/10),-210+(levelsLow/8),240);
 
  // scale(0.5,1,2);
  // scale(0.5, 1.3,0.5);
   imageLight(img1);
  specularMaterial(255);
  shininess(240);
  metalness(90);
  var model1 = model(catModel);
  pop();
  

  ///////////////////////////
  push();
  normalMaterial();
  rotateY(frameCount/3 * 0.3);
  rotateX(150); 
  rotateY(frameCount/(levelsLow/30) * -0.01);
  rotateZ(frameCount/3 * -2);
  rotateX(frameCount/3 * 0.01); 
  translate(270+random(levelsHigh/300),210,-240);
  // scale(0.5,1,2);
  // scale(0.5, 1.3,0.5);
  imageLight(img2);
  specularMaterial(255);
  shininess(240);
  metalness(90);
   var model2 = model(catModel);
  pop();
 
  ///////////////////////////  
    push();
  normalMaterial();
  rotateY(frameCount * 0.3);
  rotateX(150); 
  rotateY(frameCount/3 * 0.01);
  rotateZ(frameCount/3 * 0.2);
  rotateX(frameCount/3 * 0.01); 
  translate(-270,210,240);
  // scale(0.5,1,2);
  // scale(0.5, 1.3,0.5);
   imageLight(img3);
  specularMaterial(255);
  shininess(240);
  metalness(90);
  var model3 = model(catModel);
  pop();
  

  ///////////////////////////
  push();
  normalMaterial();
  rotateY(frameCount/3 * 0.3);
  rotateX(150); 
  rotateY(frameCount/3 * 0.001);
  rotateZ(frameCount/3 * -0.2);
  rotateX(frameCount/3 * 0.01); 
  translate(270,-210-random(levelsHigh/3000),240);
  // scale(0.5,1,2);
  // scale(0.5, 1.3,0.5);
   imageLight(img4);
  specularMaterial(255);
  shininess(240);
  metalness(90);
   var model4 = model(catModel);
  pop();
  
  ///////////////////
  if (keyIsDown(32)) {
    noDebugMode();
  } 
   if (keyIsDown(65)) {
    debugMode();
  } 
   
}


function mousePressed() { // needed to get it to work in full screen mode
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
  //   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
  //   let fs = fullscreen();
  //   fullscreen(!fs);
  // }

}

function gotSources(deviceList) {
  if (deviceList.length > 0) {
    //set the source to the item in the deviceList array depending on where the desired mic is at in your computer audio settings
    mic.setSource(0);
    let currentSource = deviceList[mic.currentSource];
    print('set source to: ' + currentSource.label);//change print to console.log
    //this will show which microphone is selected 
    mic.start();
    //it's important that mic start is below the set source code or it will still use the automatically selected one
  }
}
