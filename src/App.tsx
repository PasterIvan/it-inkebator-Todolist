import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Body} from "./components/bodu/Body";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/bodu/Login';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {CircularProgress, Container} from "@mui/material";
import {initializeAppTC} from './state/app-reducer';

export const App = () => {

    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<Body/>}/>
                    <Route path='login' element={<Login/>}/>

                    <Route path='404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

