import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";
import {TodolistType} from "../AppWithRedux";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    todolist: {id: 'string',
        title: 'string',
        filter: "all"},
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskWithDispatch = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId2'][0])
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists[0])

    return <Task task={task} todolist={todolist}/>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskWithDispatch />;

export const TaskWithDispatchStories = Template.bind({});

TaskWithDispatchStories.args = {}
//     task: { id: 'string',
//         title: 'string',
//         isDone: true},
// };
//
// export const TaskIsNotStories = Template.bind({});
//
// TaskIsNotStories.args = {
//     task: { id: 'string',
//         title: 'string',
//         isDone: false},
// };