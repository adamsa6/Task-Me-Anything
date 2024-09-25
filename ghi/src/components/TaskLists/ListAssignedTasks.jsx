import { useEffect, useState } from 'react'
import { useListAssignedTasksQuery } from '../../app/api'
import AssignerTaskRow from '../TaskRows/AssignerTaskRow'
import './listing.css'

const ListAssignedTasks = ({ isLimited, showControls = true }) => {
    const { data, isLoading } = useListAssignedTasksQuery()
    const [tasksToList, setTasksToList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')

    useEffect(() => {
        if (data) {
            setTasksToList(isLimited ? data.tasks.slice(0, 5) : data.tasks)
            if (!isLimited) {
                filterItems()
            }
        }
    }, [data, isLimited, selectedStatus, selectedPriority])

    function handleSearchInputChange(e) {
        const search = e.target.value.toLowerCase()
        setSearchInput(search)
    }

    const filterItems = () => {
        setTasksToList(data.tasks)
        if (selectedStatus != '' && selectedPriority != '') {
            let filteredByStatAndPri = data.tasks.filter(
                (task) =>
                    task.status === selectedStatus &&
                    task.priority === parseInt(selectedPriority)
            )
            setTasksToList(filteredByStatAndPri)
        } else if (selectedStatus != '' && selectedPriority === '') {
            let filteredByStatus = data.tasks.filter(
                (task) => task.status === selectedStatus
            )
            setTasksToList(filteredByStatus)
        } else if (selectedStatus === '' && selectedPriority != '') {
            let filteredByPriority = data.tasks.filter(
                (task) => task.priority === parseInt(selectedPriority)
            )
            setTasksToList(filteredByPriority)
        }
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
                    <div className="filter filter-container">
                        <p>Filter By:</p>
                        <select
                            name="Status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Status</option>
                            <option key="Active" value="Active">
                                Active
                            </option>
                            <option key="In Progress" value="In Progress">
                                In Progress
                            </option>
                        </select>
                        <select
                            name="Priority"
                            value={selectedPriority}
                            onChange={(e) =>
                                setSelectedPriority(e.target.value)
                            }
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
                </>
            )}
            <h1>Tasks Assigned to Me</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Assigner</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksToList.map((task) => {
                        if (searchInput == '') {
                            return <AssignerTaskRow key={task.id} task={task} />
                        } else {
                            if (
                                task.title.toLowerCase().includes(searchInput)
                            ) {
                                return (
                                    <AssignerTaskRow
                                        key={task.id}
                                        task={task}
                                    />
                                )
                            } else if (
                                task.status.toLowerCase().includes(searchInput)
                            ) {
                                return (
                                    <AssignerTaskRow
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

export default ListAssignedTasks
