var canvas = document.querySelector("canvas");
const generateButton =document.querySelector(".generate-tree-button");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var rootX =canvas.width/2;
var rootY =canvas.height-80;
var angled;
var angle1;
var mouse ={
	x :null,
	y:null
}
canvas.addEventListener("mousemove",(event)=>{
	mouse.x = event.x;
	mouse.y = event.y;
	var changeX = mouse.x -rootX;
	var changeY = mouse.y -rootY;
	var slope = changeY/changeX;
	 angled = Math.atan(slope);
	
	if(angled>0)
		angled = (Math.PI/2)- angled;
	else
		angled = (Math.PI/2)+ angled;
	// angle1 = angled || 0;
	// angled=angled*180/Math.PI;
	// console.log(angled);

});

function drawTree(startX,startY,len,angle,branchWidth,color1,color2){
	console.log(`${startX} ${startY} ${len} ${angle}`);
	c.beginPath();
	c.save();
	c.strokeStyle = color1;
	c.fillStyle =color2;
	c.lineWidth = branchWidth;
	c.translate(startX,startY);
	c.rotate(angle *Math.PI/180);
	c.moveTo(0,0);
	c.lineTo(0, -len);
	c.stroke();

	if ( len<10 )
	{
		c.restore();
		return;

	}

	drawTree(0,-len,len*0.75,angle+15,branchWidth,'brown','green');
	drawTree(0,-len,len*0.75,angle-15,branchWidth,'brown','green');

	c.restore()

}

drawTree(canvas.width/2,canvas.height-80,120,0,2,'brown','green');

function animate(){
 	requestAnimationFrame(animate);
 	c.clearRect(0,0,innerWidth,innerHeight);
 	drawTree(canvas.width/2,canvas.height-80,120,angled,2,'brown','green');


 }	

 animate();
