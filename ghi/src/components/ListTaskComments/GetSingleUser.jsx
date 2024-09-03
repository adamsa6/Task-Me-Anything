import { useGetSingleUserQuery } from '../../app/api'

const GetSingleUser = ({ comment }) => {
    const userId = comment.user_id
    const { data, isLoading } = useGetSingleUserQuery(userId)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p className="comment-text">{comment.comment}</p>
            <div className="comment-user">
                {data.last_name}, {data.first_name}
            </div>
            <div className="comment-date">{comment.created_on}</div>
        </div>
    )
}

export default GetSingleUser
