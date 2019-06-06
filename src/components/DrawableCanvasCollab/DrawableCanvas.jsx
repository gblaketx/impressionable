import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import assign from 'object-assign'
import Draggable from 'react-draggable';
import './DrawableCanvas.css'; 

class DrawableCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragPosition: { x: 0, y: 0 }
    }
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this).children[1];

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');

    window.TogetherJS.hub.on('draw', msg => {
      if(!msg.sameUrl || msg.id !== this.props.id) {
        return;
      }
      this.draw(msg.lX, msg.lY, msg.cX, msg.cY);
    });

    window.TogetherJS.hub.on('drag', msg => {
      if(!msg.sameUrl || msg.id !== `canvas-${this.props.id}`) {
        return;
      }
      this.setState({
        dragPosition: { x: msg.x, y: msg.y }
      });
    });

    this.setState({
      canvas,
      context
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
  }

  static getDefaultStyle() {
    return {
      brushColor: '#FFFF00',
      lineWidth: 4,
      cursor: 'pointer',
      canvasStyle: {
        backgroundColor: '#00FFDC',
      },
      clear: false,
    };
  }

  handleOnTouchStart (e) {
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    this.setState({
      lastX: e.targetTouches[0].pageX - rect.left,
      lastY: e.targetTouches[0].pageY - rect.top,
      drawing: true
    });
  }

  handleOnMouseDown(e){
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();

    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top,
      drawing: true
    });
  }

  handleOnTouchMove (e) {
    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
      
      if (window.TogetherJS.running) {
        window.TogetherJS.send({
          id: `canvas-${this.props.id}`,
          type: 'draw',
          lX: lastX,
          lY: lastY,
          cX: currentX,
          cY: currentY,
        });
      }
    }
  }

  handleOnMouseMove(e){
    if(this.state.drawing){
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });

      if (window.TogetherJS.running) {
        window.TogetherJS.send({
          id: this.props.id,
          type: 'draw',
          lX: lastX,
          lY: lastY,
          cX: currentX,
          cY: currentY,
        });
      }
    }
  }

  handleonMouseUp() {
    this.setState({
      drawing: false
    });
  }

  draw(lX, lY, cX, cY) {
    const newContext = this.state.context;
    newContext.strokeStyle = this.props.brushColor;
    newContext.lineWidth = this.props.lineWidth;
    this.setState({
      context: newContext
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
  }

  resetCanvas(){
    const width = this.state.context.canvas.width;
    const height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  }

  canvasStyle(){
    const defaults = DrawableCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;
    return assign({}, defaults, custom);
  }

  handleDrag = (evt) => {
    this.setState({
      dragPosition: {x: evt.layerX, y: evt.layerY }
    });
    if(window.TogetherJS.running) {
      window.TogetherJS.send({
        id: `canvas-${this.props.id}`,
        type: 'drag',
        x: evt.layerX,
        y: evt.layerY,
      });
    }
  }

  render() {
    return (
      <Draggable
        handle=".triangle"
        onDrag={this.handleDrag}
        position={this.state.dragPosition}
      >
        <div style={{
            width: 300,
            height: 300,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#d6d7da',
            zIndex: 100,
            position: 'absolute',
            top: 200,
            left: 100,
          }}>
          <div className="triangle" />
          <canvas style = {this.canvasStyle()}
            width={300}
            height={300}
            onMouseDown = {this.handleOnMouseDown.bind(this)}
            onTouchStart = {this.handleOnTouchStart.bind(this)}
            onMouseMove = {this.handleOnMouseMove.bind(this)}
            onTouchMove = {this.handleOnTouchMove.bind(this)}
            onMouseUp = {this.handleonMouseUp.bind(this)}
            onTouchEnd = {this.handleonMouseUp.bind(this)}
          />
        </div>
      </Draggable>
    );
  }

}

DrawableCanvas.propTypes = {
  brushColor: PropTypes.string,
  lineWidth: PropTypes.number,
  cursor: PropTypes.string,
  canvasStyle: PropTypes.shape({
    backgroundColor: PropTypes.string
  }),
  clear: PropTypes.bool,
  id: PropTypes.number.isRequired,
};

export default DrawableCanvas;
