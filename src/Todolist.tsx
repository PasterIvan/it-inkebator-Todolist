import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const Todolist = React.memo(({todolist}: PropsType) =>{
    console.log('Todolist')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    const dispatch = useDispatch()

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    },[dispatch, todolist.id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    },[dispatch, todolist.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    },[dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "all")),[dispatch, todolist.id])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "active")),[dispatch, todolist.id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "completed")),[dispatch, todolist.id])

    return <div>
        <h3> <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolist.id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, todolist.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})