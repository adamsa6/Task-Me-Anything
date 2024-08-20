import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../app/api'



export default function SignUpForm() {
    const [ signup, signupStatus ] = useSignupMutation()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    console.log("****************", signupStatus)
    useEffect(() => {
        if (signupStatus.isSuccess) {
            setError('')
            navigate('/dashboard')
        }
        if (signupStatus.isError) {
            setError('username or email already exists')
        }
    }, [signupStatus])

    async function handleFormSubmit(e) {

        e.preventDefault()
        signup({
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "username": username,
            "password": password
        })
    }
    return (
        <>
            <h1>Sign Up</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />

                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />

                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />

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
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}
