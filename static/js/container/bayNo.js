export{
  BayNo
}

function BayNo(canvas,bayNo,x,y){
  this.draw = function(){
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillText(bayNo,x,y)
  }
}
