import React from 'react';
import Editor from './components/Editor/Editor'
import NavbarTop from './components/NavbarTop';
import DropAndCrop from './components/DropAndCrop';
import WebCamAndCrop from './components/WebCamAndCrop';
import DrawableCanvas from './components/DrawableCanvasCollab/DrawableCanvas';
import MathQuillInput from './components/MathQuillInput';
import InstructionsModal from './components/InstructionsModal/InstructionsModal';
import WebCamModal from './components/WebCamModal/WebCamModal';


class App extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Impressionable";
    this.state = {
      draggables: [],
      isModalOpen: true,
      isModalOpenWebcam: false,
    }
  }

  componentDidMount() {
    window.TogetherJS.hub.on('addItem', msg => {
      if(!msg.sameUrl) {
        return;
      }
      const { draggables } = this.state;
      draggables.push(msg.item);
      this.setState({ draggables });
    });
  }

  onScreenShotCapture() {
    console.log("SCREEN CAPTURED");
  }

  onEnableWebcam() {
    this.toggleModalWebcam();
  }

  addDraggable(type) {
    var { draggables } = this.state;
    const item = { type, id: draggables.length }
    draggables.push(item);
    this.setState({ draggables });

    if (window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'addItem',
        item
      });
    }
  }

  toggleModal = () => this.setState({
    isModalOpen: !this.state.isModalOpen
  });

  toggleModalWebcam = () => this.setState({
    isModalOpenWebcam: !this.state.isModalOpenWebcam
  });

  render() {
    return (
      <div className="App">
        <NavbarTop
          onEnableWebcam={this.onEnableWebcam.bind(this)}
          onScreenShotCapture={this.onScreenShotCapture.bind(this)}
          onAddDraggable={this.addDraggable.bind(this)}
          toggleModal={this.toggleModal}
        />
          <InstructionsModal
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
          />

          <WebCamModal
            isOpen={this.state.isModalOpenWebcam}
            toggle={this.toggleModalWebcam}
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
          {/* <WebCamAndCrop /> */}
          {/* <DropAndCrop /> */}
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
