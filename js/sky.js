/**
 * Created by admin on 2017/6/3.
 */
(function(Fly){

  var Sky = function (config) {

    this.img = config.img;
    this.ctx = config.ctx;

    this.imgW = this.img.width;
    this.x = config.x;
    this.y = 0;
    this.speed = 0.15;




  }

  Sky.prototype = {
    constructor:Sky,
    draw :function(delt){
      this.x -= this.speed *delt;

      if(this.x <= -this.imgW){
        this.x += this.imgW*2;
      }





      this.ctx.drawImage(this.img,this.x,this.y);
    }
  }
  //暴露到Fly中
  Fly.Sky = Sky;

})(Fly)