import { useEffect, useState } from 'react'
import { useListAssignedTasksQuery } from '../app/api'
import '../EditTaskForm.css'

const ListAssignedTasks = ({ isLimited }) => {
    const { data, isLoading } = useListAssignedTasksQuery()
    const [tasksToList, setTasksToList] = useState([])

    useEffect(() => {
        if (data) {
            setTasksToList(isLimited ? data.tasks.slice(0, 5) : data.tasks)
        }
    }, [data, isLimited])

    if (isLoading) return <>Loading...</>

    return (
        <div>
            <h2>Tasks Assigned to Me</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksToList.map((task) => {
                        return (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.due_date}</td>
                                <td>{task.priority}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAssignedTasks
