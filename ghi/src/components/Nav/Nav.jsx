import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useSignoutMutation } from '../../app/api'
import './Nav.css'

const Nav = () => {
    const { data: user } = useGetUserQuery()
    const [signout, signoutStatus] = useSignoutMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (signoutStatus.isSuccess) {
            navigate('/signin')
        }
    }, [signoutStatus])

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
            <div className="container-fluid">
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: '100px', height: 'auto' }}
                />
                {user && (
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                )}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/dashboard"
                                        className="nav-link btn btn-light"
                                        end
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/tasks/mine"
                                        className="nav-link btn btn-light"
                                    >
                                        My Created Tasks
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/assigned-tasks/mine"
                                        className="nav-link btn btn-light"
                                    >
                                        My Assigned Tasks
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/tasks"
                                        className="nav-link btn btn-light"
                                        end
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
                                <li className="nav-item">
                                    <NavLink
                                        to="/tasks/history"
                                        className="nav-link btn btn-light"
                                    >
                                        Task History
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {user && (
                        <div className="d-flex">
                            <button
                                className="btn signout-button me-2"
                                onClick={signout}
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
