return (
    <tr className="task-row" onClick={handleRowClick}>
        <td colSpan="4">
            <div className="task-row-wrapper">
                <div className="task-cell">{task.title}</div>
                <div className="task-cell">
                    {usersData.assignee.last_name},{' '}
                    {usersData.assignee.first_name}
                </div>
                <div className="task-cell">
                    {usersData.assigner.last_name},{' '}
                    {usersData.assigner.first_name}
                </div>
                <div className="task-cell">{task.status}</div>
            </div>
        </td>
    </tr>
)
