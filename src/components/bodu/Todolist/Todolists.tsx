import React from "react";
import {useAppSelector} from "../../../hooks/hooks";
import {Grid, Paper} from "@material-ui/core";
import {TodoListContainer} from "./TodoListContainer";

export const TodoLists = React.memo(() => {
    const todoLists = useAppSelector(state => state.todolists)

    return (
        <>{todoLists && todoLists.map(tl =>
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodoListContainer todolist={tl}/>
                </Paper>
            </Grid>)}
        </>
    )
})