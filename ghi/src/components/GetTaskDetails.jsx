import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTaskDetailsQuery } from '../app/api'

const GetTaskDetails = () => {
    const { taskId } = useParams()
    const { data, isLoading } = useGetTaskDetailsQuery(taskId)
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default GetTaskDetails
