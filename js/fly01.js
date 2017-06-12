
(function (window) {
  'use strict';


  var Fly = {};

  //方法添加到原型当中


  Fly.toRadian = function (angle) {
    return angle / 180 * Math.PI;

  };

  Fly.loadImages = function (srcList, callback) {

      var count = 0,
        allLength = srcList.length,
        imgsObj = {};

      srcList.forEach(function (srcStr) {

        var img = new Image();
        img.src = './images/' + srcStr + '.png';
        imgsObj[srcStr] = img;

        img.onload = function () {

          count++;

          if (count >= allLength) {

            callback(imgsObj);
          }

        };

      });
    };


//暴露到全局当中
window.Fly = Fly;

})(window)

