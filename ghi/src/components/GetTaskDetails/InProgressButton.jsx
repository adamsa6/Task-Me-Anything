import { useChangeTaskStatusMutation, useGetUserQuery } from '../../app/api'

export default function InProgressButton({ task }) {
    const { data: userData, isLoading: userDataIsLoading } = useGetUserQuery()
    const [status, statusStatus] = useChangeTaskStatusMutation()

    async function handleStatusChange() {
        status({
            body: { status: 'In Progress' },
            taskId: task.id,
        })
    }
    if (task.status != 'In Progress') {
        if (
            task.assignee_id == userData.id ||
            task.assigner_id == userData.id
        ) {
            if (task.status == 'Deleted' && userData.id != task.assigner_id) {
                return
            }
            return (
                <button
                    className="in-progress-button"
                    onClick={handleStatusChange}
                >
                    In Progress
                </button>
            )
        }
    }
}
