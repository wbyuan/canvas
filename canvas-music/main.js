window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var c;
var $;
var w;
var h;
var arr = [];
var num = 50;

var rndCol = function(alpha) {
    var r = (Math.floor(Math.random() * 255));
    var g = (Math.floor(Math.random() * 255));
    var b = (Math.floor(Math.random() * 255));
    if (alpha) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + '.05)';
    } else {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

window.onload = function() {
    c = document.getElementById("canv");
    $ = c.getContext("2d");
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

    var grd = $.createLinearGradient(0, 0, w, 1);
    grd.addColorStop("0", "hsla(0, 10%, 15%, 1)");
    grd.addColorStop("0.1", "hsla(255, 255%, 255%, 1)");
    grd.addColorStop("0.2", "hsla(0,15%,15%,1)");
    grd.addColorStop("0.3", rndCol());
    grd.addColorStop("0.4", rndCol());
    grd.addColorStop("0.5", "hsla(255, 255%, 255%, .7)");
    grd.addColorStop("0.6", "hsla(0, 5%, 10%, 1)");
    grd.addColorStop("0.7", rndCol());
    grd.addColorStop("0.8", "hsla(0, 10%, 5%, 1)");
    grd.addColorStop("0.9", rndCol());
    grd.addColorStop(".95", rndCol());
    grd.addColorStop("1.0", "hsla(255, 255%, 255%, .75)");

    $.fillStyle = grd;

    var t_ = "Mess O' Lines".split("").join(String.fromCharCode(0x2004));
    $.font = "5em Poiret One";
    $.fillText(t_, w / 2 - 400, h / 4 - 100);

    var t2 = "#curvelines searched from techbrood".split("").join(String.fromCharCode(0x2004));
    $.font = "1.5em Poiret One";
    $.fillText(t2, w / 2 - 320, h - 50);

    for (var i = 0; i < num; i++) {
        arr.push(new Line());
    }
    run();
}

function run() {
    window.requestAnimFrame(run);
    loop();
}

function loop() {

    $.fillStyle = "hsla(0,0%,5%,.02)";
    $.fillRect(0, 0, w, h);
    $.globalCompositeOperation = 'source-over';

    for (var i in arr) {
        var line = arr[i];
        line.update();
        line.draw();
    }
}

var Line = function() {
    var grd = $.createLinearGradient(0, 0, w, 1);
    grd.addColorStop("0", "hsla(0,0%,0%,.9)");
    grd.addColorStop("0.1", "hsla(255, 255%, 255%, .5)");
    grd.addColorStop("0.2", "hsla(0,15%,15%,.4)");
    grd.addColorStop("0.3", rndCol());
    grd.addColorStop("0.4", rndCol());
    grd.addColorStop("0.5", rndCol());
    grd.addColorStop("0.6", rndCol());
    grd.addColorStop("0.7", rndCol());
    grd.addColorStop("0.8", rndCol());
    grd.addColorStop("0.9", rndCol());
    grd.addColorStop(".95", "hsla(0, 5%, 5%, 1)");
    grd.addColorStop("1.0", "hsla(255, 255%, 255%, 1)");

    this.prevX = w / 2;
    this.prevY = h / 2;

    this._X = 0;
    this._Y = 0;

    this.color = grd;
}

Line.prototype.update = function() {
    this._X = this.prevX + (Math.random() * 10) - 5;
    this._Y = this.prevY + (Math.random() * 10) - 5;

    if (this._X < 0 || this._X > w || this._Y < 0 || this._Y > h) {
        arr.push(new Line());
        return;
    }
}

Line.prototype.draw = function() {
    $.globalCompositeOperation = 'difference';
    $.beginPath();
    $.lineWidth = Math.random() * 1 + 2;
    $.strokeStyle = this.color;
    $.moveTo(this.prevX, this.prevY);
    $.lineTo(this._X, this._Y);
    $.stroke();

    this.prevX = this._X;
    this.prevY = this._Y;
}