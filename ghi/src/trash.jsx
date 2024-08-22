import { NavLink, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useSignoutMutation } from '../app/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Nav.css' // Import custom CSS for additional styles

const Nav = () => {
    const { data: user } = useGetUserQuery()
    const [signout] = useSignoutMutation()
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
            <div className="container-fluid">
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: '100px', height: 'auto' }}
                />
                <div className="d-flex flex-grow-1">
                    <div className="d-flex flex-grow-1">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {user && (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/dashboard"
                                            className="nav-link btn btn-light"
                                            exact
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/tasks/mine"
                                            className="nav-link btn btn-light"
                                        >
                                            My Tasks
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/assigned-tasks/mine"
                                            className="nav-link btn btn-light"
                                        >
                                            Assigned Tasks
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/tasks"
                                            className="nav-link btn btn-light"
                                        >
                                            All Tasks
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/tasks/create"
                                            className="nav-link btn btn-light"
                                        >
                                            Create Task
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    {user && (
                        <div className="d-flex">
                            <button
                                className="btn signout-button me-2"
                                onClick={() => {
                                    signout()
                                    navigate('/signin')
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav
