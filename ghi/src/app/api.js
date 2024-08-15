import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
            }),
            // providesTags: ['User']
        }),
        listAllTasks: builder.query({
            query: () => ({
                url: '/api/tasks',
            }),
        }),
        listAssignedTasks: builder.query({
            query: () => ({
                url: '/api/assigned-tasks/mine',
            }),
        }),
        listMyTasks: builder.query({
            query: () => ({
                url: '/api/tasks/mine',
            }),
        }),
        getTaskDetails: builder.query({
            query: (taskId) => ({
                url: `/api/tasks/${taskId}`,
            }),
        }),
        getJoke: builder.query({
            query: () => ({
                url: '/api/joke',
            }),
        }),
        getQuote: builder.query({
            query: () => ({
                url: '/api/quote',
            }),
        }),
        listTaskComments: builder.query({
            query: (taskId) => ({
                url: `/api/tasks/${taskId}/comments`,
            }),
        }),
        getTaskComment: builder.query({
            query: ({ taskId, commentId }) => ({
                url: `/api/tasks/${taskId}/comments/${commentId}`,
            }),
        }),
        // createTask: builder.mutation({
        //     query: (body) => ({
        //         url: '/api/tasks',
        //         body,
        //         method: 'POST'
        //     }),
        // }),
        // editTask: builder.mutation({
        //     query: (taskId) => ({
        //         url: `/api/tasks/${taskId}`,
        //         body,
        //         method: 'PUT',
        //     }),
        // }),
        // editTask: builder.mutation({
        //     query: (taskId) => ({
        //         url: `/api/tasks/${taskId}`,
        //         body,
        //         method: 'PUT',
        //     }),
        // }),
        // changeTaskStatus: builder.mutation({
        //     query: (taskId) => ({
        //         url: `/api/tasks/${taskId}/status`,
        //         body,
        //         method: 'PATCH',
        //     }),
        // }),
        // createComment: builder.mutation({
        //     query: (taskId) => ({
        //         url: `/api/tasks/${taskId}/status`,
        //         body,
        //         method: 'POST',
        //     }),
        // }),
        // editTaskComment: builder.mutation({
        //     query: ({ taskId, commentId }) => ({
        //         url: `/api/tasks/${taskId}/comments/${comment_id}`,
        //         body,
        //         method: 'PUT',
        //     }),
        // }),
        // deleteTaskComment: builder.mutation({
        //     query: ({ taskId, commentId }) => ({
        //         url: `/api/tasks/${taskId}/comments/${comment_id}`,
        //         method: 'DELETE',
        //     }),
        // }),
    }),
})

export const {
    useGetUserQuery,
    useListAllTasksQuery,
    useListAssignedTasksQuery,
    useListMyTasksQuery,
    useGetTaskDetailsQuery,
    useGetJokeQuery,
    useGetQuoteQuery,
    useListTaskCommentsQuery,
    useGetTaskCommentQuery,
    // useCreateTaskMutation,
    // useEditTaskMutation,
    // useChangeTaskStatusMutation,
    // useCreateCommentMutation,
    // useEditTaskCommentMutation,
    // useDeleteTaskCommentMutation,
} = taskApi
