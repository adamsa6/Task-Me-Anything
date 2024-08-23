import { useGetTaskUsersQuery } from '../app/api'
import { Link } from 'react-router-dom'
import '../AssigneeTaskRow.css'

const AssigneeTaskRow = ({ task }) => {
    const { data: usersData, isLoading } = useGetTaskUsersQuery(task.id)

    if (isLoading) {
        return (
            <tr>
                <td>Loading...</td>
            </tr>
        )
    }

    if ({ usersData }) {
        return (
            <tr className="task-row">
                <Link to="/tasks/history" className="row-link">
                    <td>{task.title}</td>
                    <td>
                        {usersData.assignee.last_name},{' '}
                        {usersData.assignee.first_name}
                    </td>
                    <td>{task.due_date}</td>
                    <td>{task.priority}</td>
                </Link>
            </tr>
        )
    }

    return (
        <tr>
            <td>No assignee</td>
        </tr>
    )
}

export default AssigneeTaskRow
