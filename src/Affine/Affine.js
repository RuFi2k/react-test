import React from 'react';
import Properties from './Settings.js';
import Header from '../Header/Header.js';
import Graphic from './Graphic.js';

class Affine extends React.Component{
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler(x1, y1, x2, y2, h, a, b, c){
        this.setState({
            x1: parseFloat(x1),
            y1: parseFloat(y1),
            x2: parseFloat(x2),
            y2: parseFloat(y2),
            height: parseFloat(h),
            a: parseFloat(a),
            b: parseFloat(b),
            c: parseFloat(c)
        });
        console.log(this.state);
      }
    
    render(){
        return(<>
            <Header/>
            <a className="help-button" href="/help" style={{textDecoration: 'none'}}>
                ?
            </a>
            <div className="main-screen">
                <Properties handler = {this.handler}/>
                {this.state != null ? <Graphic newState={this.state}/> : null}
            </div>
            
        </>);
    }
}

export {Affine as default};