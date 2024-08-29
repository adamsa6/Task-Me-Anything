# APIs

- This project uses FastAPi on the backend, and a PostgreSQL database. User must be signed in as all routes (except sign in page) are authenticated.

## Tasks

|    Action           | Method | URL                                   |
|---------------------|--------|---------------------------------------|
| List All Tasks      | GET    | <<Host URL>>/api/tasks                |
| List My Tasks       | GET    | <<Host URL>>/api/tasks/mine           |
| List Assigned Tasks | GET    | <<Host URL>>/api/assigned-tasks/mine  |
| Create a Task       | POST   | <<Host URL>>/api/tasks                |
| Get Task Details    | GET    | <<Host URL>>/api/tasks/:taskId        |
| Edit a Task         | PUT    | <<Host URL>>/api/tasks/:taskId        |
| Change Task Status  | PATCH  | <<Host URL>>/api/tasks/:taskId/status |

### List All Tasks, List My Tasks, and List Assigned Tasks

- Returns an object with one key ("tasks"), whose value is a list of objects. Each object will be a task.=
    - List All Tasks: returns all tasks that have been created, no matter the user or the task status
    - List My Tasks: returns only tasks that the logged in user has created (meaning the assigner_id == the user id), and only those that have a status of "Active" or "In Progress"
    - List Assigned Tasks: returns only tasks that the logged in user has been assigned (meaning that the assignee_id == the user id), and only those that have a status of "Active" or "In Progress"
```
{
  "tasks": [
    {
      "id": database id for the task (number),
      "title": task title (string),
      "description": task description (string),
      "created_on": timestamp of task creation (datetime),
      "due_date": task due date (string),
      "priority": task priority level (int),
      "status": task status (string),
      "assigner_id": database id for the user assigning the task (number),
      "assignee_id": 2
    },
    ...
  ]
}
```

### Create Task

- Returns




## Comments

|    Action          | Method | URL                                                |
|--------------------|--------|----------------------------------------------------|
| Create Comment     | POST   | <<Host URL>>/api/tasks/:taskId/comments            |
| Get a Comment      | GET    | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| Edit a Comment     | PUT    | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| Delete a Comment   | DELETE | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| List Task Comments | GET    | <<Host URL>>/api/tasks/:taskId/comments            |



## Authentication and Users

|    Action       | Method | URL                                  |
|-----------------|--------|--------------------------------------|
| Sign up         | POST   | <<Host URL>>/api/auth/signup         |
| Signin          | POST   | <<Host URL>>/api/auth/signin         |
| Authenticate    | GET    | <<Host URL>>/api/auth/authenticate   |
| Signout         | DELETE | <<Host URL>>/api/auth/signout        |
| Get Task Users  | GET    | <<Host URL>>/api/tasks/:taskId/users |
| Get Users       | GET    | <<Host URL>>/api/users               |
| Get Single User | GET    | <<Host URL>>/api/users/userId        |




## Endpoints to access Third Part APIs

|    Action       | Method | URL                    |
|-----------------|--------|------------------------|
| Get Joke        | GET    | <<Host URL>>/api/joke  |
| Get Quote       | GET    | <<Host URL>>/api/quote |
