const canvas = document.getElementById('gameCanvas');
let c = canvas.getContext("2d");
let score = document.getElementById('score');
let ww = canvas.width = 600;
let wh = canvas.height = 600;
let unitLength = 10;
let snake;
let framePerSecond =20;

class snakeState{
    constructor(){
        this.snakeParts =[];
        this.dy = 0;
        this.dx = 10;
        this.foodX=null;
        this.foodY=null;
        this.score=0;
    }
    update(){
        // this.snakeParts.pop();
        let head = {x: this.snakeParts[0].x + this.dx , y :this.snakeParts[0].y +this.dy};
        this.snakeParts.unshift(head);
        if(this.snakeParts[0].x === this.foodX && this.snakeParts[0].y===this.foodY){
            this.score +=1;
            this.createFood()
        }
        else{
            this.snakeParts.pop();
        }
       
        // console.log(this.snakeParts)
        this.draw();
        this.drawFood();

    }
    gameOver(){
        for (let i = 3; i < this.snakeParts.length; i++) {
            if(this.snakeParts[i].x === this.snakeParts[0].x &&
                this.snakeParts[i].y === this.snakeParts[0].y  ) {
                    console.log('hit self')
                    return true
                }  
              }  
          const hitLeftWall = this.snakeParts[0].x < 0;
          if(hitLeftWall)console.log('leftwall')
          const hitRightWall = this.snakeParts[0].x > canvas.width - unitLength;
          if(hitLeftWall)console.log('rightwall')
          const hitToptWall = this.snakeParts[0].y < 0;
          if(hitLeftWall)console.log('topwall')
          const hitBottomWall = this.snakeParts[0].y > canvas.height - unitLength;  
          if(hitLeftWall)console.log('bottomswall')
          return (hitLeftWall || 
                 hitRightWall || 
                 hitToptWall ||
                 hitBottomWall)
    }
    draw(){
        c.fillStyle='lightgreen';
        c.strokeStyle ='darkgreen';
        for(var snakePart of this.snakeParts){
            c.fillRect(snakePart.x,snakePart.y,unitLength,unitLength);
            c.strokeRect(snakePart.x,snakePart.y,unitLength,unitLength);
        }
    }
    
    createFood(){
        this.foodX = Math.round((Math.random() * (canvas.width-unitLength-0) + 0) / 10) * 10;
        this.foodY = Math.round((Math.random() * (canvas.width-unitLength-0) + 0) / 10) * 10;
        if(this.foodX+unitLength>canvas.width || this.foodX<0||this.foodY<0||this.foodY+unitLength>canvas.height || this.check()){
            this.createFood();
        }
        console.log(this.foodX,this.foodY);
    }
       
    drawFood(){
        c.fillStyle = 'red';
        c.fillRect(this.foodX,this.foodY,unitLength,unitLength);
        c.strokeStyle ='darkred';
        c.fillRect(this.foodX,this.foodY,unitLength,unitLength);

    }
    check(){
        for(var snakePart of this.snakeParts){
            if (snakePart.x === this.foodX && snakePart.y ===this.foodY)
            return true;
            else
            return false
        }
    }

}

function init(){
    snake = new snakeState();
    let x= 300;
    let y= 300;
    for (let i=0;i<5;i++){
        snake.snakeParts.push({x,y});
        y+=unitLength;
    }
    snake.createFood();
    // console.log(snake.snakeParts[0].y);
}

function animate (){
    setTimeout(()=>{

        c.clearRect(0,0,ww,wh);
        if(snake.gameOver()){
            console.log('game over');
            this.dy=0;
            this.dx=0;
            return;
        }
    requestAnimationFrame(animate);
        c.strokeStyle ='black';
    c.strokeRect(0,0,canvas.width,canvas.height);
    // snake.drawFood();
    score.innerHTML =snake.score;
    snake.update();
    
    
    },1000/framePerSecond)  
}


window.addEventListener('keydown',(e)=>{
    // console.log(e.keyCode)
    if(e.keyCode===37 && snake.dx===0)
    {
        snake.dy =0;
        snake.dx =-10
        // console.log(snake.dx,snake.dy);
    }
    else if(e.keyCode===38 && snake.dy===0)
    {
        snake.dy =-10;
        snake.dx =0;
        // console.log(snake.dx,snake.dy);
    }
    else if(e.keyCode===39 && snake.dx===0)
    {
        snake.dy =0;
        snake.dx =10;
        // console.log(snake.dx,snake.dy);
    }
    else if(e.keyCode===40 && snake.dy===0)
    {
        snake.dy = 10;
        snake.dx =0;
        // console.log(snake.dx,snake.dy);
    }
    // console.log(snake.dx,snake.dy);
    snake.update();
});
init();
animate();