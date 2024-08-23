import { useGetTaskUsersQuery, useGetUserQuery } from '../app/api'
import { useNavigate } from 'react-router-dom'
import '../AssigneeTaskRow.css'


const AssigneeTaskRow = ({ task }) => {
    const { data: usersData, isLoading } = useGetTaskUsersQuery(task.id)
    const { data: user, isLoading: userIsLoading } = useGetUserQuery()
    const navigate = useNavigate()

    const handleRowClick = () => {
        navigate(`/tasks/${task.id}`)
    }

    if (isLoading || userIsLoading) {
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
                        {user.id == usersData.assigner.id && (
                            <div className="task-cell">
                                {usersData.assignee.last_name},{' '}
                                {usersData.assignee.first_name}
                            </div>
                        )}
                        {user.id == usersData.assignee.id && (
                            <div className="task-cell">
                                {usersData.assigner.last_name},{' '}
                                {usersData.assigner.first_name}
                            </div>
                        )}
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

export default AssigneeTaskRow
