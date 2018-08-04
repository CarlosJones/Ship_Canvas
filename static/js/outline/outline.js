import {Bow} from './bow.js'
import {Stern} from './stern.js'
import {Hull} from './hull.js'
import {Chimney} from './chimney.js'
import {Bridge} from './bridge.js'

export{
  Outline
}

function Outline(canvas){
  this.draw = function(){
    var bowL = new Bow(canvas,"L",300,80,80)
    bowL.draw()
    var hull1 = new Hull(canvas,"L",300,80,80,500)
    hull1.draw()
    var bridgeL = new Bridge(canvas,"L",800,80,80,80)
    bridgeL.draw()
    var hull2 = new Hull(canvas,"L",880,80,80,500)
    hull2.draw()
    var chimneyL = new Chimney(canvas,"L",1380,80,80,80)
    chimneyL.draw()
    var hull3 = new Hull(canvas,"L",1460,80,80,300)
    hull3.draw()
    var sternL = new Stern(canvas,"L",1760,80,80)
    sternL.draw()
  }
}
