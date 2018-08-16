import {Container} from './container.js'
import {BayNo} from './bayNo.js'
export {
  Bay
}


function Bay(canvas,dlType,x, y, w, h, color, t,bayNo,hatchId){
  const bayData=[];
  this.bayData = function () {
    return bayData;
  }
  this.draw = function(){
    if(!canvas.getContext) return;
    if(dlType === 'H'){
      for(var i=0;i<t;i++){
        let value={};
        value['hatchId']=hatchId
        value['bayNo']=bayNo
        value['x']=x
        value['y']=y+i*h+1*i
        value['w']=w
        value['h']=h
        var container = new Container(canvas,x,y+i*h+1*i,w,h,color)
        container.draw()
        var drawBayNo = new BayNo(canvas,bayNo,x,150)
        drawBayNo.draw()
        bayData.push(value)
      }
    }else{
      for(var i=0;i<t;i++){
        let value={};
        value['hatchId']=hatchId
        value['bayNo']=bayNo
        value['x']=x
        value['y']=y-i*h-1*i
        value['w']=w
        value['h']=h
        var container = new Container(canvas,x,y-i*h-1*i,w,h,color)
        container.draw()
        bayData.push(value)
      }
    }
  }
}

