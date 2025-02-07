// Board settings
var blocksize = 25;
var row = 20;
var cols = 20;
var board;
var context;

// Snake settings
var SnakeX = blocksize * 5;
var SnakeY = blocksize * 5;
var velocityX = 0;
var velocityY = 0;
var SnakeBody = [];

// Food settings
var foodX = blocksize * 10;
var foodY = blocksize * 10;

var GameOver=false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = row * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", ChangeDirection);
    setInterval(update, 1000 / 10);
};

function update() {

    if(GameOver){
        return;
    }
    // Clear the board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    // Check if snake eats food
    if (SnakeX === foodX && SnakeY === foodY) {
        SnakeBody.push([foodX, foodY]); // Add new segment
        placeFood();
    }

    // Move the snake body segments
    for (let i = SnakeBody.length - 1; i > 0; i--) {
        SnakeBody[i] = SnakeBody[i - 1];
    }
    if (SnakeBody.length) {
        SnakeBody[0] = [SnakeX, SnakeY];
    }

    // Update snake position
    SnakeX += velocityX * blocksize;
    SnakeY += velocityY * blocksize;

    // Draw the snake body
    context.fillStyle = "lime";
    for (let i = 0; i < SnakeBody.length; i++) {
        context.fillRect(SnakeBody[i][0], SnakeBody[i][1], blocksize, blocksize);
    }

    //game over condition
    if(SnakeX < 0 || SnakeX > cols*blocksize || SnakeY > row*blocksize){
        GameOver = true ;
        alert("GameOver");
    }
    for( let i=0 ; i < SnakeBody.length; i++){
        if(SnakeX == SnakeBody[i][0] && SnakeY == SnakeBody[i][1]){
            GameOver = true ;
            alert(GameOver);
        }
    }
    

    // Draw the snake head
    context.fillRect(SnakeX, SnakeY, blocksize, blocksize);
}

function ChangeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * row) * blocksize;
}
