import {useAppDispatch} from "../../hooks/hooks";
import React, {useCallback, useEffect} from "react";
import {addTodoListTC, fetchTodolistsTC} from "../../state/todolists-reducer";
import {AddItemForm} from "../../AddItemForm";
import {Container, Grid} from "@material-ui/core";
import {TodoLists} from "./Todolist/Todolists";

export const Body = () => {
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

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
