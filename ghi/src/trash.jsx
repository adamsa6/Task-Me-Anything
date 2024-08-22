import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useEditTaskMutation,
    useGetUsersQuery,
    useGetTaskDetailsQuery,
} from '../app/api'
import './EditTaskForm.css'

export default function EditTaskForm() {
    const { taskId } = useParams()
    const [editTask, editTaskStatus] = useEditTaskMutation()
    const { data, isLoading } = useGetUsersQuery()
    const { data: task, isLoading: taskIsLoading } =
        useGetTaskDetailsQuery(taskId)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        assignee_id: '',
        priority: '',
    })

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                due_date: task.due_date || '',
                assignee_id: task.assignee_id || '',
                priority: task.priority || '',
            })
        }
    }, [task])

    useEffect(() => {
        if (editTaskStatus.isSuccess) {
            setError('')
            navigate(`/tasks/${taskId}`)
        }
        if (editTaskStatus.isError) {
            setError(
                'Could not edit task. Please check that all fields are filled correctly.'
            )
        }
    }, [editTaskStatus])

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        editTask({ body: formData, taskId })
    }

    if (isLoading || taskIsLoading) return <>Loading...</>

    return (
        <div className="form-container">
            <h1>Edit Task</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="task-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Task Title"
                    required
                    className="form-input"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Task Description"
                    required
                    className="form-textarea"
                />
                <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleFormChange}
                    placeholder="Due Date"
                    required
                    className="form-input"
                />
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
                    required
                    className="form-select"
                >
                    <option value="">Choose a Priority level</option>
                    <option value="1">1: High Priority</option>
                    <option value="2">2: Medium Priority</option>
                    <option value="3">3: Low Priority</option>
                </select>
                <select
                    name="assignee_id"
                    value={formData.assignee_id}
                    onChange={handleFormChange}
                    required
                    className="form-select"
                >
                    <option value="">Choose an assignee</option>
                    {data.users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.last_name}, {user.first_name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="submit-button">
                    Update
                </button>
            </form>
        </div>
    )
}
