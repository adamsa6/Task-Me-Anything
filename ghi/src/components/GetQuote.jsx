import { useEffect } from 'react'
import { useGetQuoteQuery } from '../app/api'

const GetQuote = () => {
    const { data, isLoading } = useGetQuoteQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default GetQuote
