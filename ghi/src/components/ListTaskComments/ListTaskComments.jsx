import { useParams } from 'react-router-dom'
import { useListTaskCommentsQuery, useGetUserQuery } from '../../app/api'
import GetSingleUser from './GetSingleUser'
import CreateComment from './CreateTaskComment'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'
import './ListTaskComments.css'

const ListTaskComments = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useListTaskCommentsQuery(taskId)
    const { data: user, isLoading: userIsLoading } = useGetUserQuery()

    if (isLoading) return <>Loading...</>

    return (
        <div className="task-comments-container">
            <h1 className="comments-title">Comments</h1>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#add-comment"
                className="add-comment-btn"
            >
                Add Comment
            </button>
            <div>
                <CreateComment />
            </div>
            {data.comments.map((comment) => (
                <div key={comment.id} className="comment-row-wrapper">
                    <div className="comment-details">
                        <GetSingleUser comment={comment} />
                    </div>
                    {user.id === comment.user_id && (
                        <div className="comment-actions">
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#edit-comment"
                                className="edit-comment-btn"
                            >
                                <img
                                    src="/pencil-square.svg"
                                    alt="Edit"
                                    width="24"
                                    height="24"
                                />
                            </button>
                            <EditComment comment={comment} />
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#delete-comment"
                                className="delete-comment-btn"
                            >
                                <img
                                    src="/trash3.svg"
                                    alt="Delete"
                                    width="24"
                                    height="24"
                                />
                            </button>
                            <DeleteComment comment={comment} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ListTaskComments
