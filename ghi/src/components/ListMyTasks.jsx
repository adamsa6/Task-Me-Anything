import { useEffect, useState } from 'react'
import { useListMyTasksQuery } from '../app/api'
import AssigneeTaskRow from './AssigneeTaskRow'
import { Link } from 'react-router-dom'
import '../ListMyTasks.css'

const ListMyTasks = ({ isLimited }) => {
    const { data, isLoading } = useListMyTasksQuery()
    const [tasksToList, setTasksToList] = useState([])

    useEffect(() => {
        if (data) {
            setTasksToList(isLimited ? data.tasks.slice(0, 5) : data.tasks)
        }
    }, [data, isLimited])

    if (isLoading) return <>Loading...</>

    return (
        <div className="container">
            <div className="buttons-container">
                <button>Filter By</button>
                <Link to="/tasks/history" className="link-button">
                    <button>Task History</button>
                </Link>
            </div>
            <div className="search-bar-container">
                <input type="text" placeholder="Search here..." />
                <button>Search</button>
            </div>
            <h1>Tasks I Have Created</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Assignee</th>
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

export default ListMyTasks
