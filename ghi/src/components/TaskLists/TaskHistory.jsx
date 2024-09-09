import { useState } from 'react'
import { useListPastTasksQuery } from '../../app/api'
import TaskHistoryRow from '../TaskRows/TaskHistoryRow'
import './listing.css'

const TaskHistory = () => {
    const { data, isLoading } = useListPastTasksQuery()
    const [searchInput, setSearchInput] = useState('')

    function handleSearchInputChange(e) {
        const search = e.target.value.toLowerCase()
        setSearchInput(search)
    }

    if (isLoading) return <>Loading...</>

    return (
        <>
            <div className="container">
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search here..."
                        onChange={handleSearchInputChange}
                    />
                    <button>Search</button>
                </div>
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
                            if (searchInput == '') {
                                return (
                                    <TaskHistoryRow
                                        key={task.id}
                                        task={task}
                                    />
                                )
                            } else {
                                if (
                                    task.title
                                        .toLowerCase()
                                        .includes(searchInput)
                                ) {
                                    return (
                                        <TaskHistoryRow
                                            key={task.id}
                                            task={task}
                                        />
                                    )
                                } else if (
                                    task.status
                                        .toLowerCase()
                                        .includes(searchInput)
                                ) {
                                    return (
                                        <TaskHistoryRow
                                            key={task.id}
                                            task={task}
                                        />
                                    )
                                }
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TaskHistory
