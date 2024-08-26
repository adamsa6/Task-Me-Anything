import { useGetSingleUserQuery } from '../app/api'


const GetSingleUser = ({ comment }) => {
    const userId = comment.user_id
    const { data, isLoading } = useGetSingleUserQuery(userId)

    if (isLoading) {
        return (
            <tr>
                <td>Loading...</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{comment.comment}</td>
            <td>{data.last_name}, {data.first_name}</td>
            <td>{comment.created_on}</td>
        </tr>
    )
}

export default GetSingleUser
