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

- Returns an object with one key ("tasks"), whose value is a list of dictionaries. Each dictionary will be a task.=
    - List All Tasks: returns all tasks that have been created, no matter the user or the task status
    - List My Tasks: returns only tasks that the logged in user has created (meaning the assigner_id == the user id), and only those that have a status of "Active" or "In Progress"
    - List Assigned Tasks: returns only tasks that the logged in user has been assigned (meaning that the assignee_id == the user id), and only those that have a status of "Active" or "In Progress"

Response body:
```
{
  "tasks": [
    {
      "id": database id for the task (number),
      "title": task title (string),
      "description": task description (string),
      "created_on": timestamp of task creation (datetime),
      "due_date": task due date (date),
      "priority": task priority level (int),
      "status": task status (string),
      "assigner_id": database id for the user assigning the task (number),
      "assignee_id": database id for the user beng assigned the task (number)
    },
    ...
  ]
}
```

### Get Task Details

- Returns an object containing the details of a specific task.

Response body:
```
{
    "id": database id for the task (number),
    "title": task title (string),
    "description": task description (string),
    "created_on": timestamp of task creation (datetime),
    "due_date": task due date (date),
    "priority": task priority level (int),
    "status": task status (string),
    "assigner_id": database id for the user assigning the task (number),
    "assignee_id": database id for the user being assigned the task (number)
}
```

### Create Task

- Creates a new task, and returns a dictionary containing the details of the task that was created.

Request body:
```
{
  "title": task title (string),
  "description": task description (string),
  "due_date": task due date (date),
  "priority": task priority level (int),
  "assignee_id": database id for the user beng assigned the task (number)
}

```

Response body:
```
{
    "id": database id for the task (number),
    "title": task title (string),
    "description": task description (string),
    "created_on": timestamp of task creation (datetime),
    "due_date": task due date (date),
    "priority": task priority level (int),
    "status": task status (string),
    "assigner_id": database id for the user assigning the task (number),
    "assignee_id": database id for the user being assigned the task (number)
}
```

### Edit a Task

- Edits the details of an already existing task, and returns a dictionary containing the details of the edited task.
- Only the user who created the task (the assigner) is able to edit a task.

Request body:
```
{
  "title": task title (string),
  "description": task description (string),
  "due_date": task due date (date),
  "priority": task priority level (int),
  "assignee_id": database id for the user beng assigned the task (number)
}

```

Response body:
```
{
    "id": database id for the task (number),
    "title": task title (string),
    "description": task description (string),
    "created_on": timestamp of task creation (datetime),
    "due_date": task due date (date),
    "priority": task priority level (int),
    "status": task status (string),
    "assigner_id": database id for the user assigning the task (number),
    "assignee_id": database id for the user being assigned the task (number)
}
```

### Change Task Status

- Changes the status of an already existing task, and returns a dictionary containing the details of the edited task
- Only users associated with the task are able to change the status.
    - if the user is the task assigner, they can mark the task "Completed", "In Progress", or "Deleted", which will change the status of the task. They can also edit the details of the task directly in order to change the title, priority level, due date, description, and assignee.
    - if the user is the assignee, they can mark the task "Completed" or "In Progress".
    - if the user is neither the assignee nor the assigner, they will not be able to edit the task in any way.

Request body:
```
{
  "status": task status (string)
}
```

Response body:
```
{
    "id": database id for the task (number),
    "title": task title (string),
    "description": task description (string),
    "created_on": timestamp of task creation (datetime),
    "due_date": task due date (date),
    "priority": task priority level (int),
    "status": task status (string),
    "assigner_id": database id for the user assigning the task (number),
    "assignee_id": database id for the user being assigned the task (number)
}
```



## Comments

|    Action          | Method | URL                                                |
|--------------------|--------|----------------------------------------------------|
| Create Comment     | POST   | <<Host URL>>/api/tasks/:taskId/comments            |
| Get a Comment      | GET    | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| Edit a Comment     | PUT    | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| Delete a Comment   | DELETE | <<Host URL>>/api/tasks/:taskId/comments/:commentId |
| List Task Comments | GET    | <<Host URL>>/api/tasks/:taskId/comments            |


### Create a Comment

- Creates a new comment and returns a dictionary containing the details of the comment that was created.

Request body:
```
{
  "comment": content of comment (string)
}
```

Response body:
```
{
  "id": database id of the comment (number),
  "comment": content of comment (string),
  "user_id": database id of user creating the comment (number),
  "task_id": database id of the associated task (number),
  "created_on": timestamp of comment creation (datetime)
}
```

