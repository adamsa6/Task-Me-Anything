## Journal Entry for 8/6/2024
The process began with familiarizing everyone with GitLab. Arielle was responsible for forking the initial projects, which were then cloned by the rest of the team from her version. We then created our individual journals and practiced pushing to the repository and merging changes as a group. This process ensured that we understood how the FastAPI Swagger system worked, and we made sure everyone had a solid foundation by even watching tutorial videos together.

Next, we moved on to designing the project, starting with the structure of the database tables.

## Journal Entry for 8/7/2024
We collaboratively coded the creation of our database tables and worked together to debug any errors that arose. We created various migration files for the database tables and then proceeded to edit some of the user tables to include additional information. Our project migrations included the tasks and comments tables. We verified that the user data correctly reflected the tasks in the Pydantic models and completed several queries and routers for the FastAPI backend. We tested to ensure that the tables were structured properly and created routes for user creation, signing in, signing out, and user authentication.

## Journal Entry for 8/8/2024
The group collaboratively worked on setting up various components of the project through mob coding sessions. Yazan started by sharing his screen and piloting the initial session, where the team fixed an authentication error, ensuring that it returned either the user or None. Together, we developed the TaskIn, TaskOut, and TaskList models, with Arielle taking the lead in this task, while Yazan piloted the creation of the CommentIn and CommentOut models. The team also collaborated on setting up the routers and queries for the users table, with Yazan, Andrew, and Arielle each taking turns to contribute to this effort. I was responsible for coding the router and queries for the tasks table. I encountered an error while retrieving the list of all tasks, but successfully resolved it by the end of the day. Arielle played a key role in guiding me through the creation of the router and function for listing tasks. Together, we worked through a bug, during which I gained a better understanding of how the class_row works and what fetchall() returns. Additionally, Arielle collaborated with Andy on creating a router and query for task creation, with Andy piloting and sharing his screen. This teamwork facilitated a deeper understanding and effective debugging of issues as they arose.

## Journal Entry for 8/9/2024
Today, Yazan piloted our project session, where we focused on creating the listtasks functionality. During this period, we also developed the necessary routers. Later in the day, Arielle took over as the pilot. Together, we organized the results of all list queries by due date and priority, ensuring that tasks with the closest due date and highest priority (priority = 1) appear first. The due date was set as the primary sorting criterion, followed by priority.

We all contributed to coding the restrictions that control a user's ability to change the status of a task. After three iterations, we successfully got the code working, and I assisted in verifying its proper functionality.

