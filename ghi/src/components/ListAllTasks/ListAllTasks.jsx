import { useState } from 'react'
import { useListAllTasksQuery } from '../../app/api'
import AllTaskRow from '../TaskRows/AllTaskRow'
// import './ListAllTasks.css'
import '../listing.css'

const ListAllTasks = () => {
    const { data, isLoading } = useListAllTasksQuery()
    const [searchInput, setSearchInput] = useState('')

    function handleSearchInputChange(e) {
        const search = e.target.value.toLowerCase()
        setSearchInput(search)
    }

    if (isLoading) return <>Loading...</>

    return (
        <div className="container">
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search here..."
                    onChange={handleSearchInputChange}
                />
                <button>Search</button>
            </div>
            <h1>All Tasks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Assignee</th>
                        <th>Assigner</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {data.tasks.map((task) => {
                        if (
                            task.status !== 'Completed' &&
                            task.status !== 'Deleted'
                        ) {
                            if (searchInput == '') {
                                return <AllTaskRow key={task.id} task={task} />
                            } else {
                                if (
                                    task.title
                                        .toLowerCase()
                                        .includes(searchInput)
                                ) {
                                    return (
                                        <AllTaskRow key={task.id} task={task} />
                                    )
                                }
                            }
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAllTasks
