import React, {Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <div className="App text-left">
                    <MainComponent/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
