import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {logoutTC} from "../../state/auth-reducer";

export const Header = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.app.status)
    const isLoggedIn = useAppSelector((state)=> state.auth.isLoggedIn)

    const logOutHandket = ()=>{
        dispatch(logoutTC())
    }

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                {isLoggedIn && <Button onClick={logOutHandket} color="inherit">Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}