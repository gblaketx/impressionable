import React, { Component } from 'react'
import Editor from '../components/Editor/Editor'
import MathQuillInput from '../components/MathQuillInput';
import Webcam from "react-webcam";
import WebcamCapture from '../components/WebCam'
import App from '../components/DropAndCrop'

export default class Canvas extends Component {
    render() {
        return (
            <div>
                <Editor />
                <MathQuillInput />
                <WebcamCapture />
                <App />
           </div>
        )
    }
}
