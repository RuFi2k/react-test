import React from 'react';
import './Graphic-fractal.css';
import JXGBoard from 'jsxgraph-react-js';

class Graphics extends React.Component {
  newState = {
    len: 10,
    anglesCount: 3,
    coef: 1 / 2
  }
  tmp(prop) {
    console.log(prop);
    let logicJS = (brd) => {
      brd.suspendUpdate();
      var t = brd.create('turtle', [0, 0], { strokeOpacity: 1 });
      function side(size, level, coef, count) {
        if (level === 0) {
          t.fd(size);
          return;
        }
        side(size * (1 - coef) / 2, level - 1, coef, count);
        t.lt(180 * (count - 2) / count);
        for (let i = 0; i < count - 1; i++) {
          side(size * coef, level - 1, coef, count);
          t.rt(360 / count);
        }
        t.lt(180);
        side(size * (1 - coef) / 2, level - 1, coef, count);
      }
      
      function snowflake(size, level, coef, count) {
        for (var i = 0; i < count; i++) {
          side(size, level, coef, count);
          t.rt(360 / count);
        };
      }

      function serp(size, level, count, startPosX, startPosY){
        if(count === 3){
          var p1 = brd.create('point', [startPosX, startPosY], {name: ' ', size: 0, fixed: true});
          var p2 = brd.create('point', [startPosX + size, startPosY], {name: ' ', size: 0, fixed: true});
          var p3 = brd.create('point', [startPosX + size/2, startPosY + size * Math.sin(Math.PI / 3)], {name: ' ', size: 0, fixed: true});
          if(level <= 0){
            brd.create('polygon', [p1, p2, p3], {fillOpacity: 1, fillColor:'black', highlight: false});
            return;
          }

          if(level > 0){
            serp(size / 2, level - 1, count, startPosX, startPosY);
            serp(size / 2, level - 1, count, startPosX + size / 2, startPosY);
            serp(size / 2, level - 1, count, startPosX + size/4, startPosY + size / 2 * Math.sin(Math.PI / 3));
          }
        }
        else if(count === 4){
          if(level <= 0){
            var p21 = brd.create('point', [startPosX, startPosY], {name: ' ', size: 0, fixed: true});
            var p22 = brd.create('point', [startPosX + size, startPosY], {name: ' ', size: 0, fixed: true});
            var p23 = brd.create('point', [startPosX + size, startPosY + size], {name: ' ', size: 0, fixed: true});
            var p24 = brd.create('point', [startPosX, startPosY + size], {name: ' ', size: 0, fixed: true});      
            brd.create('polygon', [p21, p22, p23, p24], {fillOpacity: 1, fillColor:'black', withLines: false, strokeColor: 'white', strokeOpacity: 1, highlight: false});
            return;
          }

          if(level > 0){
            for(let i = 0; i < 3; ++i){
              for(let j = 0; j < 3; ++j){
                if((i !== 1 || j !== 1)){
                  serp(size / 3, level - 1, count, startPosX + size / 3 * j, startPosY + size / 3 * i);
                }
              }
            }
          }
          // var p1 = brd.create('point', [startPosX, startPosY], {name: ' ', size: 0, fixed: true});
          //   var p2 = brd.create('point', [startPosX + size, startPosY], {name: ' ', size: 0, fixed: true});
          //   var p3 = brd.create('point', [startPosX + size, startPosY + size], {name: ' ', size: 0, fixed: true});
          //   var p4 = brd.create('point', [startPosX, startPosY + size], {name: ' ', size: 0, fixed: true});      
          //   var triangle = brd.create('polygon', [p1, p2, p3, p4], {fillOpacity: 1, fillColor:'black', highlight: false});
          // var array = new Array();
          // var lvl = level;
          // var siz = size;
          // var x = startPosX, y = startPosY;
          // while(lvl > 0){
          //   x += siz/3; y += siz / 3;
          //   while(x < startPosX + size){
          //     while(y < startPosY + size){
          //     var p1 = brd.create('point', [x, y], {name: ' ', size: 0, fixed: true});
          //   var p2 = brd.create('point', [x + siz / 3, y], {name: ' ', size: 0, fixed: true});
          //   var p3 = brd.create('point', [x + siz/3, y + siz/3], {name: ' ', size: 0, fixed: true});
          //   var p4 = brd.create('point', [x, y + siz/3], {name: ' ', size: 0, fixed: true});      
          //   var triangle = brd.create('polygon', [p1, p2, p3, p4], {fillOpacity: 1, fillColor:'white', highlight: false});
          //    y+= siz;
          //     }
          //     x+= siz;
          //     y = startPosY + siz/3;
          //   }
          //   x = startPosX; y = startPosY;
          //   siz /=3;
          //   lvl--;
          // }
      }
    }
      
      function drawFigure(size, level, coef, anglesCount, fractalType) {
        t.clearScreen();
        t.hideTurtle();
        t.setPenSize(1)
        t.setPenColor("#000000")
        t.rt(90 - 180 * (anglesCount - 2) / anglesCount);
        t.setPos(0, 0);
        if(fractalType === 'Koch'){
        snowflake(size, level, coef, anglesCount);
        }
        else{
          console.log("serpinskii");
          serp(size, level,anglesCount, 0, 0)
        }
      }
      
      if (prop != null) {
        if(prop.fType === 'Serpinskii'){
          drawFigure(prop.len, prop.param, 0, prop.anglesCount, prop.fType);
        }
        else{
          drawFigure(prop.len, 5, prop.param, prop.anglesCount, prop.fType);
        }
      }
      brd.unsuspendUpdate();
    }
    return logicJS;
  }


  render() {
    var func = this.tmp(this.props.newState);
    console.log(func);
    return <JXGBoard
      logic={this.tmp(this.props.newState)}
      boardAttributes={{ axis: true }}
      key={Math.random()}
      style={{
        paddingTop: 72 + 'px',
        width: 100 + 'vw',
        height: 100 + 'vw',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0
        }}
    />
  }
}

export { Graphics as default };