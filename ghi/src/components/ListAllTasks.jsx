import { useEffect } from 'react'
import { useListAllTasksQuery } from '../app/api'

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
                            return (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.assignee_id.first_name}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.priority}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListAllTasks
