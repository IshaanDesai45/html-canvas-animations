const {Engine,Render,Runner,World,Bodies,Body,Events} = Matter;

const engine = Engine.create();
const {world} = engine;
engine.world.gravity.y=0;
const width = 600;
const height= 600;
const rows =10;
const columns =10;
const unitLength = width/rows;
const render =Render.create({
    element :document.body,
    engine:engine,
    options:{
        width,
        height 
    }
});

Render.run(render);
Runner.run(Runner.create(),engine);

const walls = [
    Bodies.rectangle(width/2,0,width,2,{isStatic : true}),
    Bodies.rectangle(width/2,height,width,2,{isStatic : true}),
    Bodies.rectangle(0,height/2,2,height,{isStatic : true}),
    Bodies.rectangle(width,height/2,2,height,{isStatic : true})
];

World.add(world,walls);

//----------------------------------//MAze generation

const shuffle = (arr)=>{
    let counter = arr.length;

    while(counter>0){
        const index =Math.floor(Math.random()*counter);
        counter --;
        const temp = arr[counter];
        arr[counter]=arr[index];
        arr[index]= temp;
    }
    return arr;

}

const grid =Array(rows).fill(null).map(()=>Array(columns).fill(false));
// console.log(grid)

const verticals =Array(rows).fill(null).map(()=> Array(columns-1).fill(false));
const horizontals =Array(rows-1).fill(null).map(()=> Array(columns).fill(false));

let startRow =Math.floor( Math.random()*rows);
let startColumn= Math.floor(Math.random()*columns);
// console.log(startColumn);
// console.log(startRow)
const stepThroughCell = ( row,column)=>{
    //if I ahve visited the cell at [row,column] then return
    if (grid[row][column]){
        return ;
    }
    //mark this cell as being visited 
    grid[row][column] = true;
    //Assemble randomly-ordered list of neighbours
    const neighbours=shuffle([
        [row-1,column,'up'],
        [row,column+1,'right'],
        [row+1,column,'down'],
        [row,column-1,'left']
    ]);
    // console.log(neighbours)

    //for each neighbour...
    for(let neighbour of neighbours){
        let [nextRow,nextColumn,direction]= neighbour
    // see if that neighbour is out of bounds
    if(nextRow<0 ||nextRow>=rows || nextColumn<0 || nextColumn>=columns){
        continue;
    }
    //if we have visited that neighbour, continue to the next neighbour
    if(grid[nextRow][nextColumn]){
        continue;
    }
    //Remove a wall from either horizontals or verticals
    if(direction === 'left'){
        verticals[row][column-1]= true;
    }else if (direction === 'right'){
        verticals[row][column]= true;
    }else if(direction==='up'){
        horizontals[row-1][column]=true;
    }else if (direction === 'down'){
        horizontals[row][column]=true;
    }
    
    stepThroughCell(nextRow,nextColumn);
    }
    // visit the next cell
}

stepThroughCell(startRow,startColumn);
// console.log(grid);

horizontals.forEach((row,rowIndex)=>{
    row.forEach((open,columnIndex) =>{
        if(open){
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex*unitLength+unitLength/2,
            rowIndex*unitLength+unitLength,
            unitLength,
            10,
            {   label:'wall',
                isStatic:true
            }
        );
        World.add(world,wall);
    })
})

verticals.forEach((row,rowIndex)=>{
    row.forEach((column,columnIndex)=>{
        if(column) return;
        const wall= Bodies.rectangle(
            columnIndex*unitLength +unitLength,
            rowIndex*unitLength + unitLength/2,
            10,
            unitLength,
            {   label:'wall',
                isStatic:true
            }
        )
        World.add(world,wall);
    })
});

const goal = Bodies.rectangle(
    width - unitLength/2,
    height - unitLength /2,
    unitLength * 0.7,
    unitLength*0.7,
    {   label:'goal',
        isStatic:true
    }
)

World.add(world,goal);
 
//Ball
const ball =Bodies.circle(unitLength/2,unitLength/2,unitLength/4,{ label :'ball'});
World.add(world,ball);

//keypress events
document.addEventListener('keydown',(event)=>{
    const {x,y} = ball.velocity;
    if (event.keyCode === 87){
        Body.setVelocity(ball,{x,y:y-5});
    }
    if (event.keyCode === 68){
        Body.setVelocity(ball,{x:x+5,y});
    }
    if (event.keyCode === 83){
        Body.setVelocity(ball,{x,y:y+5});
    }
    if (event.keyCode === 65){
        Body.setVelocity(ball,{x:x-5,y});
    }
  
});

//Win collision

Events.on(engine,'collisionStart', event =>{
    // console.log(event)
    const labels =['ball','goal'];
    event.pairs.forEach(collision=>{
        // console.log(collision)
        
        if(labels.includes(collision.bodyA.label)&&
        labels.includes(collision.bodyB.label)){
            world.gravity.y =1;
            world.bodies.forEach(body =>{
                if(body.label === 'wall'){
                    Body.setStatic(body,false);
                }
            })
        }
    })
})