import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTasksTC} from "../../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../hooks/hooks";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}:PropsType) => {

    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTasksTC(task.id, todolistId)),[dispatch, task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = +e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId));
    },[dispatch, task.id, todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    },[dispatch, task.id, todolistId])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})