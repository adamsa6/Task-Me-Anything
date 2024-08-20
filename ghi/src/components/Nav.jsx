import { Link, NavLink } from 'react-router-dom'
import { useGetUserQuery } from '../app/api'

const Nav = () => {
    const { data: user } = useGetUserQuery()
    return (
        <nav>
            <div>
                <ul>
                    <li>Logo</li>
                    {user && (
                        <li>
                            <NavLink to={'/dashboard'}>
                                <button>Dashboard</button>
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink to={'/tasks/mine'}>
                                <button>My Tasks</button>
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink to={'/assigned-tasks/mine'}>
                                <button>Assigned Tasks</button>
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink to={'/tasks'}>
                                <button>All Tasks</button>
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink to={'/'}>
                                <button>Create Task</button>
                            </NavLink>
                        </li>
                    )}
                </ul>
                {user && <button>Log Out</button>}
            </div>
        </nav>
    )
}

export default Nav
