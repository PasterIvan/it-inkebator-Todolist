import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Body} from "./components/bodu/Body";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from 'react-router-dom';
import { Login } from './components/bodu/Login';

export const App = () => {

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Routes>
                <Route path='/' element={<Body/>}/>
                <Route path='login' element={<Login/>}/>

                <Route path='404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to={"404"}/>}/>
            </Routes>
        </div>
    );
}

