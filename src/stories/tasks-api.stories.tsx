import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/todolist-api";

export default {
    title: 'API/TASK'
}

const todolistId = 'e4f06a15-b931-4448-b7ff-5d7aae116d8b'
const taskId = 'bf61692d-b667-422a-95c4-c34f7e9cb00b'

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        taskAPI.createTask(todolistId, 'Task 3 TD3')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        taskAPI.updateTaskTitle(todolistId, taskId, 'SOME NEW TASK TITLE')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
