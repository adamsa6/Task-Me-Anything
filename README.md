# Task Me Anything

- Arielle Adams
- Andrew Major
- Yazan Salhani
- King Olubela

Task Me Anything - your task taming sidekick!

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)

## Intended Market

Our target market is businesses and / or larger corporations who are looking for a way to manage tasks across their entire team.

Currently, the app is built for just one business, with all of the users being a part of that business. However, our goal is that each business using the app will have their own isolated team within the app (or their own version of the app), so that the users for each business are isolated from the users of other businesses.

## Functionality

- Visitors to the site can either sign up (if they do not have an account) or sign in from the home page.
- Both will redirect the user to their own Dashboard, which is the "landing" page for their top priority tasks.
    - The Dashboard will also show a new inspirational quote (from a third party API) that will help kickstart the user's motivation.
    - The Dashboard will show the first five tasks that the user has created (and assigned to either themselves or another user), and the first five tasks that the user has been assigned (from someone else or themselves).
- The user will be able to access their complete list of their Created Tasks and Assigned Tasks from both the Dashboard and Nav Bar.
- The My Created Tasks page shows the tasks that the user has created, that have a status of "Active" (which is the default when a task is created) or "In Progress".
- The My Assigned Tasks page shows the tasks that the user has been assigned, that have a status of "Active" (which is the default when a task is created) or "In Progress.
- The All Tasks page shows all of the tasks that have been created that have a status of "Active" (which is the default when a task is created) or "In Progress.
- The Task History page shows all of the tasks that have been created that have a status of "Completed" or "Deleted".
    - Tasks cannot be deleted from the database. The status of a task can be changed to "Deleted", which will remove it from all of the pages with "Active" or "In Progress" tasks, and archive it to the Task History page instead.
- Each of the task lists are sorted based on primarily the task's due date (sooner due date at the top), and then by priority level (highest priority, 1, at the top).
- Users can click on "Create Task" in the Nav bar to create a new task, inputting the Task Title, the Task Description, the due date, choose the priority level (from 1, 2, or 3), and assign the task to a user (including themselves).
    - The task's assigner is automatically set as the signed in user who created the task.
    - The task status is automatically set to "Active" as the default when the task is created.
    - The created_on property of the task is automatically set when the task is created.
- Any user can view the details of a task by clicking on the task. The task detail page will show all of the properties of the task, as well as all of the comments (if any) associated with the task.
    - Depending on the user's association with the task, they will have some ability to edit the task.
        - if the user is the task assigner, they can mark the task "Completed", "In Progress", or "Deleted", which will change the status of the task. They can also edit the details of the task directly in order to change the title, priority level, due date, description, and assignee.
        - if the user is the assignee, they can mark the task "Completed" or "In Progress".
        - if the user is neither the assignee nor the assigner, they will not be able to edit the task in any way.
- Any user can add a comment to a specific task, and choose to edit or delete any comment that they created.
- When a user marks a task completed, they will be shown a new joke (from a third party API) as a reward before being redirected back to their dashboard.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:
1. Fork and clone the repository down to your local machine.
2. CD into the new project directory
3. Run `docker compose up -- build`

## Requirements

- You will need an API key to access the third party API that gets a joke upon task completion. You can do this by signing up for a free account at https://api-ninjas.com/api to access all of their API's. Create a .env file to store your API Key as the variable API_NINJA_KEY.

#### Do we need to add anything else for this?




## Install Extensions -- NOT SURE IF NEEDED SOMEWHERE


-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

### Installing python dependencies locally -- NOT SURE IF NEEDED SOMEWHERE

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar
