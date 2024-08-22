import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTaskMutation, useGetUsersQuery } from '../app/api'

export default function CreateTaskForm() {
    const [createTask, createTaskStatus] = useCreateTaskMutation()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assigneeId, setAssigneeId] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState('')

    const { data, isLoading } = useGetUsersQuery()

    useEffect(() => {
        if (createTaskStatus.isSuccess) {
            setError('')
            navigate('/dashboard')
        }
        if (createTaskStatus.isError) {
            setError('Could not create task. Please check that all fields are filled correctly.')
        }
    }, [createTaskStatus])

    async function handleFormSubmit(e) {
        e.preventDefault()
        createTask({
            "title": title,
            "description": description,
            "due_date": dueDate,
            "priority": priority,
            "assignee_id": assigneeId
        })
    }

    if (isLoading) return <>Loading...</>

    return (
        <>
            <h1>Create a Task</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Due Date"
                    required
                />
                <select
                    type="text"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder="Priority Level"
                    required
                >
                    <option value="">Choose a Priority level</option>
                    <option value="1">1: High Priority</option>
                    <option value="2">2: Medium Priority</option>
                    <option value="3">3: Low Priority</option>
                </select>
                <select
                    type="text"
                    name="assignee"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                    placeholder="Assignee"
                    required
                >
                    <option value="">Choose an assignee</option>
                    {data.users.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.last_name}, {user.first_name}
                            </option>
                        )
                    })}
                </select>
                <button type="submit">Create Task</button>
            </form>
        </>
    )
}
