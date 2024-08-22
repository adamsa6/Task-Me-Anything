import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ListAllTasks from './components/ListAllTasks'
import ListAssignedTasks from './components/ListAssignedTasks'
import ListMyTasks from './components/ListMyTasks'
import GetTaskDetails from './components/GetTaskDetails'
import ListTaskComments from './components/ListTaskComments'
import GetTaskComment from './components/GetTaskComment'
import GetJoke from './components/GetJoke'
import CreateTaskForm from './components/CreateTaskForm'
import TaskHistory from './components/TaskHistory'
import Dashboard from './components/Dashboard'
// import EditTaskForm from './components/EditTaskForm'
// import ChangeTaskStatus from './components/ChangeTaskStatus'
// import CreateCommentForm from './components/CreateCommentForm'
// import EditTaskCommentForm from './component/EditTaskCommentForm'
import App from './App'

import './index.css'


const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'tasks',
                    element: <ListAllTasks />,
                },
                {
                    path: 'assigned-tasks/mine',
                    element: <ListAssignedTasks />,
                },
                {
                    path: 'tasks/mine',
                    element: <ListMyTasks />,
                },
                {
                    path: 'tasks/:taskId',
                    element: <GetTaskDetails />,
                },
                {
                    path: 'tasks/:taskId/comments',
                    element: <ListTaskComments />,
                },
                {
                    path: 'tasks/:taskId/comments/:commentId',
                    element: <GetTaskComment />,
                },
                {
                    path: 'joke',
                    element: <GetJoke />,
                },
                {
                    path: 'tasks/create',
                    element: <CreateTaskForm />
                },
                {
                    path: 'tasks/history',
                    element: <TaskHistory />
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />
                }
                // {
                //     path: 'tasks/:taskId',
                //     element: <EditTaskForm />
                // },
                // {
                //     path: 'tasks/:taskId/status',
                //     element: <ChangeTaskStatus />
                // },
                // {
                //     path: 'tasks/:taskId/comments/:commentId',
                //     element: <EditTaskCommentForm />
                // },
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
