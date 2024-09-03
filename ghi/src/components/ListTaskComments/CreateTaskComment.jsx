import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCreateCommentMutation } from '../../app/api'

const CreateComment = () => {
    const { taskId } = useParams()
    const [ createComment, createCommentStatus ] = useCreateCommentMutation()
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
        if (createCommentStatus.isSuccess) {
            setError('')
            setComment('')
            navigate(`/tasks/${taskId}`)
        }
        if (createCommentStatus.isError) {
            setError(
                'Could not create comment.'
            )
        }
    }, [createCommentStatus])

    async function handleFormSubmit(e) {
        e.preventDefault()
        createComment({
            body:{comment: comment},
            taskId
        })
    }

    async function handleNavigateClick() {
        navigate(`/tasks/${taskId}`)
    }

    return(
            <div>{error && <div className="error-message">{error}</div>}
            <div className="modal fade" id="add-comment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2" id="staticBackdropLabel">Add a Comment</h1>
                        </div>
                        <div className="modal-body fs-4">
                            <form className="task-form" onSubmit={handleFormSubmit}>
                                <textarea
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Comment"
                                    required
                                    className="form-textarea"
                                />
                                <button type="submit" data-bs-toggle="modal" data-bs-target="#add-comment" className="submit-button">
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

export default CreateComment
