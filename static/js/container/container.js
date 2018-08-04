export{
  Container
}
function Container(canvas,x,y,w,h,color){
  this.draw = function(){
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect (x,y,w,h);
  }
}

