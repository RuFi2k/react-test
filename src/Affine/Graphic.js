import React from 'react'
import JXGBoard from 'jsxgraph-react-js';

class Graphic extends React.Component{
    tmp(prop){
        let logicJS = (brd) => {
            brd.suspendUpdate();
            var middle = [prop.x2 - prop.x1, prop.y2 - prop.y1];
            var centerPos = [prop.x1 + middle[0] / 2, prop.y1 + middle[1] / 2];
            var a = 1 + Math.pow(middle[0], 2) / Math.pow(middle[1], 2);
            var b = -2 * centerPos[0] * a;
            var c = Math.pow(centerPos[0], 2) * a - Math.pow(prop.height, 2);
            const D = Math.pow(b, 2) - 4 * a * c;
            var p3 = [];
            if(D === 0){
                p3.push(b * (-1) / (2 * a));
                p3.push((centerPos[0] * middle[0] + centerPos[1] * middle[1])/middle[1] - (middle[0]/middle[1] * p3[0]));
            }
            else if(D > 0){
                p3.push((b * (-1) + Math.sqrt(D)) / (2 * a));
                p3.push((centerPos[0] * middle[0] + centerPos[1] * middle[1])/middle[1] - (middle[0]/middle[1] * p3[0]));
            }
            alert('m0 ' + middle[0]);
            alert('m1 ' + middle[1]);
            alert('a ' + a);
            alert('b ' + b);
            alert('c ' + c);
            alert('D ' + D);
            //matrix
            var moveForwardMatr = [1, 0, 0, 0, 1, 0, 0, prop.c / prop.b, 1];
            var angle = Math.atan(-prop.a / prop.b);
            var rotateForwardMatr = [Math.cos(angle), Math.sin(angle), 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 1];
            var dzerkalMatrix = [1, 0, 0, 0, -1, 0, 0, 0, 1];
            var rotateBackwardMatr = [Math.cos(-angle), Math.sin(-angle), 0, -Math.sin(-angle), Math.cos(-angle), 0, 0, 0, 1];
            var moveBackvardMatr = [1, 0, 0, 0, 1, 0, 0, -prop.c / prop.b, 1];

            var pointMatr = [prop.x1, prop.y1, 1, prop.x2, prop.y2, 1, p3[0], p3[1], 1];
            var finalPointMatr = multiplyMatrix(multiplyMatrix(multiplyMatrix(multiplyMatrix(multiplyMatrix(pointMatr, moveForwardMatr), rotateBackwardMatr), dzerkalMatrix), rotateForwardMatr), moveBackvardMatr);

            var p12 = brd.create('point', [finalPointMatr[0], finalPointMatr[1]], {name: ' ', size: 0, fixed: true});
            var p22 = brd.create('point', [finalPointMatr[3], finalPointMatr[4]], {name: ' ', size: 0, fixed: true});
            var p32 = brd.create('point', [finalPointMatr[6], finalPointMatr[7]], {name: ' ', size: 0, fixed: true});
            brd.create('polygon', [p12, p22, p32]);

            //triangle
            var slider = brd.create('slider', [[5, 10], [10, 10], [0, 0, 1]]);
            var p1 = brd.create('point', [function(){return prop.x1 + ((p12.X() - prop.x1) * slider.Value())}, function(){return prop.y1 + ((p12.Y() - prop.y1) * slider.Value())}], {name: ' ', size: 0, fixed: true});
            var p2 = brd.create('point', [function(){ return prop.x2 + ((p22.X() - prop.x2) * slider.Value())}, function(){return prop.y2 + ((p22.Y() - prop.y2) * slider.Value())}], {name: ' ', size: 0, fixed: true});
            // var a1 = middle[0] + prop.height * Math.sin(alpha);
            // var a2 = middle[1] + prop.height * Math.cos(alpha);
            var finalPoint = brd.create('point', [function(){ return p3[0] + ((p32.X() - p3[0]) * slider.Value())}, function(){ return p3[1] + ((p32.Y() - p3[1]) * slider.Value())}], {name: ' ', size: 0, fixed: true});
            brd.create('polygon', [p1, p2, finalPoint]);
            var linep1 = brd.create('point', [1, prop.a / (-prop.b) - prop.c / prop.b], {name: ' ', size: 0, fixed: true});
            var linep2 = brd.create('point', [2, 2 * prop.a / (-prop.b) - prop.c / prop.b], {name: ' ', size: 0, fixed: true});
            brd.create('line', [linep1, linep2]);


            function multiplyMatrix(matr1, matr2){
                let newMatrix = [];
                for(let i = 0; i < 3; ++i){
                    for(let j = 0; j < 3; j++){
                        var tmp = 0;
                        for(let r = 0; r < 3; ++r){
                            tmp += matr1[i * 3 + r] * matr2[r * 3 + j];
                        }
                            newMatrix.push(tmp);
                        tmp = 0;
                    }
                }
                return newMatrix;
            }
            brd.unsuspendUpdate();
        }
        return logicJS
    }

    render(){
        
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

export {Graphic as default}