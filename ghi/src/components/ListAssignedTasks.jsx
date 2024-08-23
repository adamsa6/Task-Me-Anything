import { useEffect, useState } from 'react'
import { useListAssignedTasksQuery } from '../app/api'
import { useNavigate } from 'react-router-dom'
import '../ListAssignedTasks.css'

const ListAssignedTasks = ({ isLimited }) => {
    const { data, isLoading } = useListAssignedTasksQuery()
    const [tasksToList, setTasksToList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            setTasksToList(isLimited ? data.tasks.slice(0, 5) : data.tasks)
        }
    }, [data, isLimited])

    const handleRowClick = () => {
        navigate(`/tasks/history`)
    }

    if (isLoading) return <>Loading...</>

    return (
        <div className="container">
            <h1>Tasks Assigned to Me</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksToList.map((task) => (
                        <tr
                            key={task.id}
                            className="task-row"
                            onClick={handleRowClick}
                        >
                            <td colSpan="3">
                                <div className="task-row-wrapper">
                                    <div className="task-cell">
                                        {task.title}
                                    </div>
                                    <div className="task-cell">
                                        {task.due_date}
                                    </div>
                                    <div className="task-cell">
                                        {task.priority}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListAssignedTasks
