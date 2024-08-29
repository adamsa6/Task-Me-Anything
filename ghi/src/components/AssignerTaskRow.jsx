import { useGetTaskUsersQuery } from '../app/api'
import { useNavigate } from 'react-router-dom'
import '../AssigneeTaskRow.css'

const AssignerTaskRow = ({ task }) => {
    const { data: usersData, isLoading } = useGetTaskUsersQuery(task.id)
    const navigate = useNavigate()

    const handleRowClick = () => {
        navigate(`/tasks/${task.id}`)
    }

    if (isLoading) {
        return (
            <tr>
                <td>Loading...</td>
            </tr>
        )
    }

    if ({ usersData }) {
        return (
            <tr className="task-row" onClick={handleRowClick}>
                <td colSpan="4">
                    <div className="task-row-wrapper">
                        <div className="task-cell">{task.title}</div>
                        <div className="task-cell">
                            {usersData.assigner.last_name},{' '}
                            {usersData.assigner.first_name}
                        </div>
                        <div className="task-cell">{task.due_date}</div>
                        <div className="task-cell">{task.priority}</div>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>No assignee</td>
        </tr>
    )
}

export default AssignerTaskRow
