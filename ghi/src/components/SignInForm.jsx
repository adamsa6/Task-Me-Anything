import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSigninMutation } from '../app/api'
import '../SignInForm.css'

export default function SignInForm() {
    const [signin, signinStatus] = useSigninMutation()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (signinStatus.isSuccess) {
            setError('')
            navigate('/dashboard')
        }
        if (signinStatus.isError) {
            setError('Incorrect username or password')
        }
    }, [signinStatus])

    async function handleFormSubmit(e) {
        e.preventDefault()
        signin({
            username: username,
            password: password,
        })
    }
    return (
        <>
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
            <Link to="/signup">Create An Account</Link>
        </>
    )
}
