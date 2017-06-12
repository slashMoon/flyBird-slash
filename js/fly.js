/**
 * Created by admin on 2017/6/2.
 */
//整个程序只保留一个全局对象，这个对象就是：sky
//游戏中所有其他的对象，都挂到这个fly对象中来
//比如：
//Bird ->Fly.bird
// Sky -> Fly.Sky
// Land ->Fly.Land
// Pipe ->Fly.Pipe
// Game -> Fly.Game

//并且一些与对象无关的工具性的函数，
// 比如 ：

//
(function(window){
  'use strict';
  var FlyObj = {};

  //角度转弧度;
  FlyObj.toRadian = function(angle){
    return angle / 180 *Math.PI;
  };

  //加载图片
  FlyObj.loadImages = function(srcList,callback){
    var count = 0,
      allLength = srcList.length,
      imgsObj = {};

    srcList.forEach(function (srcStr){
      var img = new Image();
      img.src = './images/'+srcStr+'.png';
      imgsObj[srcStr] = img;

      img.onload = function(){
        count++;
        //判断如果count大于等于allLength说明已经加载完成
        if(count >= allLength){
          callback(imgsObj);
        }
      }
    })


  }
//将对象暴露到全局当中，将其他元素都暴露到fly中，形成一个管理链条
  window.Fly = FlyObj;
})(window)