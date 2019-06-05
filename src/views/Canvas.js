import React, { Component } from 'react'
import Editor from '../components/Editor/Editor'
import Webcam from "react-webcam";
// import WebcamCapture from '../components/WebCam'
import App from '../components/DropAndCrop'
import WebCamAndCrop from '../components/WebCamAndCrop'


export default class Canvas extends Component {
    render() {
        return (
            <div>
                <Editor />
                <WebCamAndCrop />
                <App />
           </div>
        )
    }
}
