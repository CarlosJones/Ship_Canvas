export{
  Handler
}

const width = 30
function Handler(ctx,item,allData){
  //舱中所有的倍
  let bayList = []
  let bayNoList = []
  this.getAllBays = function(item,allData){
    let hatchId = item.hatchId
    let allbays = allData.smartVpsVslBaysInfoList

    $.each(allbays,function(index,bay){
      if(bay.hatchId == hatchId){
        bayList.push(bay)
        if($.inArray(bay.bayNo,bayNoList) == -1){
          bayNoList.push(bay.bayNo)
        }
      }
    })
    bayNoList.sort()
  }
  this.processBay = function(item,allData){
    //用来确定贝的启始位置
    let height = 0
    let bayWidth = 0
    ctx.fillStyle='#ffffff'
    ctx.fillRect(0, 0, 1000, 1000)
    this.getAllBays(item,allData)
    let allContainers = allData.smartVesselContainerInfoList
    let hatchContainers = []
    let bigBayNo = (parseInt(bayNoList[0])+parseInt(bayNoList[1]))/2
    $.each(allContainers,function(index,c){
      if(c.hatchId == item.hatchId){
        hatchContainers.push(c)
      }
    })
    //画第一个倍
    for(let i=0;i<bayList.length;i++) {
      if (bayList[i].bayNo == bayNoList[0] && bayList[i].deckOrHatch == "D") {
        let bayId = bayList[i].bayId
        let bayLocations = []
        let tierNumberList = []
        let rowSeqList = []
        this.parseData(item, allData, bayLocations, tierNumberList, rowSeqList, bayId)
        singleBay(ctx,bayList[i],10,10,tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
        height = tierNumberList.length
        bayWidth = rowSeqList.length
      }
    }
    //画第二个倍
    for(let i=0;i<bayList.length;i++) {
        if (bayList[i].bayNo == bayNoList[0] && bayList[i].deckOrHatch == "H") {
          let bayId = bayList[i].bayId
          let bayLocations = []
          let tierNumberList = []
          let rowSeqList = []
          this.parseData(item, allData, bayLocations, tierNumberList, rowSeqList, bayId)
          if(bayWidth == rowSeqList.length){
            singleBay(ctx,bayList[i],10,(height+4)*width,tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
          }else if(bayWidth > rowSeqList.length){
            singleBay(ctx,bayList[i],(10+(bayWidth - rowSeqList.length)/2*width),((height+4)*width+10),tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
          }
        }
    }
    //画第三个倍
    for(let i=0;i<bayList.length;i++) {
      if (bayList[i].bayNo == bayNoList[1] && bayList[i].deckOrHatch == "D") {
        let bayId = bayList[i].bayId
        let bayLocations = []
        let tierNumberList = []
        let rowSeqList = []
        this.parseData(item, allData, bayLocations, tierNumberList, rowSeqList, bayId)
        singleBay(ctx,bayList[i],(bayWidth+4)*width,10,tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
        height = tierNumberList.length
        bayWidth = rowSeqList.length
      }
    }
    //画第四个倍
    for(let i=0;i<bayList.length;i++) {
      if (bayList[i].bayNo == bayNoList[1] && bayList[i].deckOrHatch == "H") {
        let bayId = bayList[i].bayId
        let bayLocations = []
        let tierNumberList = []
        let rowSeqList = []
        this.parseData(item, allData, bayLocations, tierNumberList, rowSeqList, bayId)
        if(bayWidth == rowSeqList.length){
          singleBay(ctx,bayList[i],(bayWidth+4)*width,(height+4)*width,tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
        }else if(bayWidth > rowSeqList.length){
          singleBay(ctx,bayList[i],((bayWidth+4)*width+(bayWidth - rowSeqList.length)/2*width),((height+4)*width+10),tierNumberList,rowSeqList,bayLocations,hatchContainers,bigBayNo)
        }
      }
    }
  }

  this.parseData = function(item,allData,bayLocations,tierNumberList,rowSeqList,bayId){
      this.getTierInfo(item,allData,bayLocations,tierNumberList,bayId)
      this.getSeqList(item,allData,bayId,rowSeqList)
  }
  //目标，每个倍，排号的顺序
  this.getSeqList = function(item,allData,bayId,rowSeqList){
    let rowList = []
    $.each(allData.smartVpsVslRowsInfoList,function(index,obj){
      if(obj.bayId == bayId){
        rowList.push(obj.rowNo)
        rowList.sort()
      }
    })
    this.getRowSeqListBySeaOrLand(rowList,'ROW_SEQ_EVEN_ODD',rowSeqList)
  }
  this.getRowSeqListBySeaOrLand = function(rowList,oddOrEven,rowSeqList){
    $.each(rowList,function(index,obj){
      if(parseInt(obj)%2 == 0){
        rowSeqList.unshift(obj)
      }else{
        rowSeqList.push(obj)
      }
    })
    if(oddOrEven == 'ROW_SEQ_EVEN_ODD'){
    }else{
      rowSeqList.reverse()
    }
    // console.log(rowSeqList)
  }
  this.getTierInfo = function(item,allData,bayLocations,tierNumberList,bayId){
    //目标，每个倍，最高层和最低层的层数
    let topTierNum = -1
    let bottomTierNum = 1000
    let allLocations = allData.smartVpsVslLocationsInfoList
    $.each(allLocations,function(index,obj){
      if(obj.bayId == bayId){
        bayLocations.push(obj)
      }
    })
    $.each(bayLocations,function(index,obj){
      let location = obj.location
      let tier = location.substring(4,6)
      if(tier>topTierNum){
        topTierNum = tier
      }
      if(tier<bottomTierNum){
        bottomTierNum = tier
      }
    })
    if(bottomTierNum<topTierNum){
      for(let i=parseInt(topTierNum);i>=parseInt(bottomTierNum);i-=2){
        tierNumberList.push(i)
      }
    }
    // console.log(tierNumberList.toString())
  }
  this.draw = function(){
    this.processBay(item,allData)
  }
  function singleBay(ctx,e,bx,by,t,r,bayLocations,hatchContainers,bigBayNo){
      var bayWidth = (r.length+2)*width;
      var bayHight = (t.length+2)*width;
      ctx.beginPath();
      ctx.rect(bx, by, bayWidth, bayHight);
      ctx.font = "20px Arial"
      ctx.fillStyle = "#FF1012";
      ctx.fillText('舱'+e.hatchId+'贝'+e.bayNo, bx, by+20);
      ctx.stroke();
      //画层号
      for(var i=0;i<t.length+1;i++){
        ctx.font = "20px Arial"
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
          //判断slot是否存在
          let p = e.bayNo+r[i]
          if(t[j]<10){
            p = p+'0'+t[j]
          }else{
            p = p+t[j]
          }
          let pB = bigBayNo
          if(bigBayNo<10){
            pB = '0'+pB+p.substring(2,6)
          }else{
            pB = pB+p.substring(2,6)
          }
          // console.log(p)
          $.each(bayLocations,function(index,position){
            if(position.location == p || position.location == pB){
              // console.log('------------'+p)
              ctx.beginPath();
              ctx.rect(bx+x, by+y, width, width)
              let containerExist = false
              $.each(hatchContainers,function(index,container){
                //集装箱存在
                if(container.vLocation == p){
                  containerExist = true
                  console.log('--'+container.cSzCsizecd+'---')
                  //集装箱的类型
                 if(container.cSzCsizecd == '20'){
                    ctx.fillStyle="#FFC0CB"
                  }
                }else if(container.vLocation == pB){
                  containerExist = true
                  console.log('--'+container.cSzCsizecd+'---')
                  //集装箱的类型
                  if(container.cSzCsizecd == '40'|| container.cSzCsizecd == '45'){
                    ctx.fillStyle="#00FFFF"
                  }
                }
              })
              if(!containerExist){
                ctx.fillStyle="#D3D3D3"
              }
              console.log(p+'------'+ctx.fillStyle)
              ctx.fillRect(bx+x, by+y, width, width)
              //顺序用随机数
              let num = parseInt(100*Math.random());
              ctx.font = "20px Arial"
              ctx.fillStyle="#000000"
              ctx.fillText(num,bx+x, by+y+width, width, width)
              console.log(num)
              ctx.stroke();
            }
          })
        }
      }
  }
}
