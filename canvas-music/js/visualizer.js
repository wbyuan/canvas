/*
* 通过file类型的input加载音频文件
*element input按钮的id
*/
var Visualizer = function (element) {
    this.file = null; //要处理的文件，后面会讲解如何获取文件
    this.fileName = null; //要处理的文件的名，文件名
    this.audioContext = null; //进行音频处理的上下文，稍后会进行初始化
    this.source = null //保存音频
    this.audioInput = document.querySelector(element)
    this.aduioArr = []
    this._init()
}
Visualizer.prototype = {
    _init: function () {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        //安全地实例化一个AudioContext并赋值到Visualizer的audioContext属性上，方便后面处理音频使用
        try {
            this.audioContext = window.AudioContext ? new AudioContext() : '';
        } catch (e) {
            console.log('!妳的浏览器不支持AudioContext:(');
            console.log(e);
        }
        //this._addEventListner()
    },
    _addEventListner: function () {
        var that = this
        //监听是否有文件被选中
        this.audioInput.addEventListener('change', function () {
            //这里判断一下文件长度可以确定用户是否真的选择了文件，如果点了取消则文件长度为0
            if (that.audioInput.files.length !== 0) {
                that.file = that.audioInput.files[0]; //获取选中文件
                that.fileName = that.file.name;
                that._start();
            };
        })
    },
    //实例化一个FileReader来将文件读取为ArrayBuffer格式
    _start: function () {
        var that = this,
            fr = new FileReader(); //实例化一个FileReader用于读取文件
        fr.onload = function (e) { //文件读取完后调用此函数
            var fileResult = e.target.result; //这是读取成功得到的结果ArrayBuffer数据
            //从Visualizer得到最开始实例化的AudioContext用来做解码ArrayBuffer ,解码成功则调用此函数，参数buffer为解码后得到的结果
            that.audioContext.decodeAudioData(fileResult, function (buffer) {
                //调用_visualize进行下一步处理，此方法在后面定义并实现
                that._visualize(that.audioContext, buffer);

            }, function (e) {
                //解码失败
                console.log("!哎玛，文件解码失败:(");
            });
        };
        //将上一步获取的文件传递给FileReader从而将其读取为ArrayBuffer格式
        fr.readAsArrayBuffer(this.file);
    },
    _visualize: function (audioContext, buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser();
        //将source与分析器连接
        audioBufferSouceNode.connect(analyser);
        //将分析器与destination连接，这样才能形成到达扬声器的通路
        analyser.connect(audioContext.destination);
        //将上一步解码得到的buffer数据赋值给source
        audioBufferSouceNode.buffer = buffer;
        //播放
        audioBufferSouceNode.start(0);
        //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
        var array = new Uint8Array(analyser.frequencyBinCount);
        return this.aduioArr =  analyser.getByteFrequencyData(array);
    }
}