import { useListAllTasksQuery } from '../app/api'
import AssigneeTaskRow from './AssigneeTaskRow'
import { Link } from 'react-router-dom'
import '../ListAllTasks.css'

const ListAllTasks = () => {
    const { data, isLoading } = useListAllTasksQuery()

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
            <h1>ALL TASKS</h1>
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
                    {data.tasks.map((task) => {
                        if (
                            task.status !== 'Completed' &&
                            task.status !== 'Deleted'
                        ) {
                            return <AssigneeTaskRow key={task.id} task={task} />
                        }
                        return null
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAllTasks
