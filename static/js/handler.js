export{
  Handler
}

const hatchRowSeqList=[12,10,8,6,4,2,0,1,3,5,7,9,11]
var tierListA = [94,92,90,88,86,84,82]
var tierListB = [16,14,12,10]
const width = 30
function Handler(ctx,item,allData){
  this.draw = function(){
    ctx.fillStyle='#ffffff'
    ctx.fillRect(0, 0, 1000, 600);
    //画第一个倍
      singleBay(ctx,item,0,0,tierListA,hatchRowSeqList)
    //画第二个倍
      singleBay(ctx,item,0,(tierListA.length+4)*width,tierListB,hatchRowSeqList)
    //画第三个倍
    singleBay(ctx,item,(hatchRowSeqList.length+4)*width,0,tierListA,hatchRowSeqList)
    //画第四个倍
    singleBay(ctx,item,(hatchRowSeqList.length+4)*width,(tierListA.length+4)*width,tierListB,hatchRowSeqList)
  }
  function singleBay(ctx,e,bx,by,t,r){
      var bayWidth = (r.length+2)*width;
      var bayHight = (t.length+2)*width;
      ctx.beginPath();
      ctx.rect(bx, by, bayWidth, bayHight);
      ctx.font = "20px Georgia";
      ctx.fillStyle = "#FF1012";
      ctx.fillText('舱'+e.hatchId, bx, by+20);
      ctx.stroke();
      //画层号
      for(var i=0;i<t.length+1;i++){
        ctx.font = "20px Georgia";
        if(i != t.length){
          ctx.fillText(t[i],bx,by+width*(i+2),width,width)
        }else{
          ctx.fillText('左下角',bx,by+width*(t.length+2),width,width)
        }
      }
      //画排号
      for(var j=0;j<r.length;j++){
        ctx.fillText(r[j],bx+width*(j+1),by+width*(t.length+2),width,width)
      }
      //画倍
      for (let i = 0; i < r.length; i++) {
        let x = (i+1) * width;
        for (let j = 0; j < t.length; j++) {
          let y = (j+1)*width
          ctx.beginPath();
          ctx.rect(bx+x, by+y, width, width);
          let num = parseInt(100*Math.random());
          ctx.fillText(num,bx+x, by+y+width, width, width)
          // console.log(num)
          ctx.stroke();
        }
      }
  }
}
