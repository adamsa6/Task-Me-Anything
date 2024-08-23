import { useChangeTaskStatusMutation, useGetUserQuery} from '../app/api'


export default function CompletedButton({task}) {
    const { data: userData, isLoading: userDataIsLoading} = useGetUserQuery()
    const [ status, statusStatus ] = useChangeTaskStatusMutation()

    async function handleStatusChange() {
        status({
            body: {status: "Completed"},
            taskId:task.id}
        )
    }
    if (task.status != "Completed" && task.status != "Deleted"){
        if (task.assignee_id == userData.id || task.assigner_id == userData.id) {
            return (<button onClick={handleStatusChange}type="button" data-bs-toggle="modal" data-bs-target="#myModal">Complete</button>)
        }
        return
    }
}
