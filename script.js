let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box, 
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criaBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box-2, box-2);
    }
} 

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', event => {
    if(event.key === "ArrowLeft" && direction != "right") direction = "left";
    if(event.key === "ArrowUp" && direction != "down") direction = "up";
    if(event.key === "ArrowRight" && direction != "left") direction = "right";
    if(event.key === "ArrowDown" && direction != "up") direction = "down";
})

function iniciarJogo() {

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('GAME OVER');
        }
    }

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    criaBackground();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

const intervalo = () => {
    const level = parseInt(prompt("Escolha o nível do jogo:s\n1 para fácil;\n2 para médio;\n3 para difícil;"));
    
    if (level === 1) return 300;
    if (level === 2) return 200;
    if (level === 3) return 100;
}

let jogo = setInterval(iniciarJogo, intervalo());
