import React from 'react'
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill'
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

addMathquillStyles()
 
class MathQuillInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latex: '',
      sendChanges: true,
    }
  }

  componentDidMount() {
    window.TogetherJS.hub.on('write', msg => {
      if(!msg.sameUrl || msg.id !== this.props.id) {
        return;
      }
      console.log("Got write message", msg);
      this.setState({
        // latex: msg.latex,
        sendChanges: false,
      }, () => {
        this.mathField.latex(msg.latex);
        this.setState({ sendChanges: true });
      });
    });
  }
 
  render() {
    const {...props} = this.props
    return (
      <Draggable
        enableUserSelectHack={false}
      >
        <div 
          {...props}
        >
          <MathQuill
            mathquillDidMount = {mathField => { this.mathField = mathField}}
            latex={this.state.latex} // Initial latex value for the input field
            onChange={latex => {
              // Called everytime the input changes
              this.setState({ latex });
              if (this.state.sendChanges && window.TogetherJS.running) {
                window.TogetherJS.send({
                  id: this.props.id,
                  type: 'write',
                  latex: latex,
                })
              }
            }}
          />
        </div>
      </Draggable>      
    )
  }
}

MathQuillInput.propTypes = {
  /** 
   * id used by Together.js to coordinate collaboration.
   * The id only needs to be unique among MathQuillComponents.
   */
  id: PropTypes.number.isRequired,
};

export default MathQuillInput;