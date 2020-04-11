let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

var ww=canvas.width = window.innerWidth;
var wh=canvas.height = window.innerHeight/2;

var color = ["#667eea"," #764ba2"," #46aef7"];
var particlesArray = [];

let copy = "Cyborg";
c.font = "bold "+(ww/8)+"px sans-serif";
c.textAlign = "center";
c.fillText(copy, ww/2, wh/2.2);
var data  = c.getImageData(0, 0, ww, wh).data;

var mouse ={
	x:null,
	y:null,
	radius:50
}

window.addEventListener("mousemove",function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});



class particles {
	constructor(x,y)
	{
		this.x=Math.random()*ww,
		this.y =Math.random()*wh,
		this.radius = Math.random() +1;
		this.baseX = x;
		this.baseY = y;
		this.color = color[Math.floor(Math.random()*2)];
	}

	draw()
	{
		c.beginPath();
		
		c.arc(this.x,this.y,this.radius,0,Math.PI *2);
		c.fill();

	}

	update()
	{	c.fillStyle = this.color;
		var distx = mouse.x - this.x;
				var disty = mouse.y - this.y;
				var distance = Math.sqrt(distx * distx + disty * disty);
				var forceDirectionX =distx/distance*(-1);
				var forceDirectionY = disty/distance*(-1);
				const maxDistance =100;
				var force =(maxDistance-distance)/maxDistance;
				if (force<0) 
					force =0;
				var dx = (forceDirectionX*force*2*0.9);
				var dy = (forceDirectionY*force*2*0.9);


				if (distance < mouse.radius + this.radius) {
						
    				this.x += dx;
					this.y+=dy;
				}
				else{
					if(this.x !== this.baseX)
					{
						this.x += (this.baseX - this.x)/20;
					}
					if(this.y !== this.baseY)
					{
						this.y += (this.baseY - this.y)/20;
					}
				}
				
				this.draw();
	}
}


function init()
{	particlesArray =[];
	ww = canvas.width = window.innerWidth;
	wh = canvas.height = window.innerHeight;

	c.clearRect(0,0,ww,wh);
	c.globalCompositeOperation = "screen";


	for (var i =0;i<wh;i+=6)
	{
		for(var j =0;j<ww;j+=6)
		{
			if ( data[(i*4*ww)+(j*4)+3]>0)
			{
				var positionX = j;
				var positionY = i;
				particlesArray.push(new particles(positionX,positionY));
			}


		}
	}
}

function animate()
{	c.clearRect(0,0,ww,wh);
	requestAnimationFrame(animate);
	for(var i =0;i<particlesArray.length;i++)
	{	
		// particlesArray[i].radius = Math.random()*4 +1;
		particlesArray[i].update();
	}
}


init();

animate();
