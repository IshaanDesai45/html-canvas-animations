// const {Engine,Render,Runner,World,Bodies,Mouse,MouseConstraint} = Matter;

// const engine = Engine.create();
// const {world} = engine;
// const render =Render.create({
//     element :document.body,
//     engine:engine,
//     options:{
//         width :800,
//         height :600
//     }
// });

// Render.run(render);
// Runner.run(Runner.create(),engine);

// World.add(world, MouseConstraint.create(engine,{
//     mouse :Mouse.create(render.canvas)
// }));
// const walls = [
//     Bodies.rectangle(400,0,800,40,{isStatic : true}),
//     Bodies.rectangle(400,600,800,40,{isStatic : true}),
//     Bodies.rectangle(0,300,40,600,{isStatic : true}),
//     Bodies.rectangle(800,300,40,600,{isStatic : true})
// ];

// World.add(world,walls);
// for(let i =0; i<20;i++)
// World.add(world,Bodies.rectangle(200,200,50,50));

let canvas = document.getElementById('canvas');
let c = canvas.getContext("2d");
canvas.style.background = 'black';
let ww = canvas.width = 800;
let wh = canvas.height =600;
let world =[];
let mouse ={
    x:null,
    y:null,
    radius:1

}
let mx=null;
let my= null;
let walls= [{x:0,y:0,w:800,h:20},
            {x:0,y:580,w:800,h:20},
            {x:0,y:0,w:20,h:600},
            {x:780,y:0,w:20,h:600}
        ];
function check(){
    return (mouse.x<(body.x+body.width)&&mouse.x>body.x)&&(mouse.y<(body.y+body.height)&&mouse.y>body.y);
}
// window.addEventListener("mousedown",function(event){
//         mouse.x = event.x;
//         mouse.y = event.y;
        
//         for(body of world){
//             if(check()){
//                 body.y = mouse.y;
//                 body.x = mouse.x;
//         }
// }});

// canvas.onmousedown=  function(event){
//     mouse.x = event.x;
//     mouse.y = event.y;
    
//     for(body of world){
//         console.log(check())
//         console.log(body.x,body.y)
//         if(check()){
//              offsetX = mouse.x - body.x;
//              offsetY = mouse.y -body.y;
//         }

//     function onMouseMove(e){
//         mouse.x = e.x;
//         mouse.y = e.y;
//         body.y = mouse.y -offsetY;
//         body.x = mouse.x - offsetX;
//     }
//     canvas.addEventListener('mousemove',onMouseMove);
//     canvas.onmouseup = function(event1){
//         canvas.removeEventListener('mousemove',onMouseMove);
//         canvas.onmouseup = null;
        

    
//     }}
// }

canvas.ondragstart = function() {
    return false;
  };

function onMouseUp(event){
    event.preventDefault();
    event.stopPropagation();
      //search for shapes that has isDragging true
      for(body of world){
        if(body.isDragging){
            body.isDragging=false;
            body.gravity=true;
        }
    }

    canvas.removeEventListener('mousemove',onMouseMove);
};
function onMouseMove(event){
    event.preventDefault();
    event.stopPropagation();
    //changing mouse co-ordinates
    mouse.x = event.x;
    mouse.y = event.y;
    //search for shapes that has isDragging true
    for(body of world){
        if(body.isDragging){
            body.gravity=false;
            body.y = mouse.y - body.moffsetY;
            body.x = mouse.x - body.moffsetX;
        }
    }
    body.y = mouse.y - body.moffsetY;
            body.x = mouse.x - body.moffsetX;
};
//function to handle mousedown event 
function onMouseDown(event){
    event.preventDefault();
    event.stopPropagation();
    //adding listener for mousemove event 
    
    //remebering mouse down value
    mx = mouse.x= event.x;
    my = mouse.y= event.y;
    //checking for body present under the mouse or not?
    for(body of world){
        if (check())
        {   canvas.addEventListener('mousemove',onMouseMove);
            body.moffsetX = mouse.x - body.x;
            body.moffsetY = mouse.y -body.y;
            body.isDragging = true;
            console.log(body.x,body.y,mouse.x,mouse.y);
            
        }
    }

};
canvas.addEventListener('mousedown',onMouseDown);
canvas.addEventListener('mouseup',onMouseUp);
        

class Bodies{
    constructor(x,y,width,height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.dx =0,
        this.dy = 0,
        this.accX =0;
        this.accY =0.05;
        this.moffsetX=null;
        this.moffsetY=null;
        this.isDragging= false;
        this.gravity=true;
    }
    update(){
        if(this.gravity){
            if(this.y + this.width > wh){
                this.dy = -this.dy*0.5;
            }else{
                this.dy += this.accY;
            }
            this.y += this.dy;
        }
        this.draw();
    }
    draw(){
        c.strokeStyle= 'white';
        c.strokeRect(this.x,this.y,this.width,this.height);
    }
}

function init(){

//    world.push(new Bodies(400,400,50,50))
   world.push( new Bodies(200,200,50,50));
    ww -= 20;
    wh -=20;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(wall of walls){
        c.strokeStyle = 'white';
        c.strokeRect(wall.x,wall.y,wall.w,wall.h);
    }
    for(body of world){
        body.update();
        // console.log(`position = ${body.y},velocity=${body.dy}`);
    }

}

init();
animate();