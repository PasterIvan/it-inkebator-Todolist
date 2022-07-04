import {changeTaskStatusAC, changeTaskTitleAC, removeTasksTC} from "../../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../hooks/hooks";
import {Task} from "./Task";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const TaskContainer = React.memo(({task, todolistId}: PropsType) => {
    const {title, id, status} = task
    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => dispatch(removeTasksTC(id, todolistId)), [dispatch, id, todolistId])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = +e.currentTarget.checked
        dispatch(changeTaskStatusAC(id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId));
    }, [dispatch, id, todolistId])

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [dispatch, id, todolistId])

    return <div key={id} className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Task title={title}
              status={status}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
    </div>

})