### Get a Comment

- Returns a dictionary containing the details of an already existing comment (as specified by the :commentId).

Response body:
```
{
  "id": database id of the comment (number),
  "comment": content of comment (string),
  "user_id": database id of user creating the comment (number),
  "task_id": database id of the associated task (number),
  "created_on": timestamp of comment creation (datetime)
}
```


### Edit a Comment

- Edits an already existing comment (as specified by the :commentId), and returns a dictionary containing the details of the edited comment.

Request body:
```
{
  "comment": content of comment (string)
}
```

Response body:
```
{
  "id": database id of the comment (number),
  "comment": content of comment (string),
  "user_id": database id of user creating the comment (number),
  "task_id": database id of the associated task (number),
  "created_on": timestamp of comment creation (datetime)
}
```


### Delete a Comment

- Deletes a comment (as specified by the :commentId) from the database. Response status code will be 204, meaning a no content successful response.


### List Task Comments

- Returns a dictionary, with one key ("comments"), whose value is a list of comments associated with a specific task (as specified by :taskId).

Response body:
```
{
  "comments": [
    {
    "id": database id of the comment (number),
    "comment": content of comment (string),
    "user_id": database id of user creating the comment (number),
    "task_id": database id of the associated task (number),
    "created_on": timestamp of comment creation (datetime)
    },
    ...
  ]
}

```


## Authentication and Users

|    Action       | Method | URL                                  |
|-----------------|--------|--------------------------------------|
| Sign up         | POST   | <<Host URL>>/api/auth/signup         |
| Signin          | POST   | <<Host URL>>/api/auth/signin         |
| Authenticate    | GET    | <<Host URL>>/api/auth/authenticate   |
| Signout         | DELETE | <<Host URL>>/api/auth/signout        |
| Get Task Users  | GET    | <<Host URL>>/api/tasks/:taskId/users |
| Get Users       | GET    | <<Host URL>>/api/users               |
| Get Single User | GET    | <<Host URL>>/api/users/:userId        |

### Sign Up

- Creates a new user and returns a dictionary containing the details of the user created. Generates authentication token.

Request body:
```
{
  "username": the username of the user (string),
  "password": user's password (string),
  "first_name": user's first name (string),
  "last_name": user's last name (string),
  "email": user's email (string)
}
```

Response body:
```
{
  "id": database id of the user,
  "username": the username of the user (string),
  "first_name": user's first name (string),
  "last_name": user's last name (string),
  "email": user's email (string)
}
```

### Sign In

- Signs the user in, and returns a dictionary containing the details of the signed in user. Generates authentication token.

Request body:
```
{
  "username": the username of the user (string),
  "password": user's password (string)
}
```

Response body:
```
{
  "id": 8,
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}
```

### Authenticate

- Authenticates the user. If the user is logged in, returns the a dictionary containing the details of the user. If not, returns `null`

Response body:
```
{
  "id": 8,
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}
```

### Signout

- Signs the user out and deletes the token. Returns null

### Get Task Users

- Gets the users associated with a specific task (as specidied by :taskId). Returns a dictionary with two keys ("assigner" and "assignee"), which each contain the user information for associated user.

Response body:
```
{
  "assigner": {
    "id": database id of the user who is the task assigner (number),
    "first_name": user's first name (string),
    "last_name": user's last name (string)
  },
  "assignee": {
    "id": database id of the user who is the assignee (number),
    "first_name": user's first name (string),
    "last_name": user's last name (string)
  }
}
```

### Get Users

- Returns a dictionary with one key ("users"), whose value is a list containing all of the users.

Response body:
```
{
  "users": [
    {
    "id": database id of the user (number),
    "first_name": user's first name (string),
    "last_name": user's last name (string)
    },
    ...
  ]
}
```

### Get Single User

- Returns a dictionary containing the details for a specific user (as specified by :userId).

Response body:
```
{
"id": database id of the user (number),
"first_name": user's first name (string),
"last_name": user's last name (string)
}
```

## Endpoints to access Third Part APIs

|    Action       | Method | URL                    |
|-----------------|--------|------------------------|
| Get Joke        | GET    | <<Host URL>>/api/joke  |
| Get Quote       | GET    | <<Host URL>>/api/quote |


### Get Joke

- Returns a random joke. Response will be a string containing the joke.

### Get Quote

- Returns a an list of objects, each containing the quote, the author, and the html formatting. It will be limited to one quote in the list.

Response body:
```
[
  {
    "q": quote (string),
    "a": author (string),
    "h": formatting of quote for html, if needed (string)
  }
]
```
