/**
 * Created by admin on 2017/6/2.
 */
(function(Fly){
  'use strict';
  function Bird(config){
    this.img = config.img;
    this.ctx = config.ctx;

    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.frameIndex = 0;
    this.x = 100;
    this.y = 100;
    this.speed = 0;
    this.a = 0.0005;

    this.maxSpeed = 0.5;
    this.maxAngle = 45;
    this.currentAngle = 0;


  }
  Bird.prototype = {
    constructor:Bird,

    draw :function(delt){

      //小鸟做自由落体运动，匀加速运动，改变y的值
      //公式：v = v0+at;y = vt + 1/2*a*t*t;



      this.speed = this.speed + this.a*delt;
      this.y += this.speed*delt + 1/2*this.a*Math.pow(delt,2)


      //判断，当落到一定值的时候，不让就让它的旋转角度就为45°；

      if(this.speed >= this.maxSpeed){
        this.currentAngle = 45;
      }else if(this.speed <= -this.maxSpeed){
        this.currentAngle = -45;
      }
      //设置小鸟下落的角度 maxAngle / maxSpeed = currentAngle / speed
      this.currentAngle = this.maxAngle / this.maxSpeed * this.speed;
      //平移圆点坐标
      this.ctx.translate(this.x,this.y);
      this.ctx.rotate(Fly.toRadian(this.currentAngle));


      this.ctx.drawImage(this.img,this.imgW * this.frameIndex++,0,this.imgW,this.imgH,-1/2 *this.imgW,-1/2 *this.imgH,this.imgW,this.imgH);

      this.frameIndex %= 3;

    },
    //改变速度
    changeSpeed: function(speed){
      this.speed = speed;
    }

  };
  //暴露到Fly中去
  Fly.Bird = Bird;


})(Fly)