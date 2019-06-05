import React, { Component } from 'react'
import logo from '../icons/contract.svg';
import '../App.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to Impressions - Communicate and Learn Remotely
                    </p>
                </header>
            </div>
        )
    }
}
