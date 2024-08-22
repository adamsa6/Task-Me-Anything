import { useGetQuoteQuery } from '../app/api'
import ListAssignedTasks from './ListAssignedTasks'
import ListMyTasks from './ListMyTasks'



const Dashboard = () => {
    const { data: quotes, isLoading: quoteIsLoading } = useGetQuoteQuery()

    if (quoteIsLoading) return <>Loading...</>

    return (
        <>
            <div>
                <h1>Dashboard</h1>
                <h2>Welcome!</h2>
                {quotes.map((quote) => {
                    return (
                        <div key={quote.q}>
                            <p>{quote.q}</p>
                            <p>{quote.a}</p>
                        </div>
                    )
                })}
                <h1>My Top Priority Tasks</h1>
                <div>
                    <ListMyTasks isLimited={true} />
                </div>
                <h1>Top Priority Tasks</h1>
                <div>
                    <ListAssignedTasks isLimited={true} />
                </div>
            </div>
        </>
    )
}

export default Dashboard
