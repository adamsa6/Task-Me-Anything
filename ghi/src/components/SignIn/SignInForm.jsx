import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSigninMutation, useGetUserQuery } from '../../app/api'
import './SignInForm.css'

export default function SignInForm() {
    const [signin, signinStatus] = useSigninMutation()
    const { refetch, data } = useGetUserQuery()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (signinStatus.isSuccess) {
            setError('')
            refetch()
        }
        if (signinStatus.isError) {
            setError('Incorrect username or password')
        }
    }, [signinStatus])

    useEffect(() => {
        if (data) {
            navigate('/dashboard')
        }
    }, [data])

    async function handleFormSubmit(e) {
        e.preventDefault()
        signin({
            username: username,
            password: password,
        })
    }
    return (
        <div className="signin-container">
            <div className="card card-info">
                <h1>Task Me Anything: </h1>
                <h2>Your Task-Taming Sidekick!</h2>
                <p>
                    Say goodbye to task-induced stress and hello to a
                    productivity paradise! Task Me Anything is designed to
                    gently nudge you into a productive flow, sprinkling in
                    delightful serotonin boosts along the way. Each time you log
                    in, you'll be greeted by an inspiring quote to ignite your
                    motivation. Creating and managing tasks (yours or those
                    you've cleverly delegated) is a breeze. And when you mark a
                    task "Completed"? Prepare for a little digital confetti
                    shower – because you deserve it!
                </p>
                <p>
                    Crafted in 2024 by a team of passionate, quick-witted
                    software engineers (each boasting an IQ well above room
                    temperature!), this app aims to be your very cutesy, very
                    mindful, and very demure organized task management
                    companion.
                </p>
                <p>
                    So, whether you're juggling work projects, personal goals,
                    or that ever-growing to-do list, Task Me Anything is here to
                    help you stay on top of it all with a smile
                </p>
            </div>
            <div className="card-form">
                <h1>Sign In</h1>
                {error && <div>{error}</div>}
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                    <button type="submit">Sign In</button>
                </form>
                <Link to="/signup">Dont have an Account? SignUp</Link>
            </div>
        </div>
    )
}
