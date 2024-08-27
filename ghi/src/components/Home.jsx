import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/api'

function Home() {
    const navigate = useNavigate()
    const {data: user, isLoading: userIsLoading} = useGetUserQuery()

    useEffect(() => {
        if (user === undefined) return
        if (user === null) {
            navigate('/signin')
        } else {
            navigate('/dashboard')
        } 
    }, [user])

    if (userIsLoading) return <div>Loading...</div>

    return null
}

export default Home
