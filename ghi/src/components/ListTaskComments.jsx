import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useListTaskCommentsQuery, useGetUserQuery } from '../app/api'
import GetSingleUser from './GetSingleUser'
import CreateComment from './CreateTaskComment'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'

const ListTaskComments = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useListTaskCommentsQuery(taskId)
    const { data: user, isLoading: userIsLoading } = useGetUserQuery()
    if (isLoading) return <>Loading...</>

    return (
        <div>
            <h1>Comments</h1>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#add-comment"
            >
                Add Comment
            </button>
            <div>
                <CreateComment />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>User</th>
                        <th>Created On</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.comments.map((comment) => {
                        return (
                            <tr key={comment.id}>
                                <GetSingleUser comment={comment} />
                                {user.id == comment.user_id && (
                                    <td>
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit-comment"
                                        >
                                            Edit
                                        </button>
                                        <div>
                                            <EditComment comment={comment} />
                                        </div>
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#delete-comment"
                                        >
                                            Delete
                                        </button>
                                        <div>
                                            <DeleteComment comment={comment} />
                                        </div>
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListTaskComments
