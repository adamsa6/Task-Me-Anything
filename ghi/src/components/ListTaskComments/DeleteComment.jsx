import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDeleteTaskCommentMutation } from '../../app/api'

const DeleteComment = ({ comment }) => {
    const { taskId } = useParams()
    const [deleteComment, deleteCommentStatus] = useDeleteTaskCommentMutation()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
        if (deleteCommentStatus.isSuccess) {
            setError('')
            navigate(`/tasks/${taskId}`)
        }
        if (deleteCommentStatus.isError) {
            setError('Could not delete comment.')
        }
    }, [deleteCommentStatus])

    async function handleDelete() {
        deleteComment({
            taskId,
            commentId: comment.id,
        })
    }
    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <div
                className="modal fade"
                id="delete-comment"
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
                                Delete Comment
                            </h1>
                        </div>
                        <div className="modal-body fs-3">
                            <h1
                                className="modal-title fs-3"
                                id="staticBackdropLabel"
                            >
                                Are you sure you want to delete?
                            </h1>
                        </div>
                        <div className="modal-body fs-4">
                            <button
                                onClick={handleDelete}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#delete-comment"
                                className="delete-button btn btn-secondary"
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#delete-comment"
                                className="delete-button btn btn-secondary"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteComment
