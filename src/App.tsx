import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const todolistTitle: string = "What to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ]
    )
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter( filter )
    }

    const changeStatus = (tasksId: string, isDone: boolean) => {
        let task = tasks.find( t=> t.id === tasksId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
            {/* <Todolist title = "Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
