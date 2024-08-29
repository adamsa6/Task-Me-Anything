# Data Models

## Tasks

- The `tasks` table contains the data about a specific task that a user can create and / or view.


| Property    | type     | unique | optional | Other info                           |
|-------------|----------|--------|----------|--------------------------------------|
| id          | int      | yes    | no       | primary key                          |
| title       | string   | no     | no       | char limit 300                       |
| description | string   | no     | yes      | char limit 1000                      |
| created_on  | datetime | no     | no       | automatically added on task creation |
| due_date    | date     | no     | no       |                                      |
| priority    | int      | no     | no       | constraint: must be 1, 2, or 3       |
| status      | string   | no     | no       | default is "Active"                  |
| assigner_id | int      | no     | no       | references user table                |
| assignee_id | int      | no     | no       | references user table                |


## Comments

- The `comments` table contains the data about a specific comment that a user can create and / or view


| Property   | type     | unique | optional | Other info                              |
|------------|----------|--------|----------|-----------------------------------------|
| id         | int      | yes    | no       | primary key                             |
| comment    | string   | no     | no       | char limit 1000                         |
| user_id    | int      | no     | no       | references user table                   |
| task_id    | int      | no     | no       | references user table                   |
| created_on | datetime | no     | no       | automatically added on comment creation |


## User

- The `users` table contains the data about a specific user of the app.


| Property  | type   | unique | optional | Other info  |
|-----------|--------|--------|----------|-------------|
| id        | int    | yes    | no       | primary key |
| email     | string | yes    | no       |   ----      |
| username  | string | yes    | no       |   ----      |
| password  | string | no     | no       |   ----      |
| first_name| string | no     | no       |   ----      |
| last_name | string | no     | no       |   ----      |
