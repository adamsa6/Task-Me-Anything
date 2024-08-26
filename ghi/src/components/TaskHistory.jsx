import { useListAllTasksQuery } from '../app/api'
import TaskHistoryRow from './TaskHistoryRow'

const TaskHistory = () => {
    const { data, isLoading } = useListAllTasksQuery()

    if (isLoading) return <>Loading...</>

    return (
        <>
            <div className="container">
                <h1>Task History</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Assignee</th>
                            <th>Assigner</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((task) => {
                            if (
                                task.status != 'active' &&
                                task.status != 'In Progress'
                            ) {
                                return (
                                    <TaskHistoryRow key={task.id} task={task} />
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TaskHistory
