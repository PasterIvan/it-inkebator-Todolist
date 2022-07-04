import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Body} from "./components/bodu/Body";

export const App = () => {

    return (
        <div className="App">
            <Header/>
            <Body />
        </div>
    );
}

