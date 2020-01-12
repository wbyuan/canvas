var canvas = document.querySelector('.canvas')
var width = canvas.width = window.innerWidth
var height = canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')
var balls = [] 
function random(min,max){
    return Math.floor(Math.random()*(max - min)) + min
}
function randomColor(){
    return 'rgb('+ random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')'
}
function Ball(x, y, velX, velY, color, size){
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.size = size 
    this.color = color
}
Ball.prototype.draw = function(){
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
    ctx.fill()
}
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
    //判断当前执行方法的小球和遍历的小球的半径之和是否等于他们的中心的距离
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
        
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
}

window.onload = function(){
       
    function loop(){
        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.fillRect(0,0,width,height)
        while(balls.length < 25){
            var ball = new Ball(random(0,width),random(0,height),random(-7,7),random(-7,7),randomColor(),random(10,20))
            balls.push(ball)
        }

        balls.forEach(item => {
            item.draw()
            item.update()
            item.collisionDetect()
        })
        requestAnimationFrame(loop)
    }
    loop()
}
