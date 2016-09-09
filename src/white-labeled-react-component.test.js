import React from 'react';
import ReactDOM from 'react-dom';
import WhiteLabeledReactComponent from './white-labeled-react-component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WhiteLabeledReactComponent />, div);
});
