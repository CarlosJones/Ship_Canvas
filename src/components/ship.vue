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
  import {Bay} from '../../static/js/container/bay.js'
  import {Outline} from '../../static/js/outline/outline.js'
  import {Handler} from "../../static/js/handler"
  import  '../../static/layui/jquery'
  import  '../../static/layui/layui.js'
  import  '../../static/layui/lay/modules/jquery'
  import  '../../static/layui/lay/modules/element'

  export default {
  name: 'ship',
  mounted:function () {
    const shipData = []
    var shipCanvas = document.getElementById('shipCanvas')
    var ctx = shipCanvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0,0,2000,200)
    var outline = new Outline(shipCanvas)
    outline.draw()
    var row1B = new Bay(shipCanvas,'B',300,80,20,5,'#0000E3',8)
    row1B.draw()
    shipData.push(row1B.bayData())
    var row1A = new Bay(shipCanvas,'A',300,80,20,5,'#0000E3',8)
    row1A.draw()
    shipData.push(row1A.bayData())
    var row2B = new Bay(shipCanvas,'B',323,80,20,5,'#FFFFFF',8)
    shipData.push(row2B.bayData())
    row2B.draw()
    var row2A = new Bay(shipCanvas,'A',323,80,20,5,'#FFFFFF',8)
    shipData.push(row2A.bayData())
    row2A.draw()
    //-----------对轮廓图事件进行监听-----------------------
    let  pUp;
    shipCanvas.addEventListener('mouseup', function (e) {
      // console.log(e)
      pUp = getEventPosition(e);
      // console.log(pUp);
      // console.log(shipData)
      for(var bayD of shipData){
        for (const item of bayD) {
          if(item.x<=pUp.x && (item.x+item.w)>=pUp.x
            && item.y<=pUp.y && (item.y+item.h)>=pUp.y){
//-----------------------------------------------------------------------------
            layui.use('element',function(){
              var $=layui.jquery,element = layui.element;
              var canvasId = new Date().getTime()
              console.log(element);
              element.tabAdd('demo',{
                title:'新选项卡'
                ,content:'<canvas '+'id='+canvasId+' width="1000" height="600" style="border:1px solid #00000f;">您的浏览器不支持 HTML5 canvas 标签。</canvas>'
                ,id:canvasId
              })
              element.tabChange('demo',canvasId)
              var hatchCanvas = document.getElementById(canvasId)
              var ctxHatch = hatchCanvas.getContext('2d')
              var handle = new Handler(ctxHatch,item)
              handle.draw()
            })
 //----------------------------------------------------------------------
          }
        }
      }
   }, false);
//----------------------------------------------------------------------
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
}

</style>
