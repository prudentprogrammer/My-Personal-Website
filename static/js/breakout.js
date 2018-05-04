var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", generateBall);

var balls = [];
var totalColors = ["green", "red", "purple", "blue", "orange"];

class Ball {
  constructor(x, y, ballRadius, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.ballRadius = ballRadius;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update() {
    // Draw the actual damn thing!
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    // Update the coordinates
    this.x += this.velocityX;
    this.y += this.velocityY;

    if(this.y + this.velocityY > canvas.height - this.ballRadius || this.y + this.velocityY < this.ballRadius) {
      this.velocityY = -this.velocityY  -(Math.floor(Math.random() * 3) + 1);
    }
    if(this.x + this.velocityX > canvas.width - this.ballRadius || this.x + this.velocityX < this.ballRadius) {
      this.velocityX = -this.velocityX - (Math.floor(Math.random() * 3) + 1);
    } // End of if
    //  console.log(this.x + "," + this.y);
  } // End of update
} // End of class


function generateBall(event) {
  var rect = canvas.getBoundingClientRect();
  var randomVelocity = Math.floor(Math.random() * 10) + 1;
  var randomRadius = Math.floor(Math.random() * 10) + 3;
  var sides = [-1, 1];
  var getRandomXSide = sides[Math.floor(Math.random() * sides.length)];
  var getRandomYSide = sides[Math.floor(Math.random() * sides.length)];
  //console.log(randomRadius);
  // Create a ball
  const newBall = new Ball(
    event.clientX - rect.left,
    event.clientY - rect.top,
    randomRadius,
    totalColors[Math.floor(Math.random() * totalColors.length)],
    getRandomXSide * randomVelocity,
    getRandomYSide * randomVelocity);
  // Add the ball
  balls.push(newBall);
}

function mainLoop() {
  //console.log(balls.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < balls.length; i++) {
    balls[i].update();
  }
} // End of function mainLoop

balls.push(new Ball(canvas.width / 2, canvas.height - 30, 10, "green", 2, -2));
setInterval(mainLoop, 10);
