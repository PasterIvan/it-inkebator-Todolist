import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "../../../../api/todolistsAPI";

export type TaskPropsType = {
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void,
    changeTaskTitle: (newTitle: string) => void,
    removeTask: () => void,
    title: string,
    status: TaskStatuses
}

export const Task = React.memo(({ title,
                                    status,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask}: TaskPropsType) => {

    return <div className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={changeTaskStatus}
        />
        <EditableSpan value={title} onChange={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>

})