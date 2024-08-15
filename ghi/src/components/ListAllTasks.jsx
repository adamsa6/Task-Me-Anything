import { useEffect } from 'react';
import { useListAllTasksQuery } from '../app/api';

const ListAllTasks = () => {
    const { data, isLoading } = useListAllTasksQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default ListAllTasks