## Journal Entry for 8/12/2024
We conducted a mob coding session where Arielle piloted and shared my screen, and Yazan and Arielle demonstrated the completed edit task router and query to I and Andy, which we had pair programmed after our last class. Together, we developed a new router to edit the status of a task. Initially, we created separate routers for each possible status change, but Andy and Arielle collaborated to refactor the code to make it more concise and adhere to the DRY (Don't Repeat Yourself) principle. This refactoring involved writing an additional function to validate user permissions, ensuring that only users associated with a task as either the assignee or assigner could modify it. We also worked to separate out exception handling to make the code more modular. Furthermore, we refactored the queries into a single query for changing the status. During debugging, we explored using Enum with Pydantic models for status options but ultimately decided to use Literal instead. It was a valuable experience to learn how a patch request can modify just one piece of data in our table.



## Journal Entry for 8/13/2024
We mob-coded the comment table, and I was responsible for coding the list comment and create comment routes and queries. I also contributed to model editing.
Andy led the initial mob coding session, where we implemented two third-party API requests. Later, I took the lead in mob coding to create and list comments for specific tasks, focusing on the list comment and create comment routes and queries while also assisting with model editing.
We encountered a bug while trying to join the tasks and comments tables for listing purposes. After consulting with our instructor, we learned that it was more RESTful to keep the tables separate since comments already referenced their associated tasks. This allowed us to create two distinct components for the front end.
I later led a mob coding session where we implemented the "get comment details" and "edit comment" functionalities and collaboratively developed the comment table.

## Journal Entry for 8/14/2024
The group continued mob coding with Yazan as the main pilot, focusing on setting up the delete functionality for the comments section. I took the lead on testing the app feature that Yazan implemented, ensuring that the delete function worked correctly for comments. Additionally, Andy worked on the authentication feature and began integrating the Redux framework. We collaboratively edited the authorization page in preparation for Redux implementation. As a team, we then started to learn more about Redux to enhance our understanding and effectively apply it to our project.

## Journal Entry for 8/15/2024
Today, Arielle piloted our mob coding session, where our main focus was installing and configuring Redux in the app. We began by setting up the store and writing the GET request endpoints, adding paths into the main file and creating test components to verify data retrieval. After successfully configuring the GET requests, we moved on to setting up the PUT, POST, PATCH, and DELETE requests. Since these were more challenging to test, we decided to comment out the components for now and plan to work through them individually to ensure each functions correctly. We encountered a bug during the session, which required us to backtrack and add code back incrementally to pinpoint the error.

## Journal Entry for 08/19/2024
Today, I caught Andy up on the work from last week. We encountered issues with the assignee and signer date, which required us to fix the backend code. After resolving these problems, we created the "List All Tasks" component and added validation on the backend for this feature, including a hook for the corresponding endpoint. To resolve some remaining issues, we created a new route to test and fix the hook.

## Journal Entry for 08/20/2024
The day began with Yazan leading the mob coding session, where he and Arielle successfully resolved the issues we were having with displaying names on the task page. In the afternoon, I took over and set up the routes for the signup page, followed by Andrew, who did the same for the signin page. We worked on creating the signup form component, added an endpoint for it, and implemented the necessary functionality. Andy then took over as the pilot to implement our signin function.


## Journal Entry for 08/21/2024
We started by pair programming to build the Create Task component, which was initially straightforward but required user access for task assignment. Andy joined, and we switched to mob coding, where we decided to add a new backend endpoint for retrieving the user list. This involved creating a User model, a route, and a query.

We encountered a bug with the task priority dropdown, which defaulted to an empty string instead of a valid priority, but fixed it quickly. With Andy leading, we then focused on creating List Assigned Tasks and List My Tasks components before working on the Dashboard, allowing us to reuse these components effectively.

We addressed additional bugs and modified backend queries to return only 'active' or 'In Progress' tasks, simplifying frontend filtering. We also added a feature to limit the task list on the Dashboard to the top 5 tasks, while keeping the same components for detailed task views.


## Journal Entry for 08/22/2024
Yazan led the mob coding session at the start of the day. We focused on implementing the Edit Task component in the React front-end, encountering and resolving numerous bugs throughout the day. After troubleshooting, we successfully isolated and fixed the issues. Once the Edit Task component was completed, we began working on the Task Detail page. Although we didn’t have time to finish this task, we made progress and set up a plan for continued development tomorrow.


## Journal Entry for 08/23/2024
I continued working on the Task Detail page, adding button components and implementing conditional authentication to control their visibility. Andy piloted and refined some of the buttons. We then started integrating the modal, setting it up to display a random joke via our Get Joke Query when the task status is changed to completed. We also adjusted the modal to redirect users to their dashboard once it is closed. As we continued mob coding, I took over piloting for the last part of the class. With the remaining time, we focused on fixing smaller issues, including adding navigation links from task list pages and the dashboard to the specific task pages. During this process, we identified and corrected a bug related to SQL syntax from earlier in the week that affected task filtering by assigner ID. The syntax was adjusted, and we confirmed that the filtering was working correctly.



## Journal Entry for 08/26/2024
he team began with Arriele piloting, discussing the remaining tasks, and creating a checklist. They then added an "edit task" button to the Task detail page, which helped uncover a bug when the assigner and assignee were the same user.
After some brainstorming, the team decided to refactor the code by breaking it down into smaller, modular subcomponents. This approach replaced the previous use of a single component with conditional logic, simplifying the implementation and improving the code's clarity.
The team moved on to a stretch goal of displaying task comments but realized the character limit for comments was too restrictive. They adjusted the database schema to increase the character limit, necessitating a rebuild.
To list comments for a specific task, the team created a new backend endpoint to retrieve user details by ID (excluding passwords), enabling the display of the user's first and last name on their comments. Andy took over piloting to implement the "add a comment" feature. The team applied their previous week's learning to create a modal that also served as the comment submission form, showcasing the flexibility of modals in the application.

## Journal Entry for 08/27/2024
The day involved much of the unit testing, Arielle spearheaded this as she coded the majority of the unit test. We all followed suit and coded the required allocated unit test for each member. After which I coded the remainder of the unit-test before the day ended.
Another aspect that took much of the day had to deal with the css. Yazan has very much spearheaded this however him, andrew and I spent much time fix some of css component for bootstrap icon which wasn't being legible and matching the aesthetic of the weekend.
Yazan implemented the confetti feature which was shown after the task was marked completed.

## Journal Entry for 08/28/2024
We started the day by pairing up in the same room, with each pair working on different tasks. Arielle focused on understanding and writing unit tests for our tasks, practicing in a branch until all tests passed. Meanwhile, the other pair, including myself, worked on troubleshooting CSS design issues, such as those affecting the comment edit and delete buttons.

After reaching a good stopping point, we transitioned to mob coding with me leading. Arielle reviewed the unit tests I had written, ensuring everyone understood the process before pushing and merging changes. We then took turns driving the mob coding session to write unit tests for the comments, with each person writing at least three tests per route.


## Journal Entry for 08/29/2024
We began the day with pair programming, where Arielle and I set up the pipeline. We then made a plan for the remaining work and organized our tasks for the day. Yazan and I focused on troubleshooting and improving the CSS, while Andy and Arielle initially worked on the README. Andy later shifted to troubleshooting a feature we wanted to implement. I primarily worked on the README but checked in with my team members throughout the day to offer assistance as needed.

## Journal Entry for 08/29/2024
Today was focused on cleanup. We addressed and fixed any remaining bugs, removed unnecessary console logs, and reorganized the component folder for better structure. It was a productive day dedicated to finalizing and tidying up the project.
