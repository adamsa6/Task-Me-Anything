import { useChangeTaskStatusMutation, useGetUserQuery } from '../../app/api'

export default function DeleteButton({ task }) {
    const { data: userData } = useGetUserQuery()
    const [status] = useChangeTaskStatusMutation()

    async function handleStatusChange() {
        status({
            body: { status: 'Deleted' },
            taskId: task.id,
        })
    }
    if (task.status != 'Deleted' && task.status != 'Completed') {
        if (task.assigner_id != userData.id) {
            return
        }
        return (
            <button className="delete-button" onClick={handleStatusChange}>
                Delete
            </button>
        )
    }
}
