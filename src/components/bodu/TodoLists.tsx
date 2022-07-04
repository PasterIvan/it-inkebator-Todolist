import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addTodoListTC, fetchTodolistsTC} from "../../state/todolists-reducer";

export const TodoLists = () => {

    const dispatch = useAppDispatch()

    const todolists = useAppSelector(state => state.todolists)

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
                {todolists && todolists.map(tl => {
                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                            />
                        </Paper>
                    </Grid>
                })
                }
            </Grid>
        </Container>
    )
}