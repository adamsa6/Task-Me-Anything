import { useEffect } from 'react'
import { useGetJokeQuery } from '../app/api'

const GetJoke = () => {
    const { data, isLoading } = useGetJokeQuery()
    console.log(data, isLoading)

    if (isLoading) return <>Loading...</>

    return <>hi</>
}

export default GetJoke
