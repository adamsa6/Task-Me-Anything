import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useEditTaskCommentMutation } from '../app/api'

const EditComment = ({comment}) => {
    const { taskId } = useParams()
    const [ editComment, editCommentStatus ] = useEditTaskCommentMutation()
    const [newComment, setNewComment] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
            if (comment) {
                setNewComment(
                    comment.comment
                )
            }
        }, [comment])

    useEffect(() => {
        if (editCommentStatus.isSuccess) {
            setError('')
            setNewComment('')
            navigate(`/tasks/${taskId}`)
        }
        if (editCommentStatus.isError) {
            setError(
                'Could not edit comment.'
            )
        }
    }, [editCommentStatus])

    async function handleFormSubmit(e) {
        e.preventDefault()
        editComment({
            body:{comment: newComment},
            taskId,
            commentId: comment.id
        })
    }

    async function handleNavigateClick() {
        navigate(`/tasks/${taskId}`)
    }

    return(
            <div>{error && <div className="error-message">{error}</div>}
            <div className="modal fade" id="edit-comment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2" id="staticBackdropLabel">Edit Comment</h1>
                        </div>
                        <div className="modal-body fs-4">
                            <form className="task-form" onSubmit={handleFormSubmit}>
                                <textarea
                                    name="comment"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Comment"
                                    required
                                    className="form-textarea"
                                />
                                <button type="submit" data-bs-toggle="modal" data-bs-target="#edit-comment" className="submit-button">
                                    Submit
                                </button>
                            </form>      
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleNavigateClick} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
)}

export default EditComment
