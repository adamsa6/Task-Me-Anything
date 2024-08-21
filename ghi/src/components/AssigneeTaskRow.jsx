import { useGetTaskUsersQuery } from '../app/api'

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
            <tr>
                <td>{task.title}</td>
                <td>
                    {usersData.assignee.last_name},{' '}
                    {usersData.assignee.first_name}
                </td>
                <td>{task.due_date}</td>
                <td>{task.priority}</td>
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
