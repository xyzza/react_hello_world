import React, {Component} from 'react';
import './App.css';
import {DISHES} from "./shared/dishes";
import MainComponent from './components/MainComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }
    render(){
        return (
            <div className="App text-left">
                <MainComponent/>
            </div>
        );
    }
}

export default App;
