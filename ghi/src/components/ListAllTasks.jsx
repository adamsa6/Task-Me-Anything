import { useEffect } from 'react'
import { useListAllTasksQuery, useGetTaskUsersQuery } from '../app/api'
import AllTaskRow from './AllTaskRow'

const ListAllTasks = () => {
    const { data, isLoading } = useListAllTasksQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return (
        <>
            <div>
                <h1>ALL TASKS</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Assignee</th>
                            <th>Due Date</th>
                            <th>Priority Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((task) => {
                            return <AllTaskRow key={task.id} task={task} />
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListAllTasks
