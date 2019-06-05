import React from 'react';
import Editor from './components/Editor/Editor'
import NavbarTop from './components/NavbarTop';
import DropAndCrop from './components/DropAndCrop';
import WebCamAndCrop from './components/WebCamAndCrop';
import DrawableCanvas from "./components/DrawableCanvasCollab/DrawableCanvas";
import MathQuillInput from './components/MathQuillInput';


class App extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Impressionable";
    this.state = {
      draggables: [],
    }

  }

  componentDidMount() {
    window.TogetherJS.hub.on('addItem', msg => {
      if(!msg.sameUrl || msg.id !== this.props.id) {
        return;
      }
      // TODO
      console.log("Added item", msg);
    });
  }

  onScreenShotCapture() {
    console.log("SCREEN CAPTURED");
  }

  addDraggable(type) {
    var { draggables } = this.state;
    // var draggable;
    const id = draggables.length;

    draggables.push({ type, id });
    // if (type === "canvas") {
    //   // draggables.push(<DrawableCanvas key={id} id={id} />);
    // } else if (type === "math") {
    //   // draggables.push(<MathQuillInput key={id} id={id} />);
    // }

    this.setState({ draggables });
    console.log(draggables);
  }



  render() {
    return (
      <div className="App">
        <NavbarTop
          onScreenShotCapture={this.onScreenShotCapture}
          onAddDraggable={this.addDraggable.bind(this)}
        />
        <Editor>
          {this.state.draggables.map(({ type, id }) => {
            var child = null;
            if (type === "canvas") {
              child = <DrawableCanvas key={id} id={id} />;
            } else if (type === "math") {
              child = <MathQuillInput key={id} id={id} />;
            }
            return child;
          })}
        </Editor>
        <WebCamAndCrop />
        <DropAndCrop />
          {/* Icons made by <span />
          <a href="https://www.freepik.com/" title="Freepik">Freepik</a>
           <span /> from <span />
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
           is licensed by <span />
          <a href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0">
            CC 3.0 BY
          </a> */}
      </div>
    );
  }
}

export default App;
