import { useGetTaskUsersQuery } from '../app/api';
import React, { useEffect, useState } from 'react'


const AllTaskUsers = (props) => {
    const { data, isLoading } = useGetTaskUsersQuery(task.id)

    if (isLoading) return <td>Loading...</td>

    if (data) {
        return <td> {data.assignee_first} {data.assignee.last_name}</td>
    }

    return <td>No Assignee</td>
}

export default AllTaskUsers
