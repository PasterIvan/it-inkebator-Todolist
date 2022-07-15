import {ActionTypeForTaskReducer, tasksReducer} from './tasks-reducer'
import {ActionsTypeForTodoListsReducer, todolistsReducer} from './todolists-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionsTypeForApp, appReducer} from "./app-reducer";
import {ActionsTypeForAuth, authReducer} from "./auth-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionsType = ActionTypeForTaskReducer | ActionsTypeForTodoListsReducer | ActionsTypeForApp | ActionsTypeForAuth

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store