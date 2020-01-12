+function (window) {

    var canvas = document.getElementById("petal")
    var ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var flowers = [];
    var flowerIndex = 0;
    var fls = ['2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png'];
    function Flower() {
        this.w = Math.random() * (18 - 5) + 5;
        this.h = Math.random() * (18 - 5) + 5;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height / 2;
        this.angle = Math.random() * (Math.PI - (-Math.PI)) + (-Math.PI);
        this.speed = Math.random() * 0.8;
        this.rotate = Math.random() * Math.PI / 18; //旋转的角度
        this.rotateCircle = 3;//旋转次数
        this.resistance = 0.93; //速度衰减值
        this.limitSpeed = 0.05; //x、y速度上限
        this.color = "#ffc5ff";  //花瓣颜色
        this.shadowColor = "#660287";  //花瓣阴影颜色
        this.shadowBlur = 15;
        this.alpha = 1;
        flowerIndex++;
        flowers[flowerIndex] = this;
        this.id = flowerIndex;
        this.img = new Image();
        this.img.src = "canvasPetal/../image/" + fls[Math.floor(Math.random() *9)];
    }
    Flower.prototype.init = function () {
        ctx.save();
        ctx.beginPath();
        /*
        this.rotate++
        if (this.rotate > (Math.PI * this.rotateCircle + Math.PI / 2)) {
            //转3圈，开始摇摆,前后摇摆Math.PI/4

            var _rotate = Math.sin(this.rotate) * Math.PI / 4 * this.resistance + Math.PI / 4;
            if (this.resistance > 0) {
                this.resistance -= .0001;
            }
            ctx.rotate(_rotate);
        } else {
            ctx.rotate(this.rotate);
        }
        */
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = this.shadowBlur;

        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

        /*
        ctx.shadowColor = this.shadowColor
        ctx.shadowBlur = this.shadowBlur
        ctx.fillStyle = 'rgba(255,197,255,' + this.alpha + ')'
        ctx.fillRect(this.x, this.y, this.w, this.h)

        ctx.fill()
        */
        ctx.restore()
    }
    Flower.prototype.move = function () {
        if (this.speed < this.limitSpeed) {
            this.speed += 1
        }
        var vx = Math.cos(this.angle) * this.speed
        var vy = Math.sin(this.angle) * this.speed
        this.x += vx
        this.y += vy
        if (Math.abs(this.y) < canvas.height * 2 / 5 || Math.abs(this.y) > canvas.height * 3 / 5 || Math.abs(this.x < 0) || Math.abs(this.x > canvas.width)) {
            delete flowers[this.id]
        }
        this.alpha -= 0.0005
        if (this.alpha < 0.1) {
            delete flowers[this.id]
        }
        this.init()

    }
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }, false);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.3) {
            new Flower()
        }
        flowers.forEach(fl => {
            fl.move()
        });
        requestAnimationFrame(animate);
    }
    animate()
}(window);