import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../api/todolist-api";


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

    return <Task task={task} todolistId={'todolistId2'}/>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskWithDispatch />;

export const TaskWithDispatchStories = Template.bind({});

TaskWithDispatchStories.args = {}