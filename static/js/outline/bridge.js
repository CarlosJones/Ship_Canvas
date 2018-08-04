export{
  Bridge
}
function Bridge(canvas,direction,x,y,h,w){
  this.draw = function(){
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = '#6C6C6C';
    if(direction==="R"){
      ctx.fillRect (x, y, -w, h);
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x-w/4,y-h);
      ctx.lineTo(x-w/2,y-h);
      ctx.lineTo(x-w/2,y-h/4*3);
      ctx.lineTo(x-w,y-h/4*3);
      ctx.lineTo(x-w,y-h/4*2);
      ctx.lineTo(x-w/4*3,y-h/4*2);
      ctx.lineTo(x-w/4*3,y);
      ctx.fill();
    }else{
      ctx.fillRect (x, y, w, h);
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+w/4,y-h);
      ctx.lineTo(x+w/2,y-h);
      ctx.lineTo(x+w/2,y-h/4*3);
      ctx.lineTo(x+w,y-h/4*3);
      ctx.lineTo(x+w,y-h/4*2);
      ctx.lineTo(x+w/4*3,y-h/4*2);
      ctx.lineTo(x+w/4*3,y);
      ctx.fill();
    }
  }
}
