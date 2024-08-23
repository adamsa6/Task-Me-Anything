import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTaskDetailsQuery, useGetTaskUsersQuery, useGetUserQuery  } from '../app/api'
import InProgressButton from './InProgressButton'

const GetTaskDetails = () => {
    const { taskId } = useParams()
    const { data: task, isLoading } = useGetTaskDetailsQuery(taskId)
    const { data: userData, isLoading: userDataIsLoading} = useGetUserQuery()
    console.log("^^^^^^^^^^^^^^^^^", userData)

    const { data: users, isLoading: userIsLoading } = useGetTaskUsersQuery(taskId)

    if (isLoading || userIsLoading || userDataIsLoading) return <>Loading...</>

    return (
        <div>
            <h1>{task.title}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created On</th>
                        <th>Due Date</th>
                        <th>Assignee</th>
                        <th>Assigner</th>
                        <th>Priority Level</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{task.title}</td>
                        <td>{task.created_on}</td>
                        <td>{task.due_date}</td>
                        <td>{users.assignee.last_name}, {users.assignee.first_name}</td>
                        <td>{users.assigner.last_name}, {users.assigner.first_name}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <InProgressButton key={task.id} task={task}/>
            </div>
        </div>
    )
}

export default GetTaskDetails
