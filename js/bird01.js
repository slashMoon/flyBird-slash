/**
 * Created by admin on 2017/6/10.
 */
(function (Fly) {
  "use strict";


  //创建构造函数:1.属性（变量放到构造函数中），2.方法放到原型对象中
  var Bird = function ( config ) {
    this.img = config.img;
    this.ctx = config.ctx

    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.x = 100;
    this.y = 100;
    this.speed = 0;
    this.a = 0.0003;
    this.curAngle = 0;
    this.maxSpeed = 0.5;
    this.maxAngle = 45;
    this.frameIndex = 0;
  };

  Bird.prototype = {
    constructor: Bird,
    drawImage: function (delta) {

      //设置垂直方向运动
      this.speed = this.speed + this.a * delta;
      this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);


      //设置小鸟的最大的角度
      if (this.speed >= this.maxSpeed) {
        this.curAngle = 45;
      } else if (this.speed <= -this.maxSpeed) {
        this.curAngle = -45;
      }
      //变换的弧度 : curAngle / speed = maxAngle / maxSpeed;
      this.curAngle = this.speed * this.maxAngle / this.maxSpeed;

      //设置小鸟的旋转角度
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.curAngle));


      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);

      this.frameIndex %= 3;
    },
    changeSpeed:function (){

        this.speed = -0.3;

    }
  }
  //暴露到全局Fly中
  Fly.Bird = Bird;

})(Fly)