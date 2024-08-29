# Data Models

- This project uses a PostgreSQL database.

## Tasks

- The `tasks` table contains the data about a specific task that a user can create and / or view.


| Property    | type                                | unique | optional | Other info                           |
|-------------|-------------------------------------|--------|----------|--------------------------------------|
| id          | SERIAL PRIMARY                      | yes    | no       | primary key                          |
| title       | VARCHAR                             | no     | no       | char limit 300                       |
| description | VARCHAR                             | no     | yes      | char limit 1000                      |
| created_on  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | no     | no       | automatically added on task creation |
| due_date    | DATE                                | no     | no       |                                      |
| priority    | INTEGER                             | no     | no       | constraint: must be 1, 2, or 3       |
| status      | VARCHAR                             | no     | no       | default is "Active"                  |
| assigner_id | INTEGER                             | no     | no       | references user table                |
| assignee_id | INTEGER                             | no     | no       | references user table                |


## Comments

- The `comments` table contains the data about a specific comment that a user can create and / or view


| Property   | type                                | unique | optional | Other info                              |
|------------|-------------------------------------|--------|----------|-----------------------------------------|
| id         | SERIAL PRIMARY                      | yes    | no       | primary key                             |
| comment    | VARCHAR                             | no     | no       | char limit 1000                         |
| user_id    | INTEGER                             | no     | no       | references user table                   |
| task_id    | INTEGER                             | no     | no       | references user table                   |
| created_on | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | no     | no       | automatically added on comment creation |


## User

- The `users` table contains the data about a specific user of the app.


| Property  | type               | unique | optional | Other info  |
|-----------|--------------------|--------|----------|-------------|
| id        | SERIAL PRIMARY KEY | yes    | no       | primary key |
| email     | VARCHAR            | yes    | no       |   ----      |
| username  | VARCHAR            | yes    | no       |   ----      |
| password  | VARCHAR            | no     | no       |   ----      |
| first_name| VARCHAR            | no     | no       |   ----      |
| last_name | VARCHAR            | no     | no       |   ----      |
