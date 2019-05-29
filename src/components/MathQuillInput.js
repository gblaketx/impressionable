import React from 'react'
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill'

addMathquillStyles()
 
export default class MathQuillInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latex: '',
    }
  }
 
  render() {
    return (
      <MathQuill
        latex={this.state.latex} // Initial latex value for the input field
        onChange={latex => {
          // Called everytime the input changes
          this.setState({ latex })
        }}
      />
    )
  }
}