import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const tasksListItems = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id}
            className={t.isDone ? 'is-done': ''} >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    })

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string>( '')

    const fnAddTask = () => {
        if (title.trim() !== "") {
            props.addTask(title);
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            fnAddTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={fnAddTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {tasksListItems}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler} >All</button>
            <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
