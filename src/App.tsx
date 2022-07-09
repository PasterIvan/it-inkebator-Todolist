import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Body} from "./components/bodu/Body";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";

export const App = () => {

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Body />
        </div>
    );
}

