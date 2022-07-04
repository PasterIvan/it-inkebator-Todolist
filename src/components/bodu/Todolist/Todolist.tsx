import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../AddItemForm';
import {EditableSpan} from '../../../EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {createTaskTC, fetchTasksTC} from "../../../state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistTC,
    TodolistDomainType
} from "../../../state/todolists-reducer";
import {TaskStatuses} from "../../../api/todolistsAPI";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {TaskContainer} from "./Tasks/TaskContainer";

type PropsType = {
    todolist: TodolistDomainType
}

export const Todolist = React.memo(({todolist}: PropsType) => {

    let tasks = useAppSelector(state => state.tasks[todolist.id])
    const dispatch = useAppDispatch()

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }

    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id))
    }, [dispatch, todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }, [dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "all")), [dispatch, todolist.id])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "active")), [dispatch, todolist.id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "completed")), [dispatch, todolist.id])

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])


    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks && tasks.map(t => {
                    return <TaskContainer key={t.id} task={t} todolistId={todolist.id}/>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
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

