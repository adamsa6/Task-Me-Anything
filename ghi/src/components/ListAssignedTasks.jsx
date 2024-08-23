import { useEffect, useState } from 'react'
import { useListAssignedTasksQuery } from '../app/api'
import AssigneeTaskRow from './AssigneeTaskRow'
import '../ListMyTasks.css'


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
        <div className="container">
            <h1>Tasks Assigned to Me</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Assigner</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksToList.map((task) => {
                        return <AssigneeTaskRow key={task.id} task={task} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAssignedTasks
