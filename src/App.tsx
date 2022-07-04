import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {TodoLists} from "./components/bodu/TodoLists";
import {useAppSelector} from "./hooks/hooks";

export const App = () => {

    const todolists = useAppSelector(state => state.todolists)

    return (
        <div className="App">
            <Header/>
            <TodoLists todolists={todolists}/>
        </div>
    );
}

