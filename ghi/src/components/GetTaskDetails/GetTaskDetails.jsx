import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useGetTaskDetailsQuery,
    useGetTaskUsersQuery,
    useGetUserQuery,
    useGetJokeQuery,
} from '../../app/api'
import InProgressButton from './InProgressButton'
import DeleteButton from './DeletedButton'
import CompletedButton from './CompletedButton'
import ListTaskComments from '../ListTaskComments/ListTaskComments'
import GetConfetti from './Confetti'
import './GetTaskDetails.css'

const GetTaskDetails = () => {
    const { taskId } = useParams()
    const { data: task, isLoading } = useGetTaskDetailsQuery(taskId)
    const { data: userData, isLoading: userDataIsLoading } = useGetUserQuery()
    const { data: joke, isLoading: jokeIsLoading } = useGetJokeQuery()
    const { data: users, isLoading: userIsLoading } =
        useGetTaskUsersQuery(taskId)
    const navigate = useNavigate()
    const [showConfetti, setShowConfetti] = useState(false)

    async function handleNavigateClick() {
        navigate('/dashboard')
    }

    async function handleEditClick() {
        navigate(`/tasks/${taskId}/update`)
    }

    function handleCompleteClick() {
        setTimeout(() => {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 10000)
        }, 300)
    }

    if (isLoading || userIsLoading || userDataIsLoading || jokeIsLoading) {
        return <>Loading...</>
    }

    return (
        <div className="task-container">
            <GetConfetti showConfetti={showConfetti} />
            <div className="task-left-column">
                <div className="task-details-card">
                    <h1>{task.title}:</h1>
                    <p>{task.description}</p>
                </div>
                <div>
                    <ListTaskComments key={task.id} task={task} />
                </div>
            </div>
            <div className="task-right-column">
                <div className="right-column-content">
                    <ul>
                        <li data-label="Created On:">{task.created_on}</li>
                        <li data-label="Due Date:">{task.due_date}</li>
                        <li data-label="Assignee:">
                            {users.assignee.last_name},{' '}
                            {users.assignee.first_name}
                        </li>
                        <li data-label="Assigner:">
                            {users.assigner.last_name},{' '}
                            {users.assigner.first_name}
                        </li>
                        <li data-label="Priority Level:">{task.priority}</li>
                        <li data-label="Status:">{task.status}</li>
                    </ul>
                    <div className="task-buttons" key={task.id}>
                        <InProgressButton task={task} />
                        {userData.id === users.assigner.id &&
                            task.status != 'Deleted' &&
                            task.status != 'Completed' && (
                                <button
                                    onClick={handleEditClick}
                                    className="edit-button"
                                >
                                    Edit Task
                                </button>
                            )}
                        <CompletedButton
                            task={task}
                            onComplete={handleCompleteClick}
                        />
                        <DeleteButton task={task} />
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="myModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-2"
                                id="staticBackdropLabel"
                            >
                                Congrats
                            </h1>
                        </div>
                        <div>
                            <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                Here's a JOKE to celebrate a job well done!
                            </h1>
                        </div>
                        <div className="modal-body fs-4">
                            <h1>{joke}</h1>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleNavigateClick}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetTaskDetails
