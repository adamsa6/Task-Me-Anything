import { useGetQuoteQuery, useGetUserQuery } from '../app/api'
import ListAssignedTasks from './ListAssignedTasks'
import ListMyTasks from './ListMyTasks'
import '../Dashboard.css'

const Dashboard = () => {
    const { data: quotes, isLoading: quoteIsLoading } = useGetQuoteQuery()
    const { data: user, isLoading: userIsLoading } = useGetUserQuery()

    if (quoteIsLoading || userIsLoading) return <>Loading...</>

    return (
        <>
            <div className="container">
                <h1>Dashboard</h1>
                <div className="welcome-card">
                    <h2>Welcome, {user.first_name}!</h2>
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
                    </div>
                    <div className="tasks-column">
                        <ListAssignedTasks
                            isLimited={true}
                            showControls={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
