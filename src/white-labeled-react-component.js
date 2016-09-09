import React, { Component } from 'react';

class WhiteLabeledComponent extends Component {
  constructor(props){
    super(props);
    props.components.forEach((path) => this[this.getComponentName(path)] = null)
  }

  getComponentName(path){
    return path.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()
  }

  componentWillMount(props){
    //it is required that subclasses call super.componentWillMount();
    this.props.components.forEach((cmp) => this.getWhitelabeledComponent(cmp));
  }
  //todo pass in array of components to require
  getWhitelabeledComponent(path){
    const that = this;
    const name = this.getComponentName(path);

    //try to dynamically import the component
    require.ensure([], function(require) {
      try{
        //check to see if there is an override for the portal
        that[name] = require(path).default;
      }catch(e){
        //if import fails, show error
        class NotFound extends Component {
          render(){
            return (
              <div>Could not find {path}</div>
            );
          }
        }
        that[name] = NotFound;
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

export default WhiteLabeledComponent;
