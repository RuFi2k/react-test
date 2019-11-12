import React from 'react';
import './App.css';
import Header from './Header/Header.js'
import Settings from './Fractal_settings/Fractal-settings.js'
import Graphic from './Grapgic-fractal/Graphic-fraclat.js'

class Fractal extends React.Component{
  constructor(props){
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler(l, c, param, type){
    this.setState({
      len: l,
      anglesCount: c,
      param: param,
      fType: type
    });
  }

  render(){
    return <>
      <Header />
      <div className="main-screen">
      <Settings handler = {this.handler}/>
      <Graphic newState = {this.state}/>
      <a className="help-button" href="/help" style={{textDecoration: 'none'}}>
          ?
      </a>
      </div>
    </>
  }
}

export {Fractal as default};