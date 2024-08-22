import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../app/api'
import './SignUpForm.css'

export default function SignUpForm() {
    const [signup, signupStatus] = useSignupMutation()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (signupStatus.isSuccess) {
            setError('')
            navigate('/dashboard')
        }
        if (signupStatus.isError) {
            setError('Username or email already exists')
        }
    }, [signupStatus])

    async function handleFormSubmit(e) {
        e.preventDefault()
        signup({
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password,
        })
    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="sign-up-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">
                    Sign Up
                </button>
            </form>
        </div>
    )
}
