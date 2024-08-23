import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTaskDetailsQuery, useGetTaskUsersQuery, useGetUserQuery, useGetJokeQuery  } from '../app/api'
import InProgressButton from './InProgressButton'
import DeleteButton from './DeletedButton'
import CompletedButton from './CompletedButton'

const GetTaskDetails = () => {
    const { taskId } = useParams()
    const { data: task, isLoading } = useGetTaskDetailsQuery(taskId)
    const { data: userData, isLoading: userDataIsLoading} = useGetUserQuery()
    const { data: joke, isLoading: jokeIsLoading } = useGetJokeQuery()
    const { data: users, isLoading: userIsLoading } = useGetTaskUsersQuery(taskId)

    if (isLoading || userIsLoading || userDataIsLoading || jokeIsLoading) return <>Loading...</>

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
                <DeleteButton task={task}/>
                <CompletedButton task={task}/>
            </div>
            <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2" id="staticBackdropLabel">Congrats</h1>
                        </div>
                        <div>
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Heres a JOKE to celebrate a job well done!</h1>
                        </div>
                        <div className="modal-body fs-4">
                            <h1>{joke}</h1>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default GetTaskDetails
