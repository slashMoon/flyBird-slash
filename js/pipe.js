/**
 * Created by admin on 2017/6/2.
 */
(function(Fly){
  'use strict';
  //构造函数
  var Pipe = function(config){
    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;
    this.ctx = config.ctx;
    this.x = config.x;
    this.pipeSpace = config.pipeSpace;

    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;

    // 随机生成高度
    this.topY = 0;
    this.bottomY = 0;
    this.speed = 0.1;


    // 管道的高度是创建对象的时候，生成的
    this.initPipeHeight();


  }
  Pipe.prototype.draw = function(delt){

    this.x -= this.speed * delt;

    if(this.x <= -this.imgW * 3){
      this.x += this.imgW * 3 *6;

      //重新生成管道的高度
      this.initPipeHeight();
    }
//  绘制小鸟的路径,isPointInPath
    this.ctx.rect(this.x,this.topY,this.imgW,this.imgH)
    this.ctx.rect(this.x,this.bottomY,this.imgW,this.imgH)


    this.ctx.drawImage(this.imgTop,this.x,this.topY)
    this.ctx.drawImage(this.imgBottom,this.x,this.bottomY)

  }
  //随机生成管道的高度
  Pipe.prototype.initPipeHeight = function(){
    //随机生成的管道高度50- 250之间
    var pipeHeight = Math.random()*200 + 50;

    //上面管道高度
    this.topY = pipeHeight - this.imgH;
    //下面管道的高度
    this.bottomY = pipeHeight + this.pipeSpace;

  }
  //暴露到全局对象Fly中
  Fly.Pipe = Pipe;
})(Fly)