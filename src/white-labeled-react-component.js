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
  //todo pass in array of components to require
  getWhitelabeledComponent(path){
    if(!path){
      return;
    }
    const that = this;
    const name = this.getComponentName(path);

    //try to dynamically import the component
    require.ensure([], function(require) {
      try{
        //check to see if there is an override for the portal
        that[name] = require(path).default;
      }catch(e){
        //if import fails, show error
        // class NotFound extends Component {
        //   render(){
        //     return (
        //       <div>Could not find {path}</div>
        //     );
        //   }
        // }
        // that[name] = NotFound;
        console.log('could not find ', path);
      }

      that.forceUpdate()
    })
  }

  render(){
    return (
      <div>
        Please override the render function!
      </div>
    );
  }
}

export default WhiteLabeledReactComponent;
