import { useParams } from 'react-router-dom'
import {
    useListTaskCommentsQuery,
    useGetUsersQuery,
} from '../app/api'
import GetSingleUser from './GetSingleUser'

const ListTaskComments = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useListTaskCommentsQuery(taskId)
    const { data: userData, isLoading: userIsLoading } = useGetUsersQuery()

    if (isLoading || userIsLoading) return <>Loading...</>

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
                        return (<GetSingleUser key={comment.id} comment={comment} />)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListTaskComments
