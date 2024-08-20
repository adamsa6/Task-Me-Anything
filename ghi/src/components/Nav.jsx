import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useSignoutMutation } from '../app/api'

const Nav = () => {
    const { data: user } = useGetUserQuery()
    const [signout, signoutStatus] = useSignoutMutation()
    const navigate = useNavigate()

    // const handelsignout = ()

    return (
        <nav>
            <div>
                <ul>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ width: '100px', height: '100px' }}
                    />

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
                {user && (
                    <button
                        onClick={() => {
                            signout()
                            navigate('/signin')
                        }}
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Nav
