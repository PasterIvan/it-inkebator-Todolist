import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";
import {useAppSelector} from "../../hooks/hooks";

export const Header = () => {

    const status = useAppSelector((state) => state.app.status)

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}