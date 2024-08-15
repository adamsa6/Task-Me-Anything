import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useListTaskCommentsQuery } from '../app/api'

const ListTaskComments = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useListTaskCommentsQuery(taskId)
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default ListTaskComments
