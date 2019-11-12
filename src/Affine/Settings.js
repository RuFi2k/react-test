import React from 'react';
import './Settings.css'

class Properties extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buttonClass: 'properties',
            // left: '462px'
        }
    }
    
    menuOperator() {
        if (this.state.buttonClass === 'properties') {
            this.setState({ buttonClass: 'properties closed' });
            // this.setState({ left: '0px' });
        }
        else {
            this.setState({ buttonClass: 'properties' });
            // this.setState({ left: '462px' });
        }
    }

    build(){
        // if(typeof(this.state.x1) === 'number' && typeof(this.state.y1) === 'number' && typeof(this.state.x2) === 'number' && typeof(this.state.y2) === 'number'){
        //     if(typeof(this.state.height) === 'number'){

        //     }
        //     else{
        //         alert("Bad height");
        //     }
        // }
        // else{
        //     alert("Bad coordinates.");
        // }
        this.props.handler(this.state.x1, this.state.y1, this.state.x2, this.state.y2, this.state.height, this.state.a, this.state.b, this.state.c);
    }

    render(){
        return(
            <div className={this.state.buttonClass}>
                <button className='settings-invoker' onClick={(e) => { this.menuOperator() }}>
                    <input type="checkbox" className="checker" />
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
                <div><input className="dd-header huge" type="number" placeholder="Enter height length:" min="0" onChange={(e) => {this.setState({height: e.target.value})}}></input></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{color: '#fff'}}>Enter two main points:</span>
                    <div className="point">
                        <input className="dd-header" type="number" placeholder="X" onChange={(e) => {this.setState({x1: e.target.value})}}></input>
                        <input className="dd-header" type="number" placeholder="Y" onChange={(e) => {this.setState({y1: e.target.value})}}></input>
                    </div>
                    <div className="point">
                        <input className="dd-header" type="number" placeholder="X" onChange={(e) => {this.setState({x2: e.target.value})}}></input>
                        <input className="dd-header" type="number" placeholder="Y" onChange={(e) => {this.setState({y2: e.target.value})}}></input>
                    </div>
                    <div className="line-formula">
                        <input className="dd-header" type="number" placeholder="A" min="0" onChange={(e) => {this.setState({a: e.target.value})}}></input>
                        <span> X + </span>
                        <input className="dd-header" type="number" placeholder="B" min="0" onChange={(e) => {this.setState({b: e.target.value})}}></input>
                        <span> Y + </span>
                        <input className="dd-header" type="number" placeholder="C" min="0" onChange={(e) => {this.setState({c: e.target.value})}}></input>
                        <span> = 0</span>
                    </div>
                    <button className='buildBtn' onClick={() => { this.build(); console.log('success'); }}>Build</button>
                </div>
            </div>
        );
    }
}

export {Properties as default};