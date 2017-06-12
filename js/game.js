/**
 * Created by admin on 2017/6/3.
 */
(function (Fly) {
  'use strict';
  var Game = function (config) {

    this.ctx = config.ctx;


    this.imgsArr = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];
    this.isStart = true;
    this.rolesArr = [];
    this.delt = 0;
    this.lastTime = new Date();
    this.currentTime = null;
    this.hero = null;

    //调用上下文
    this.createCanvas(config.id);

  }

  Game.prototype = {
    constructor: Game,
    startGame: function () {

      var that = this;
      Fly.loadImages(this.imgsArr, function (imgList) {


        that.initRoles(imgList);

        that.render(imgList);

        that.bindEvent();


      })


    },
    initRoles: function (imgList) {

      var imgSky = imgList.sky;
      var imgPipeTop = imgList.pipe2;
      var imgPipeBottom = imgList.pipe1;
      var imgLand = imgList.land;
      var i;

      var context = this.ctx;

      this.hero= new Fly.Bird({
        img: imgList.birds,
        ctx: context
      });
      //绘制天空图片；


      // 创建一个数组来储存创建出来的对象

      for (i = 0; i < 2; i++) {
        var sky = new Fly.Sky({
          img: imgSky,
          ctx: context,
          x: imgSky.width * i
        });
        this.rolesArr.push(sky);
      }


      //创建6个管道

      for (i = 0; i < 6; i++) {
        var pipe = new Fly.Pipe({
          imgBottom: imgPipeBottom,
          imgTop: imgPipeTop,
          ctx: context,
          x: i * imgPipeBottom.width * 3 + 300,
          pipeSpace: 150

        });

        this.rolesArr.push(pipe);
      }

      //创建4个陆地对象
      for (i = 0; i < 4; i++) {
        var land = new Fly.Land({
          img: imgLand,
          ctx: context,
          x: i * imgLand.width,
          y: context.canvas.height - imgLand.height
        })
        this.rolesArr.push(land);
      }

    },
    render: function (imglist) {

      var that = this;
      var context = this.ctx;
      var cvW = this.ctx.canvas.width;
      var cvH = this.ctx.canvas.height;
      var bird = this.hero;
      var imgSky = imglist.sky;
      var imgLand = imglist.land;
      (function render() {

        context.save();
        context.clearRect(0, 0, cvW, cvH);
        context.beginPath();
        //小鸟做自由落体运动，匀加速运动，改变y的值
        //公式：v = v0+at;y = vt + 1/2*a*t*t;
        that.currentTime = new Date();
        that.delt = that.currentTime - that.lastTime;
        that.lastTime = that.currentTime;



        that.rolesArr.forEach(function (roles) {
          roles.draw(that.delt);

        })
//    绘制小鸟
        bird.draw(that.delt);

        //----绘制陆地land-----
        //碰撞检测
        // 1 小鸟超出了画布的顶端
        // 2 小鸟接触了陆地
        // 3 小鸟与管道接触
        if (bird.y <= 0 || bird.y >= (imgSky.height - imgLand.height) || context.isPointInPath(bird.x, bird.y)) {
          that.isStart = false;
        }

        context.restore();
        if (that.isStart) {
          requestAnimationFrame(render);
        }
      })();
    },
    bindEvent: function () {
      var bird = this.hero;
      this.ctx.canvas.addEventListener('click', function () {
        bird.changeSpeed(-0.3);
      })
    },
    //创建动态画布
    createCanvas:function(id){
      var cv = document.createElement('canvas');
      cv.width = 800;
      cv.height = 600;
      var container = document.getElementById(id) || document.body;
      container.appendChild(cv);

      //设置上下文
      this.ctx = cv.getContext('2d');
    }


  }

  //暴露Game刀全集对象Fly中
  Fly.Game = Game;


})(Fly)