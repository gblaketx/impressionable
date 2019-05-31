import React, { Component } from 'react'
import Editor from '../components/Editor/Editor'
import MathQuillInput from '../components/MathQuillInput';
import Webcam from "react-webcam";
import WebcamCapture from '../components/WebCam'


export default class Canvas extends Component {
    render() {
        return (
            <div>
                <Editor />
                <MathQuillInput />
                <WebcamCapture />

           </div>
        )
    }
}
