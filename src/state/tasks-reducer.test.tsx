 // import {CreateTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
 import {TasksStateType} from '../AppWithRedux'
// import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
// import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
//
// let startState: TasksStateType
//
// beforeEach(()=>{
//     startState = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: TaskStatuses.New, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: TaskStatuses.New, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: TaskStatuses.Completed, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: TaskStatuses.Completed, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: TaskStatuses.New, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: TaskStatuses.Completed, description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
//                 todoListId: 'todolistId2'}
//         ]
//     }
// })
//
// test('correct task should be deleted from correct array', () => {
//
//     const action = removeTaskAC('2', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: TaskStatuses.Completed},
//             {id: '2', title: 'JS', status: TaskStatuses.New},
//             {id: '3', title: 'React', status: TaskStatuses.Completed}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: TaskStatuses.Completed},
//             {id: '3', title: 'tea', status: TaskStatuses.Completed}
//         ]
//     })
// })
//
// test('correct task should be added to correct array', () => {
//
//     const action = CreateTaskAC('juce', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].status).toBe(TaskStatuses.Completed)
// })
//
// test('status of specified task should be changed', () => {
//
//     const action = changeTaskStatusAC('2', 2, 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].status).toBe(2)
//     expect(endState['todolistId1'][1].status).toBe(0)
// })
//
// test('title of specified task should be changed', () => {
//
//     const action = changeTaskTitleAC('2', 'Test', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].title).toBe('Test')
//     expect(endState['todolistId1'][1].title).toBe('JS')
// })
//
// test('new array should be added when new todolist is added', () => {
//
//     const action = addTodolistAC('new todolist')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
//
// test('property with todolistId should be deleted', () => {
//
//     const action = removeTodolistAC('todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
// })