import {Container} from './container.js'
export {
  Bay
}


function Bay(canvas,ctxHatch,dlType,x, y, w, h, color, t){
  const bayData=[];
  this.bayData = function () {
    return bayData;
  }
  this.draw = function(){
    if(!canvas.getContext) return;
    if(dlType === 'B'){
      for(var i=0;i<t;i++){
        let value={};
        value['x']=x
        value['y']=y+i*h+1*i
        value['w']=w
        value['h']=h
        var container = new Container(canvas,x,y+i*h+1*i,w,h,color)
        container.draw()
        bayData.push(value)
      }
    }else{
      for(var i=0;i<t;i++){
        let value={};
        value['x']=x
        value['y']=y-i*h-1*i
        value['w']=w
        value['h']=h
        var container = new Container(canvas,x,y-i*h-1*i,w,h,color)
        container.draw()
        bayData.push(value)
      }
    }
    // console.log(bayData)
  }
  function onClick(event) {
    ctxHatch.beginPath();
    ctxHatch.arc(20, 20, 20, 0, Math.PI * 2, true);
    ctxHatch.fillStyle = '#000';
    ctxHatch.fill();
    ctxHatch.closePath();
  }
}

