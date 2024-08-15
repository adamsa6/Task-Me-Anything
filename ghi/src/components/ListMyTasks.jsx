import { useEffect } from 'react'
import { useListMyTasksQuery } from '../app/api'

const ListMyTasks = () => {
    const { data, isLoading } = useListMyTasksQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default ListMyTasks
