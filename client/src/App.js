import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Chat from './components/Chat/Chat';
class App extends Component {

    
    render() {
        return (
            <div>
                <Chat/>
            </div>
        );
    }
}

export default App;
