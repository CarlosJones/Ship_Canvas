import {Bow} from "../outline/bow"
import {Hull} from "../outline/hull"
import {Bridge} from "../outline/bridge"
import {Chimney} from "../outline/chimney"
import {Stern} from "../outline/stern"
import {Bay} from '../container/bay.js'

export{
  ParseData
}

const shipData = []
function ParseData(canvas){
  this.readFile = function(canvas,callback){
    $.ajax({
      type: "get",
      dataType: "json",
      url: "../../static/data/cwpImportDataJson.json",
      success: function (data) {
        console.log(data)
        var direction = data.smartScheduleIdInfoList[0].planBerthDirect
        var hatchList = data.smartVpsVslHatchsInfoList
        var machineList = data.smartVesselMachinesInfoList
        var bayList = data.smartVpsVslBaysInfoList
        hatchList.sort(compareHatch)
        outline(canvas,direction,hatchList,machineList,bayList,shipData)
        callback(shipData,data)
      }
    })
  }
}

function outline(canvas,direction,hatchList,machineList,bayList,shipData){
  const outLineHeight = 80
  const startX = 200
  const startY = 80
  const ratio = 2

  var position = 0
  //船的方向是L
  if(direction == 'L'){
    //画船头---------------------
    var bowL = new Bow(canvas,"L",startX,startY,outLineHeight)
    bowL.draw()
    var hatchSeq = 0
    var preHatchSeq = 0
    var width = 20
    var prePosition = 0
    var preHatchLength = 0
    position = startX
    //--------------------------------
    //确定第一段船身的长度-------------------------
    $.each(hatchList,function(index,obj){
      // console.log(obj)
      if(index == 0){
        prePosition = obj.hatchPosition
        preHatchLength = obj.hatchLength
        preHatchSeq = index
      }
      if(index != 0){
        if(obj.hatchPosition == preHatchLength+prePosition){
          width = width + obj.hatchLength
          prePosition = obj.hatchPosition
          preHatchLength = obj.hatchLength
        }else{
          hatchSeq = index
          return false;
        }
      }
    })
    //画第一段船身
    var hull1 = new Hull(canvas,"L",startX,startY,outLineHeight,width*ratio)
    hull1.draw()
    //画集装箱
    for(let i = preHatchSeq;i<hatchSeq;i++){
      let twoBayNo = []
      let bays = []
      $.each(bayList, function (iBay, bay) {
        if (bay.hatchId == hatchList[i].hatchId) {
          if($.inArray(bay.bayNo,twoBayNo)==-1){
            twoBayNo.push(bay.bayNo)
          }
          if($.inArray(bay,bays)==-1){
            bays.push(bay)
          }
        }
      })
      twoBayNo.sort()
      for(let j=0;j<bays.length;j++){
        let drawBay = new Bay(canvas,bays[j].deckOrHatch,position+((2*i+twoBayNo.indexOf(bays[j].bayNo))*hatchList[i].hatchLength),80,hatchList[i].hatchLength-2,5,'#0000E3',8,bays[j].bayId,bays[j].bayNo,bays[j].hatchId)
        drawBay.draw()
        shipData.push(drawBay.bayData())
      }
    }
    //-------------------------------------------------------------------
    //画机器设备--------------------------------------------------------
    //确定设备的类型---------------------
    var type = 0
    $.each(machineList,function(index,machine){
      if(machine.machinePosition>prePosition && machine.machinePosition<hatchList[hatchSeq].hatchPosition){
          type = machine.machineType
          return false
      }
    })
    //测试数据只有烟囱，没提示驾驶台
    if(type == 4){
      var chimneyL = new Chimney(canvas,"L",startX+width*ratio,startY,outLineHeight,outLineHeight)
      chimneyL.draw()
      position = startX+width*ratio+outLineHeight
    }else{
      var bridgeL = new Bridge(canvas,"L",startX+width*ratio,startY,outLineHeight,outLineHeight)
      bridgeL.draw()
      position = startX+width*ratio+outLineHeight
    }
    //-------------------------------------------------------------------
    //确定第二段船身长度
    preHatchSeq = hatchSeq
    if(hatchSeq<hatchList.length){
      width = 20
      for(var i = hatchSeq;i<hatchList.length;i++){
        if(i == hatchSeq){
          prePosition = hatchList[i].hatchPosition
          preHatchLength = hatchList[i].hatchLength
        }
        if(i != hatchSeq){
          if(hatchList[i].hatchPosition == preHatchLength+prePosition){
            width = width + hatchList[i].hatchLength
            prePosition = hatchList[i].hatchPosition
            preHatchLength = hatchList[i].hatchLength
          }else{
            hatchSeq = i
            break
          }
        }
      }
      //画第二段船身
      var hull1 = new Hull(canvas,"L",position,startY,outLineHeight,width*ratio)
      hull1.draw()
      //画第二段集装箱
      for(let i = preHatchSeq;i<hatchSeq;i++) {
        let twoBayNo = []
        let bays = []
        $.each(bayList, function (iBay, bay) {
          if (bay.hatchId == hatchList[i].hatchId) {
            if($.inArray(bay.bayNo,twoBayNo)==-1){
              twoBayNo.push(bay.bayNo)
            }
            if($.inArray(bay,bays)==-1){
              bays.push(bay)
            }
          }
        })
        twoBayNo.sort()
        $.each(bays, function (iBay, bay) {
            let drawBay = new Bay(canvas, bay.deckOrHatch, position + ((2*(i-preHatchSeq)+twoBayNo.indexOf(bay.bayNo)) * hatchList[i].hatchLength), 80, hatchList[i].hatchLength-2, 5, '#0000E3', 8,bay.bayId,bay.bayNo,bay.hatchId)
            drawBay.draw()
            shipData.push(drawBay.bayData())
        })
      }
      position = position + width*ratio
    }
    //画第二个机器设备
    if(hatchSeq<hatchList.length){
      //确定设备的类型---------------------
      var type = 0
      $.each(machineList,function(index,machine){
        if(machine.machinePosition>prePosition && machine.machinePosition<hatchList[hatchSeq].hatchPosition){
          type = machine.machineType
          return false
        }
      })
      //测试数据只有烟囱，没提示驾驶台
      if(type == 4){
        var chimneyL = new Chimney(canvas,"L",position,startY,outLineHeight,outLineHeight)
        chimneyL.draw()
        position = position+outLineHeight
      }else{
        var bridgeL = new Bridge(canvas,"L",position,startY,outLineHeight,outLineHeight)
        bridgeL.draw()
        position = position+outLineHeight
      }
    }
    //画第三段船身
    preHatchSeq = hatchSeq
    if(hatchSeq<hatchList.length){
        width = 20
        for(var i = hatchSeq;i<hatchList.length;i++){
          if(i == hatchSeq){
            prePosition = hatchList[i].hatchPosition
            preHatchLength = hatchList[i].hatchLength
          }
          if(i != hatchSeq){
            if(hatchList[i].hatchPosition == preHatchLength+prePosition){
              width = width + hatchList[i].hatchLength
              prePosition = hatchList[i].hatchPosition
              preHatchLength = hatchList[i].hatchLength
            }else{
              hatchSeq = i
              break
            }
          }
          if(i==hatchList.length-1){
            hatchSeq = i
          }
        }
        //画第三段船身
        var hull1 = new Hull(canvas,"L",position,startY,outLineHeight,width*ratio)
        hull1.draw()
      //画第三段集装箱
      for(let i = preHatchSeq;i<hatchSeq;i++) {
        let twoBayNo = []
        let bays = []
        $.each(bayList, function (iBay, bay) {
          if (bay.hatchId == hatchList[i].hatchId) {
            if ($.inArray(bay.bayNo, twoBayNo) == -1) {
              twoBayNo.push(bay.bayNo)
            }
            if ($.inArray(bay, bays) == -1) {
              bays.push(bay)
            }
          }
        })
        twoBayNo.sort()
        $.each(bays, function (iBay, bay) {
          let drawBay = new Bay(canvas, bay.deckOrHatch, position + ((2 * (i - preHatchSeq) + twoBayNo.indexOf(bay.bayNo)) * hatchList[i].hatchLength), 80, hatchList[i].hatchLength - 2, 5, '#0000E3', 8,bay.bayId, bay.bayNo,bay.hatchId)
          drawBay.draw()
          shipData.push(drawBay.bayData())
        })
      }
        position = position + width*ratio
    }
    //画船尾
    var sternL = new Stern(canvas,"L",position,outLineHeight,outLineHeight)
    sternL.draw()
  }else{                                                                  //船方向是R

  }
}

function drawHatch(canvas,hatchList,bayList){
 $.each(hatchList,function (iHatch,hatch) {
    $.each(bayList,function (iBay,bay) {
      if(bay.hatchId == hatch.hatchId){

      }
    })
 })


}

//舱按照hatchSeq排序
function compareHatch(x,y){
  if(x.hatchSeq<y.hatchSeq){
    return -1;
  }else if(x.hatchSeq>y.hatchSeq){
    return 1;
  }else{
    return 0;
  }
}


