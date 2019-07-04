
import React from 'react';
import sytle from './index.scss'
export default class Edit extends React.Component {
  componentDidMount() {
    console.error('1234')
  }
  render () {
    return (
      <div className={sytle.Edit}>
        <canvas id="floorplanner-canvas"
                className={sytle.canvas}
          ></canvas>
      </div>
    );
  }
}
