import { useEffect, useState } from 'react'
import { useLazyGetQuoteQuery, useGetUserQuery } from '../../app/api'
import { Link, useNavigate } from 'react-router-dom'
import ListAssignedTasks from '../TaskLists/ListAssignedTasks'
import ListMyTasks from '../TaskLists/ListMyTasks'
import './Dashboard.css'

const Dashboard = () => {
    const [getQuotesTrigger, quotesResults] = useLazyGetQuoteQuery()
    const { data: user, isLoading: userIsLoading } = useGetUserQuery()
    const [quotes, setQuotes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/signin')
        } else if (user && !userIsLoading) {
            getQuotesTrigger()
        }
    }, [user])

    useEffect(() => {
        if (quotesResults.isSuccess) {
            setQuotes(quotesResults.data)
        }
    }, [quotesResults])

    if (userIsLoading) return <>Loading...</>

    return (
        <>
            <div className="container">
                <h1>Dashboard</h1>
                <div className="welcome-card">
                    <h2>Welcome, {user?.first_name}!</h2>
                    {quotes.map((quote) => {
                        return (
                            <div key={quote.q} className="quote">
                                <p>"{quote.q}"</p>
                                <p>-{quote.a}</p>
                            </div>
                        )
                    })}
                </div>
                <h1>My Top Priority Tasks</h1>
                <div className="tasks-container">
                    <div className="tasks-column">
                        <ListMyTasks isLimited={true} showControls={false} />
                        <Link to="/tasks/mine" className="link-button">
                            <button>View All My Created Tasks</button>
                        </Link>
                    </div>
                    <div className="tasks-column">
                        <ListAssignedTasks
                            isLimited={true}
                            showControls={false}
                        />
                        <Link to="/assigned-tasks/mine" className="link-button">
                            <button>View All My Assigned Tasks</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
