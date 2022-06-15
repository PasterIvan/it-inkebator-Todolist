import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});

TaskIsDoneStories.args = {
    task: { id: 'string',
        title: 'string',
        isDone: true},
    todolist: {id: 'string',
        title: 'string',
        filter: "all"}
};

export const TaskIsNotStories = Template.bind({});

TaskIsNotStories.args = {
    task: { id: 'string',
        title: 'string',
        isDone: false},
    todolist: {id: 'string',
        title: 'string',
        filter: "all"}
};