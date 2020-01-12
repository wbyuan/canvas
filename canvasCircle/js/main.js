(function () {
    var Circle = function (element) {
        this.canvas = document.getElementById(element)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth || document.body.clientWidth
        this.canvas.height = window.innerHeight || document.body.clientHeight
        this.init()
    }
    Circle.prototype.init = function () {
        this.x = Math.ceil(Math.random() * this.canvas.width)
        this.y = this.canvas.height + Math.random() + 50
        this.alpha = Math.random()
        this.scale = Math.random() * 5
        this.velocity = Math.random() - 0.5
    }
    Circle.prototype.drawing = function () {
        if (this.alpha <= 0) {
            this.init()
        }
        this.y -= this.velocity
        this.alpha -= 0.05
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2)
        this.ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')'
        this.ctx.fill()
    }
    window.onload = function () {
        var circles = [];
        function ass() {
            for (var x = 0; x < 400; x++) {
                var c = new Circle("cvs")
                circles.push(c)
            }
            animate()
        }

        function animate() {
            var canvas = document.getElementById("cvs")
            var ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(c => {
                c.drawing()
            });
            requestAnimationFrame(animate);
        }
        ass();
    }

}())