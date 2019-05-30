import React, { Component } from 'react'
import Editor from '../components/Editor/Editor'
import MathQuillInput from '../components/MathQuillInput';

export default class Canvas extends Component {
    render() {
        return (
            <div>
                <Editor />
                <MathQuillInput />
            </div>
        )
    }
}
