import { useEffect, useState } from 'react'
import { useListPastTasksQuery } from '../../app/api'
import TaskHistoryRow from '../TaskRows/TaskHistoryRow'
import './listing.css'

const TaskHistory = () => {
    const { data, isLoading } = useListPastTasksQuery()
    const [searchInput, setSearchInput] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')
    const [filteredTasks, setFilteredTasks] = useState([])

    function handleSearchInputChange(e) {
        const search = e.target.value.toLowerCase()
        setSearchInput(search)
    }

    useEffect(() => {
        if (data) {
            setFilteredTasks(data.tasks)
            filterItems()
        }
    }, [data, selectedStatus, selectedPriority])

    const filterItems = () => {
        setFilteredTasks(data.tasks)
        if (selectedStatus != '' && selectedPriority != '') {
            let filteredByStatAndPri = data.tasks.filter(
                (task) =>
                    task.status === selectedStatus &&
                    task.priority === parseInt(selectedPriority)
            )
            setFilteredTasks(filteredByStatAndPri)
        } else if (selectedStatus != '' && selectedPriority === '') {
            let filteredByStatus = data.tasks.filter(
                (task) => task.status === selectedStatus
            )
            setFilteredTasks(filteredByStatus)
        } else if (selectedStatus === '' && selectedPriority != '') {
            let filteredByPriority = data.tasks.filter(
                (task) => task.priority === parseInt(selectedPriority)
            )
            setFilteredTasks(filteredByPriority)
        }
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
                <div className="filter filter-container">
                    <p>Filter By:</p>
                    <select
                        name="Status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Status</option>
                        <option key="Completed" value="Completed">
                            Completed
                        </option>
                        <option key="Deleted" value="Deleted">
                            Deleted
                        </option>
                    </select>
                    <select
                        name="Priority"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Priority Level</option>
                        <option key="1" value="1">
                            1: High Priority
                        </option>
                        <option key="2" value="2">
                            2: Medium Priority
                        </option>
                        <option key="3" value="3">
                            3: Low Priority
                        </option>
                    </select>
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
                        {filteredTasks.map((task) => {
                            if (searchInput == '') {
                                return (
                                    <TaskHistoryRow key={task.id} task={task} />
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
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TaskHistory
