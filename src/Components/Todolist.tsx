import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistsType} from '../App';
import {MapComponent} from "./MapComponent";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
    setTodolists: (todolists: Array<TodolistsType>) => void
    todolists: Array<TodolistsType>
    removeTodolist: (todolistID: string)=>void
    changeTodolistTitle: (todolistID: string, newTitle: string)=>void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    function changeFilter(todolistID: string, value: FilterValuesType) {
        props.setTodolists(props.todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    const addTask = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle);
    }

    const onAllClickHandler = () => changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => changeFilter(props.todolistID, "completed");
    const removeTodolistHandler =() => {props.removeTodolist(props.todolistID)}

    return <div>

        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} /> <button onClick={removeTodolistHandler}>X</button></h3>
        <AddItemForm addItem={addTask} />
        <MapComponent
            tasksForTodolist={tasksForTodolist}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistID={props.todolistID}
            changeTaskTitle={props.changeTaskTitle}
        />
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
