"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image(); //птичка
var bg = new Image(); //задний фон
var fg= new Image(); //передний фон
var pipeUp = new Image(); //препятствия с верху
var pipeBottom = new Image(); //препятствия с низу

//загрузка картинок

bird.src = "img/bird_bird.png";
bg.src = "img/bird_bg_1.png";
fg.src = "img/bird_fg.png";
pipeUp.src = "img/bird_pipeUp.png";
pipeBottom.src = "img/bird_pipeBottom.png";

var gap = 90; // растояния между верхней и нижней колоной

//звук в игре
var fly = new Audio();
var score_audio = new Audio();
fly.src = "audio/sfx_wing.mp3";
score_audio.src = "audio/sfx_point.mp3";

// при нажатии на кнопку
document.addEventListener("touchstart",moveUp);     
document.addEventListener("mousedown", moveUp);
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 30;    
    fly.play();
}


var score = 0;
// Создания блока

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0  
}


//позицыя птички
var xPos = 10;  
var yPos = 150;
var grav = 1.5;


function draw() {  

    
    ctx.drawImage(bg, 0, 0);  


   
    
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        // генерация новых блоков
        if (pipe[i].x == 400) { 
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
            
        }

        // отслеживание прикосновения

        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos + bird.height >= cvs.height - fg.height) {
                    
            location.reload(); // перазагрузка страницы
        }

        // счет

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }


    }
 

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(fg, fg.width, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;


    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;











//------------------------------------***
// var cvs = document.getElementById("canvas");
// var ctx = cvs.getContext("2d");

// var bird = new Image();
// var bg = new Image();
// var fg = new Image();
// var pipeUp = new Image();
// var pipeBottom = new Image();


// bird.src = "img/bird_bird.png";
// bg.src = "img/bird_bg.png";
// fg.src = "img/bird_fg.png";
// pipeUp.src = "img/bird_pipeUp.png";
// pipeBottom.src = "img/bird_pipeBottom.png";
// bird.src = "img/bird.png";
// bg.src = "img/bg.png";
// fg.src = "img/fg.png";
// pipeUp.src = "img/pipeUp.png";
// pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
//var fly = new Audio();
//var score_audio = new Audio();

//fly.src = "audio/fly.mp3";
//score_audio.src = "audio/score.mp3";

// var gap = 90;

// // При нажатии на какую-либо кнопку
// document.addEventListener("keydown", moveUp);

// function moveUp() {
//  yPos -= 25;
//  fly.play();
// }

// // Создание блоков
// var pipe = [];

// pipe[0] = {
//  x : cvs.width,
//  y : 0
// }

// var score = 0;
// // Позиция птички
// var xPos = 10;
// var yPos = 150;
// var grav = 1.5;

// function draw() {
//  ctx.drawImage(bg, 0, 0);

//  for(var i = 0; i < pipe.length; i++) {
//  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
//  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

//  pipe[i].x--;

//  if(pipe[i].x == 125) {
//  pipe.push({
//  x : cvs.width,
//  y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
//  });
//  }

//  // Отслеживание прикосновений
//  if(xPos + bird.width >= pipe[i].x
//  && xPos <= pipe[i].x + pipeUp.width
//  && (yPos <= pipe[i].y + pipeUp.height
//  || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
//  location.reload(); // Перезагрузка страницы
//  }

//  if(pipe[i].x == 5) {
//  score++;
//  score_audio.play();
//  }
//  }

//  ctx.drawImage(fg, 0, cvs.height - fg.height);
//  ctx.drawImage(bird, xPos, yPos);

//  yPos += grav;

//  ctx.fillStyle = "#000";
//  ctx.font = "24px Verdana";
//  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

//  requestAnimationFrame(draw);
// }

// pipeBottom.onload = draw;
