import { useEffect } from 'react'
import { useListAssignedTasksQuery } from '../app/api'

const ListAssignedTasks = () => {
    const { data, isLoading } = useListAssignedTasksQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default ListAssignedTasks
