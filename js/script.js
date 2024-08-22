// Canvas Eraser courtesy of: source: https://codepen.io/progrape/pen/XXBwWe

 // black & white img (to be erased)
 var url = "./images/bg_1_blackWhite.png"; 
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = url;
  console.log(url)
  img.onload = function () {
    var width = Math.min(window.innerWidth, img.width); 
    // First argument was originally 500. I changed it to innerWidth. But innerWidth is not responsive. So I also tried:
    // clientWidth (didn't work)
    // window.innerWidth works on refresh, but not dynamically (that's ok for now; at least it's semi-respnosive!)
    var height = img.height * (width / img.width);
    // changed first argument width to window.innerWidth
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };

  var isPress = false;
  var old = null;
  canvas.addEventListener('mousedown', function (e){
    isPress = true;
    old = {x: e.offsetX, y: e.offsetY};
  });
  canvas.addEventListener('mousemove', function (e){
    if (isPress) {
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.globalCompositeOperation = 'destination-out';

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 100; // brush size
      ctx.beginPath();
      ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      old = {x: x, y: y};

    }
  });
  canvas.addEventListener('mouseup', function (e){
    isPress = false;
  });
// End Canvas Eraser