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
            providesTags: ['User'],
        }),
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}`,
            }),
        }),
        listAllTasks: builder.query({
            query: () => ({
                url: '/api/tasks',
            }),
            providesTags: ['Tasks', 'Task'],
        }),
        listAssignedTasks: builder.query({
            query: () => ({
                url: '/api/assigned-tasks/mine',
            }),
            providesTags: ['Tasks', 'Task'],
        }),
        listMyTasks: builder.query({
            query: () => ({
                url: '/api/tasks/mine',
            }),
            providesTags: ['Tasks', 'Task'],
        }),
        getTaskDetails: builder.query({
            query: (taskId) => ({
                url: `/api/tasks/${taskId}`,
            }),
            providesTags: ['Task'],
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
            providesTags: ['Comments']
        }),
        getTaskComment: builder.query({
            query: ({ taskId, commentId }) => ({
                url: `/api/tasks/${taskId}/comments/${commentId}`,
            }),
        }),
        getTaskUsers: builder.query({
            query: (taskId) => ({
                url: `/api/tasks/${taskId}/users`,
            }),
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE',
            }),
            invalidatesTags: ['User', 'Tasks'],
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signup',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signin',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        createTask: builder.mutation({
            query: (body) => ({
                url: '/api/tasks',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['Tasks'],
        }),
        getUsers: builder.query({
            query: () => ({
                url: 'api/users',
            }),
        }),
        editTask: builder.mutation({
            query: ({ body, taskId }) => ({
                url: `/api/tasks/${taskId}`,
                body,
                method: 'PUT',
            }),
            invalidatesTags: ['Task'],
        }),
        changeTaskStatus: builder.mutation({
            query: ({ body, taskId }) => ({
                url: `/api/tasks/${taskId}/status`,
                body,
                method: 'PATCH',
            }),
            invalidatesTags: ['Task'],
        }),
        createComment: builder.mutation({
            query: ({body, taskId}) => ({
                url: `/api/tasks/${taskId}/status`,
                body,
                method: 'POST',
            }),
            invalidatesTags: ['Comments']
        }),
        // editTaskComment: builder.mutation({
        //     query: ({ body, taskId, commentId }) => ({
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
    useGetSingleUserQuery,
    useGetTaskUsersQuery,
    useGetUsersQuery,
    useListAllTasksQuery,
    useListAssignedTasksQuery,
    useListMyTasksQuery,
    useGetTaskDetailsQuery,
    useGetJokeQuery,
    useGetQuoteQuery,
    useListTaskCommentsQuery,
    useGetTaskCommentQuery,
    useSignoutMutation,
    useSignupMutation,
    useSigninMutation,
    useCreateTaskMutation,
    useEditTaskMutation,
    useChangeTaskStatusMutation,
    // useCreateCommentMutation,
    // useEditTaskCommentMutation,
    // useDeleteTaskCommentMutation,
} = taskApi
