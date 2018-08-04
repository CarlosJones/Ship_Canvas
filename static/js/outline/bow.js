export{
  Bow
}

function Bow(canvas,direction,x,y,h){
  this.draw = function(){
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    if(direction==="R"){
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+2*h,y);
      ctx.lineTo(x,y+h);
      ctx.closePath();//闭合路径
      ctx.fillStyle = '#6C6C6C';
      ctx.fill();
    }else{
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x-2*h,y);
      ctx.lineTo(x,y+h);
      ctx.closePath();//闭合路径
      ctx.fillStyle = '#6C6C6C';
      ctx.fill();
    }
  }
}
