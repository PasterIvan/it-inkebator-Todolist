import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import React, {useCallback, useEffect} from "react";
import {addTodoListTC, fetchTodolistsTC} from "../../state/todolists-reducer";
import {AddItemForm} from "../../AddItemForm";
import {Container, Grid} from "@material-ui/core";
import {TodoLists} from "./Todolist/Todolists";
import {Navigate} from "react-router-dom";

export const Body = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                <TodoLists/>
            </Grid>
        </Container>
    )
}
