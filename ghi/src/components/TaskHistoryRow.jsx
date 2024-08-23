import { useNavigate } from 'react-router-dom'
import { useGetTaskUsersQuery } from '../app/api'

const TaskHistoryRow = ({ task }) => {
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
            <tr onClick={handleRowClick}>
                <td>{task.title}</td>
                <td>
                    {usersData.assignee.last_name},{' '}
                    {usersData.assignee.first_name}
                </td>
                <td>
                    {usersData.assigner.last_name},{' '}
                    {usersData.assigner.first_name}
                </td>
                <td>{task.status}</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>No assignee</td>
        </tr>
    )
}

export default TaskHistoryRow
