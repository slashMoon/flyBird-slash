/**
 * Created by admin on 2017/6/2.
 */
(function (Fly) {
  //严格模式
  'use strict';
  //构造函数
  var Land = function (config) {
    this.img = config.img;
    this.ctx = config.ctx;
    this.x = config.x;
    this.y = config.y;

    this.speed = 0.15;
    this.imgW = this.img.width;


  }
  //原型对象
  Land.prototype.draw = function (delt) {

    this.x -=this.speed * delt;

    if(this.x <= -this.imgW){
      this.x += this.imgW*4;
    }

    this.ctx.drawImage(this.img, this.x, this.y);

  }
  //构造函数暴露到全局对象Fly中去
  Fly.Land = Land;

})(Fly)