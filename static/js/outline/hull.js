export{
  Hull
}

function Hull(canvas,direction,x,y,h,w){
  this.draw = function(){
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = '#6C6C6C';
    if(direction==="R"){
      ctx.fillRect (x, y, -w, h);
    }else{
      ctx.fillRect (x, y, w, h);
    }

  }
}
