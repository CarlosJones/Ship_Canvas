<template>
  <div class="ship">
    <div id="shipDIV" class="layout">
      <canvas id="shipCanvas"  width="2000" height="200" style="border:1px solid #00000f;">
        您的浏览器不支持 HTML5 canvas 标签。
      </canvas>
    </div>
    <div class="layout">
      <div class='layui-tab' lay-filter="demo" lay-allowclose="true">
        <ul class="layui-tab-title">
          <!--<li lay-id="11" class="layui-this">例子</li>-->
        </ul>
        <div class="layui-tab-content">
          <!--<div class="layui-tab-item">内容</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Handler} from "../../static/js/handler"
  import  '../../static/js/jquery.min.js'
  import  '../../static/layui/layui.js'
  import  '../../static/layui/lay/modules/jquery'
  import  '../../static/layui/lay/modules/element'
  import {ParseData} from "../../static/js/data/parseData"

  export default {
  name: 'ship',
  mounted:function () {
    let shipData = []
    let allData = []
    let shipCanvas = document.getElementById('shipCanvas')
    let ctx = shipCanvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0,0,2000,200)
    var parseData = new ParseData(shipCanvas)
    parseData.readFile(shipCanvas,function(shipData1,data){
      shipData = shipData1
      allData = data
    })
    //-----------对轮廓图事件进行监听-----------------------
    let  pUp;
    shipCanvas.addEventListener('click', function (e) {
      // console.log(e.screenX+' '+e.screenY)
      // console.log(e.clientX+' '+e.clientY)
      pUp = getEventPosition(e);
      for(let bayD of shipData){
        for (const item of bayD) {
          if(item.x<=pUp.x && (item.x+item.w)>=pUp.x
            && item.y<=pUp.y && (item.y+item.h)>=pUp.y){
//-----------------------------------------------------------------------------
            layui.use('element',function(){
              let $=layui.jquery,element = layui.element;
              let canvasId = new Date().getTime()
              console.log(element);
              element.tabAdd('demo',{
                title:item.bayNo+'贝'
                ,content:'<canvas '+'id='+canvasId+' width="1000" height="600" style="border:1px solid #00000f;">您的浏览器不支持 HTML5 canvas 标签。</canvas>'
                ,id:canvasId
              })
              element.tabChange('demo',canvasId)
              let hatchCanvas = document.getElementById(canvasId)
              let ctxHatch = hatchCanvas.getContext('2d')
              let handle = new Handler(ctxHatch,item,allData)
              handle.draw()
            })
 //----------------------------------------------------------------------
          }
        }
      }
   }, false);
//----------------------对轮廓图事件进行监听------------------------------------------------
//--------------模拟鼠标点击-----------------------------------------------------------------
//     let target = document.getElementById('shipCanvas');
    let target = document.getElementById('shipDIV');
    let eventObj = document.createEvent('MouseEvents');
    eventObj.initMouseEvent('click',true,true,window,1,207,452,207,356,false,false,true,false,0,null);
    target.dispatchEvent(eventObj);
//---------------------------------------------------------------------------------------------
    function getEventPosition(ev) {
      let x, y;
      if (ev.layerX || ev.layerX === 0) {
        x = ev.layerX;
        y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX === 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
      }
      return {x: x, y: y};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/layui/css/layui.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.layout {
  float: left;
  height: 100%;
  width: 50%;
  overflow:auto;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
}

</style>
