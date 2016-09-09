import React, { Component } from 'react';

class WhiteLabeledReactComponent extends Component {
  constructor(props){
    super(props);
    if(!props.components){
      return;
    }
    props.components.forEach((path) => this[this.getComponentName(path)] = null)
  }

  getComponentName(path){
    return path.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()
  }

  componentWillMount(){
    //it is required that subclasses call super.componentWillMount();
    if(!this.props.components){
      return;
    }
    this.props.components.forEach((cmp) => this.getWhitelabeledComponent(cmp));
  }


  render(){
    if(!this.getWhitelabeledComponent){
      console.log("Please implement getWhitelabeledComponent()")
    }
    console.log("Please override the render function!")
    return null;
  }
}

export default WhiteLabeledReactComponent;
