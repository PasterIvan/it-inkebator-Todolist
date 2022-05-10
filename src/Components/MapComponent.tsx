import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType={
    todolistID: string
    tasksForTodolist:Array<TaskType>
    removeTask: (todolistID:string,taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void

}

export const MapComponent = ({todolistID, tasksForTodolist,removeTask, ...props}:PropsType) => {
    return (
        <ul>
            {tasksForTodolist.map(t => {
                const onClickHandler = () => removeTask(todolistID, t.id)

                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                }

                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(todolistID, t.id, newValue);
                }

                return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox defaultChecked onChange={onChangeStatusHandler} checked={t.isDone} />
                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <IconButton aria-label="delete">
                        <Delete onClick={onClickHandler}/>
                    </IconButton>
                </li>
            })
            }
        </ul>
    );
};

