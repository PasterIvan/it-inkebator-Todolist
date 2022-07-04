import {changeTaskTitleAC, removeTasksTC, updateTaskStatusTC} from "../../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../hooks/hooks";
import {Task} from "./Task";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const TaskContainer: React.FC<PropsType> = React.memo(({task, todolistId}) => {
    const {title, id, status} = task
    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => dispatch(removeTasksTC(id, todolistId)), [dispatch, id, todolistId])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatusTC( todolistId, id,e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New));
    }, [dispatch, todolistId, id])

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newValue ))
    }, [dispatch, todolistId, id])

    return <Task title={title}
              status={status}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>


})