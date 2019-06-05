import React, { Component } from 'react'
import Editor from '../components/Editor/Editor'
import NavbarTop from '../components/NavbarTop';
import Webcam from "react-webcam";
// import WebcamCapture from '../components/WebCam'
import App from '../components/DropAndCrop'
import WebCamAndCrop from '../components/WebCamAndCrop'


export default class Canvas extends Component {
    render() {
        return (
            <div>
                <NavbarTop onScreenShotCapture={this.onScreenShotCapture} />
                <Editor />
                <WebCamAndCrop />
                <App />
           </div>
        )
    }
}
