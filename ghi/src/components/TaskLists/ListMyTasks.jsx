import { useEffect, useState } from 'react'
import { useListMyTasksQuery } from '../../app/api'
import AssigneeTaskRow from '../TaskRows/AssigneeTaskRow'
import './listing.css'

const ListMyTasks = ({ isLimited, showControls = true }) => {
    const { data, isLoading } = useListMyTasksQuery()
    const [tasksToList, setTasksToList] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (data) {
            setTasksToList(isLimited ? data.tasks.slice(0, 5) : data.tasks)
        }
    }, [data, isLimited])

    function handleSearchInputChange(e) {
        const search = e.target.value.toLowerCase()
        setSearchInput(search)
    }

    if (isLoading) return <>Loading...</>

    return (
        <div className="container">
            {showControls && (
                <>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="Search here..."
                            onChange={handleSearchInputChange}
                        />
                        <button>Search</button>
                    </div>
                </>
            )}
            <h1>Tasks I Have Created</h1>
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
                    {tasksToList.map((task) => {
                        if (searchInput == '') {
                            return <AssigneeTaskRow key={task.id} task={task} />
                        } else {
                            if (
                                task.title.toLowerCase().includes(searchInput)
                            ) {
                                return (
                                    <AssigneeTaskRow
                                        key={task.id}
                                        task={task}
                                    />
                                )
                            } else if (
                                task.status.toLowerCase().includes(searchInput)
                            ) {
                                return (
                                    <AssigneeTaskRow
                                        key={task.id}
                                        task={task}
                                    />
                                )
                            }
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListMyTasks