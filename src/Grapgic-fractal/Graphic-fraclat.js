import React from 'react';
import './Graphic-fractal.css';
import JXGBoard from 'jsxgraph-react-js';

  

class Graphics extends React.Component {
    constructor(props){
      super(props);
    }
    newState = {
      len: 10,
      anglesCount: 3,
      coef: 1/2
    }
  tmp(prop){
    console.log('tmpp function');
    console.log(prop);
    let logicJS = (brd) => {
      console.log('logic function');
      brd.suspendUpdate();   
      var t = brd.create('turtle', [0, 0], {strokeOpacity: 1});
      function side(size, level, coef, count) {
        if (level===0) {
            t.fd(size);
            return;
        }
        side(size*(1-coef)/2, level-1, coef, count);
        t.lt(180 * (count-2) / count);
        for(let i = 0; i < count - 1; i++){
          side(size*coef, level-1, coef, count);
          t.rt(360/count);
        }
        t.lt(180);
        side(size*(1-coef)/2, level-1, coef, count);
    }      
    function snowflake(size, level, coef, count) {
        for (var i=0;i<count;i++) {
            side(size, level, coef, count);
            t.rt(360/count);
        };
    }      
    function drawFigure(size, level, coef, anglesCount){
      t.clearScreen();
      t.hideTurtle();
      t.setPenSize(1)
      t.setPenColor("#000000")
      t.rt(90 - 180 * (anglesCount - 2) / anglesCount);
      t.setPos(0, 0);
      snowflake(size, level, coef, anglesCount);
    }
    console.log('inside');
    if(prop != null){
    drawFigure(prop.len, 2, prop.coef, prop.anglesCount);}
    else{
      drawFigure(Math.random()*10, 2, Math.random(), 3);
    }
    brd.unsuspendUpdate();
    }
    return logicJS;
  }
    

    render(){
      var func = this.tmp(this.props.newState);
      console.log(func);
        return (() => <JXGBoard
        logic={ this.tmp(this.props.newState) }
        boardAttributes={{axis: true}}
        style={{
          paddingTop: 72 + 'px',
          width: 100 + 'vw',
          height: 100 + 'vw',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          right: 0
        }}
        />)();
    }
}

export { Graphics as default };