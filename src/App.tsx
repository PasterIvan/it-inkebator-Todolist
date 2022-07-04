import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {TodoLists} from "./components/bodu/TodoLists";

export const App = () => {

    return (
        <div className="App">
            <Header/>
           <TodoLists/>
        </div>
    );
}

