import { useListAllTasksQuery } from '../app/api'
import AssigneeTaskRow from './AssigneeTaskRow'

const ListAllTasks = () => {
    const { data, isLoading } = useListAllTasksQuery()

    if (isLoading) return <>Loading...</>

    return (
        <div>
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
                        if ((task.status != 'Completed') && (task.status != 'Deleted')) {
                            return (
                                <AssigneeTaskRow key={task.id} task={task}/>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAllTasks
