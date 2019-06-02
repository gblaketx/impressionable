import React, { Component } from "react";
import DrawableCanvas from "../DrawableCanvasCollab";
import './Editor.css'; 

class Editor extends Component {
  componentDidMount() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: "AIzaSyC_sS0XzK92EuGnt-i2CuNNhwH57ag8sJA",
      databaseURL: "https://impressions-ef38e.firebaseio.com/",
    };
    window.firebase.initializeApp(config);
    //// Get Firebase Database reference.
    var firepadRef = this.getExampleRef();
    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = window.CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true });
    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });

    // this.lastMouse = {
    //   x: 0,
    //   y: 0
    // };

  }

  // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  // setupCanvas() {
  //   const canvas = document.getElementById('drawCanvas');
  //   const context = canvas.getContext('2d');

  //   // brush settings
  //   context.lineWidth = 2;
  //   context.lineJoin = 'round';
  //   context.lineCap = 'round';
  //   context.strokeStyle = '#000';


  //   // attach the mousedown, mouseout, mousemove, mouseup event listeners.
  //   canvas.addEventListener('mousedown', function (e) {
  //     lastMouse = {
  //       x: e.pageX - this.offsetLeft,
  //       y: e.pageY - this.offsetTop
  //     };
  //     canvas.addEventListener('mousemove', move, false);
  //   }, false);

  //   canvas.addEventListener('mouseout', function () {
  //     canvas.removeEventListener('mousemove', move, false);
  //   }, false);

  //   canvas.addEventListener('mouseup', function () {
  //     canvas.removeEventListener('mousemove', move, false);
  //   }, false);

  // }

  render() {
    return (
        <div>
            <div id="firepad-container"></div>
            <DrawableCanvas />
        </div>
        
    );
  }
}
export default Editor;