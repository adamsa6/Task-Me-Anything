import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    useListTaskCommentsQuery,
    useGetUsersQuery,
    useGetUserQuery,
} from '../app/api'

const ListTaskComments = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useListTaskCommentsQuery(taskId)
    //const { data: signedInUser, isLoading: signedInUserIsLoading } = useGetUserQuery()
    const { data: userData, isLoading: userIsLoading } = useGetUsersQuery()
    console.log(userData)
    //console.log(signedInUser)

    if (isLoading || userIsLoading) return <>Loading...</>

    // a dictionary that has one key
    // the key's value is a list of comments
    // each comment has a user_id associated with it
    // we want the names associated with each user id
    // we have a list of ALL users.....that contains first and last name


    return (
        <div>
            <h1>Comments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>User</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {data.comments.map((comment) => {
                       
                        return (
                            <tr>
                                <td>{comment.comment}</td>

                                <td>{comment.user_id}</td>
                                <td>{comment.created_on}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListTaskComments
