## Journal Entry for 8/6/2024
We practiced the Git process as a group, with each student taking turns. We also ensured that we understood the basics of how models are set up in the FastAPI system.

## Journal Entry for 8/7/2024
We mob-coded the creation of our database tables and played a role in debugging errors that arose.

## Journal Entry for 8/8/2024
The group and I spent time creating the router and queries for the users table. Yazan, Andrew, and Arielle each took turns setting this up.
King's Contribution
I was responsible for coding the router and queries for the tasks table. We encountered an error while getting the list of all tasks, but by the end of the day, we were able to fix it.

## Journal Entry for 8/9/2024
We all contributed to coding the restrictions that allow users to change the status of a task. After three iterations, we got the code working, and I helped verify that it functioned correctly.

## Journal Entry for 8/13/2024
We mob-coded the comment table, and I was responsible for coding the list comment and create comment routes and queries. I also contributed to model editing.
Andy led the initial mob coding session, where we implemented two third-party API requests. Later, I took the lead in mob coding to create and list comments for specific tasks, focusing on the list comment and create comment routes and queries while also assisting with model editing.
We encountered a bug while trying to join the tasks and comments tables for listing purposes. After consulting with our instructor, we learned that it was more RESTful to keep the tables separate since comments already referenced their associated tasks. This allowed us to create two distinct components for the front end.
I later led a mob coding session where we implemented the "get comment details" and "edit comment" functionalities and collaboratively developed the comment table.

## Journal Entry for 8/14/2024
The group mob-coded with Yazan as the main pilot, setting up the delete component for the comments.
I led the testing of the app feature that Yazan implemented.
Andy worked on the auth feature and the Redux framework.

## Journal Entry for 8/15/2024
We mob-coded the path feature for the backend. We also set up some Redux features, with Arielle piloting the group through this.

## Journal Entry for 08/19/2024
Caught Andy up on the work from last week.
We encountered issues with the assignee and signer date.
We resolved the issue by creating a new route for the hook to try and fix it.

## Journal Entry for 08/20/2024
The day began with Yazan mob coding. He and Arielle found a solution to the issues we had displaying the names on the task page, successfully rectifying the errors.
In the afternoon, I took over and set up the routes for the signup page.
Andrew then took over to do the same for the signin page.


## Journal Entry for 08/21/2024
We started by pair programming to build the Create Task component, which was initially straightforward but required user access for task assignment. Andy joined, and we switched to mob coding, where we decided to add a new backend endpoint for retrieving the user list. This involved creating a User model, a route, and a query.

We encountered a bug with the task priority dropdown, which defaulted to an empty string instead of a valid priority, but fixed it quickly. With Andy leading, we then focused on creating List Assigned Tasks and List My Tasks components before working on the Dashboard, allowing us to reuse these components effectively.

We addressed additional bugs and modified backend queries to return only 'active' or 'In Progress' tasks, simplifying frontend filtering. We also added a feature to limit the task list on the Dashboard to the top 5 tasks, while keeping the same components for detailed task views.


## Journal Entry for 08/21/2024
The day ended with me mob coding the Task Details page and handling many of the errors.

Yazan began the day by piloting the portion that dealt with the Edit Task form.

## Journal Entry for 08/26/2024
he team began with Arriele piloting, discussing the remaining tasks, and creating a checklist. They then added an "edit task" button to the Task detail page, which helped uncover a bug when the assigner and assignee were the same user.
After some brainstorming, the team decided to refactor the code by breaking it down into smaller, modular subcomponents. This approach replaced the previous use of a single component with conditional logic, simplifying the implementation and improving the code's clarity.
The team moved on to a stretch goal of displaying task comments but realized the character limit for comments was too restrictive. They adjusted the database schema to increase the character limit, necessitating a rebuild.
To list comments for a specific task, the team created a new backend endpoint to retrieve user details by ID (excluding passwords), enabling the display of the user's first and last name on their comments. Andy took over piloting to implement the "add a comment" feature. The team applied their previous week's learning to create a modal that also served as the comment submission form, showcasing the flexibility of modals in the application.
