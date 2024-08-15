import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTaskCommentQuery } from '../app/api'

const GetTaskComment = () => {
    const { taskId, commentId } = useParams()
    const { data, isLoading } = useGetTaskCommentQuery({taskId, commentId})
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default GetTaskComment
