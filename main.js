img="";
status="";
object=[];
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
}

function start(){
objectdetector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="Status: Detecting Object"
}

function modelloaded(){
console.log("modelloaded")
status=true;
}

function gotresults(error, results){
if(error){
console.log(error);
}
else{
console.log(results);
object=results;
}
}

function draw(){
image(video,0,0,380,380);
if(status!=""){
r= random(255);
g= random(255);
b= random(255);
objectdetector.detect(video,gotresults);
for(i=0; i<object.length; i++){
document.getElementById("status").innerHTML="Object Detected";
document.getElementById("num-obj").innerHTML="Number of Objects detected: "+object.length;
fill(r,g,b);
percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%", object[i].x+15, object[i].y+15);
noFill();
stroke(r,g,b);
rect(object[i].x, object[i].y, object[i].width, object[i].height);
}
}
}

function preload(){
img=loadImage("dog_cat.jpg");
}