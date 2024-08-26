import { useEffect, useState } from 'react'
import { useListAssignedTasksQuery } from '../app/api'
import AssignerTaskRow from './AssignerTaskRow'
import { Link } from 'react-router-dom'
import '../ListMyTasks.css'

const ListAssignedTasks = ({ isLimited, showControls = true }) => {
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
            {showControls && (
                <>
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
                </>
            )}
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
                        return <AssignerTaskRow key={task.id} task={task} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAssignedTasks
