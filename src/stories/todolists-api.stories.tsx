import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolistsAPI'

export default {
    title: 'API/TODOLIST'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.createTodolist('New TodoList3')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '2020b38e-5491-4fa7-9b2f-7dd8587b0882'

        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = 'f1e0ead3-d8b2-424d-8bb9-fae04eb6f70e'

        todolistsAPI.updateTodolistTitle(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
