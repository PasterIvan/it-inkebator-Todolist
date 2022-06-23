import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API TASK'
}

const todolistId = 'e4f06a15-b931-4448-b7ff-5d7aae116d8b'
const taskId = 'd0b70a30-e1a1-497c-afba-db052ae2cd09'

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

        taskAPI.createTask(todolistId, 'Task 2 TD3')
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
