import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../../../state/todolists-reducer";
import {TaskStatuses} from "../../../api/todolistsAPI";
import {createTaskTC, fetchTasksTC} from "../../../state/tasks-reducer";

type TodoListsPropsType = {
    todolist: TodolistDomainType
}

export const TodoListContainer: React.FC<TodoListsPropsType> = ({todolist}) => {
    let tasks = useAppSelector(state => state.tasks[todolist.id])
    const dispatch = useAppDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id))
    }, [dispatch, todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const changeTodolistFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [dispatch, todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])

    let filteredTasks
    todolist.filter === 'active' ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.New) :
        todolist.filter === 'completed' ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed) :
            filteredTasks = tasks

    return (
        <Todolist
            title={todolist.title}
            filter={todolist.filter}
            todolistId={todolist.id}
            entityStatus={todolist.entityStatus}
            tasks={filteredTasks}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
            changeTodolistFilter={changeTodolistFilter}
            addTask={addTask}
        />
    )
}