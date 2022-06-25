import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: 'v1()', title: "HTML&CSS", status: 0, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0,
                todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: 0, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0,
                todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: 0, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0,
                todoListId: 'todolistId2'},
            {id: v1(), title: "React Book", status: 0, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0,
                todoListId: 'todolistId2'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)