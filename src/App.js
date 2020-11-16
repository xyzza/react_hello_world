import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import { Provider } from 'react-redux';
import { configureStore } from "./redux/configureStore";


export default function App(props) {
    const store = configureStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App text-left">
                    <MainComponent/>
                </div>
            </BrowserRouter>
        </Provider>
    );
};