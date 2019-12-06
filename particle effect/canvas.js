var canvas = document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext("2d");
console.log(canvas.width*canvas.height);

var mouse={
	x:null,
	y:null,
	radius:60
};

window.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;

	
});

window.addEventListener('resize',function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	init();
});


	class circles{
		constructor(x,y,radius,dx,dy){
			this.x =x;
			this.y=y;
			this.radius=radius;
			this.dx = dx;
			this.dy = dy
		}

			draw()
			{
				c.beginPath();
				c.fillStyle='#8c5523';
				c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
				c.fill();
			}

			update(){
				if (this.x+this.radius>innerWidth || this.x-this.radius<0)
				{
					this.dx = -this.dx;
				}
				if (this.y+this.radius>innerHeight || this.y-this.radius<0)
				{
					this.dy = -this.dy;
				}
				var distx = mouse.x - this.x;
				var disty = mouse.y - this.y;
				var distance = Math.sqrt(distx * distx + disty * disty);

				if (distance < mouse.radius + this.radius) {
						if(mouse.x<this.x && this.x<canvas.width -this.radius *10)
							this.x +=20;
						if(mouse.x>this.x && this.x>this.radius *10)
							this.x -=20;
						if(mouse.y<this.y && this.y<canvas.height -this.radius *10)
							this.y +=20;
						if(mouse.y>this.y && this.y>this.radius *10)
							this.y -=20;
    // collision detected!
				}
				this.x+=this.dx;
				this.y+=this.dy;

				this.draw();
			}

		
	}
	var circleArray = [];
	// for(var i =0;i<500;i++)
	// {

	// var x = Math.random() *(innerWidth - 50*2) +50;
 // 	var y = Math.random() *(innerHeight- 50*2) +50;
 // 	var dy = (Math.random()-0.5)*3;
 // 	var dx=  (Math.random()-0.5)*3;
 // 	var radius = Math.random()*5;
	// circleArray.push(new circles(x,y,radius,dx,dy));
	// }
	function init()
	{
	circleArray = [];
	let numberOfParticles =(canvas.height * canvas.width)/3000;
	for(var i =0;i<numberOfParticles;i++)
	{

	var x = Math.random() *(innerWidth - 50*2) +50;
 	var y = Math.random() *(innerHeight- 50*2) +50;
 	var dy = (Math.random()-0.5)*3;
 	var dx=  (Math.random()-0.5)*3;
 	var radius = Math.random()*5;
	circleArray.push(new circles(x,y,radius,dx,dy));
	}
	}
 	

 function animate(){
 	requestAnimationFrame(animate);
 	c.clearRect(0,0,innerWidth,innerHeight);


 	for(var i =0;i<circleArray.length;i++)
 	{
 		circleArray[i].update();
 	}
 	
 	connect()

 }	

 function connect(){
 	let opacityValue =1;
 	for(let a=0;a<circleArray.length;a++)
 	{		
 		for(let b=a;b<circleArray.length;b++)
 		{	
 			let dist = ((circleArray[a].x - circleArray[b].x)*(circleArray[a].x - circleArray[b].x))+
 						((circleArray[a].y - circleArray[b].y)*(circleArray[a].y - circleArray[b].y));
        	 
 			if(dist< (canvas.width/7)*(canvas.height/7) )
 			{	opacityValue = 1- (dist/20000)
 				c.beginPath();
 				c.moveTo(circleArray[a].x,circleArray[a].y);
 				c.lineTo(circleArray[b].x,circleArray[b].y);
 				c.strokeStyle = 'rgba(140,85,31,'+opacityValue+')';
 				c.stroke();
//  				// console.log('yes');
 			}
 		}
 	}
 }

 init();
 animate();

