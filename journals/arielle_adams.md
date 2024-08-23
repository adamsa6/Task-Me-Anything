* The date of the entry
* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

## Journal Entry for 8/23/2024
- We mob coded, with King piloting as we continued to work on our Task Details page. We decided that in order to add the buttons, it would be best to create a subcomponent for each button. Since each button had specific conditions on whether or not it shows up for the user (and if the user is allowed to actually update the status / task). We were able to complete the In Progress, Completed, and Deleted buttons (but still have plans to add the update button).
- Andy piloted as we mob coded in order to create the buttons. As part of the Completed buttons, we had to research how to create a modal in Bootstrap. We experiemented with how that works for awhile, before settling on how we wanted it to look and be implemented.
- Also as part of the modal, we had to implement our Get Joke Query, so that the modal would show a random joke when the task status is changed to completed.
- We also changed it to redirect to the user's dashboard once the modal is closed.
- We continued mob coding, but I started piloting for the last bit of class. Due to the limited time left, we wanted to fix some smaller things. We added navigation links from each specific task (on the list pages and the dashboard) to the page for that task.
- In doing this, we also realized a bug that existed when we changed our SQL statements earlier in the week (when filtering the lists). Our syntax was slightly wrong, so while it was still filtering for the different task statuses that we wanted, it was no longer filtering by assigner id. We fixed the syntax and confirmed that it was working! 

## Journal Entry for 8/22/2024
- We mob coded, with Yazan driving. Our main goal was to implement our Edit Task feature on the front-end. This took up most of the day, as this was one of the more challenging features for us.
- We had some bugs right away, and after some troubleshooting, realized that they error was coming from a completely different part of the component than we initially thought. It helped to comment out pieces of the component to see when the error disappeared.
- We worked through the rest of the bugs that came up throughout the day, trying to take it piece by piece in order to isolate the issues and where they were coming from.
- After we finished implementing the Edit Task, we moved on to start working on our Task Detail page. Even though we didn't have time to finish implementing this, we were able to get started and set up a plan for tomorrow.


## Journal Entry for 8/21/2024
- We started out pair programming, and King and I worked on implementing the Create Task component. This started off fairly straightforward, as it was similar to how we implemented our SignUp component. However, King and I realized that we would need to be able to access all of the users in order to assign the task to a specific user as the assignee.
- Andy joined, and we continued by mob coding. We decided that we should go back to the back end and create a new endpoint that would get the list of users. This meant that we had to make a new User model, a route for the endpoint, and then a query to return the list of users.
- We found an interesting bug when we realized that our drop down for setting the task priority did not have an extra option telling the user to select a priority. This meant that the default option of priority 1 was already selected, but the task wouldn't be created for that priority. We realized that we were actually setting the default priority to an empty string, but since we never actually changed the state of the priority for priority level 1 (since it was already selected), the form was trying to create the task with the empty string set as the priority. A quick fix, but interesting!
- We transitioned to Andy leading the coding, and we worked on creating our other components for Task Lists. We started by working on the Dashboard, but realized that it would actually be easier to create the components for List Assigned Tasks and List My Tasks first. Doing so would allow us to reuse those components within our Dashboard component.
- We also found a few bugs throughout this process that were interesting, and decided to adjust the back end queries for each of these lists to only return tasks that have a status of 'active' or 'In Progress', which eliminated the need to filter tasks by those in the front end.
- We also learned how to conditionally limit the list of tasks returned to the dashboard by each component by setting an isLimited property, where if it was true, the List components would only return the first 5 tasks. This allowed us to only show the top priority tasks on our Dashboard, while still using the same components to list all of the tasks on their own pages.

## Journal Entry for 8/20/2024
- We mob coded, with Yazan piloting. He had figured out our issue from the day before, and was showing us the troubleshooting he had done. We still ran into a couple errors that we had to debug, but these were mostly syntax errors. and we were able to complete the List All Tasks component (for now)
- King started piloting, and we worked on creating the sign up form component. We added an endpoint for this, and implemented the functionality.
- Andy shifted to piloting in order to implement our signin function.


## Journal Entry for 8/19/2024
- We mob coded, starting out with me piloting so that we could catch Andy up on what we had added while he was gone the previous day.
- We adjusted our code for the back end, with Andy piloting. We started by trying to create our List All Tasks component, but quickly realized that we were unable to access our assigner and assignee information, since those are integers referencing the users table. We also restructured some of our back end functions to add validation, and created a new exception.
- We shifted gears to the backend in order to add a new route that would allow use to get the user information for assigners and assignees. Then we created a hook for that endpoint, and used the hook in a sub component within our List All Tasks component. This allowed us to access the data that we needed, and it was really helpful to see how we could isolate different endpoints / hooks in order to get the data we needed.
- Even though we spent a lot of the afternoon troubleshooting that, it was helpful to go through the process.

# Journal Entry for 8/15/2024
- We mob coded with me piloting. Our goal for today was to install and configure redux into the app, and start getting our endpoints set up.
- We configured the store and starting writing our endpoints. We decided it would be easiest to start with the GET requests endpoints. As we wrote each endpoint, we added a path into main, and then created a component for the endpoint. The component was mostly for us to test to make sure we were getting the right data.
- After the GET request endpoints were set up, we started working on the PUT, POST, PATCH, and DELETE requests. Since these were a little harder to test, we decided to wait to create the components for each.
- Instead, we set up the endpoints and paths, but left them commented out. Our goal is to start working through them one by one in order to ensure each is working as intended before moving on.
- We did run into a bug that was a bit difficult to figure out. It was helpful to see the problem solving process when we couldn't figure it out at first. It worked to back track steps, commenting everything out, and then adding small pieces back in one by one in order. This helped us find where the error was coming from exactly.


## Journal Entry for 8/14/2024
- We mob coded with Yazan piloting, implementing the delete comment functionality.
- We switched to King piloting, and he tested out the functionality that we had implemented for our comments
- We then switched to Andy piloting, and we worked to remove the authorization that was already part of the project (in prep for using redux)
- Since we knew we were transitioning to the front end, we decided to use the time we had left to do some individual studying and get more comfortable with implementing redux

## Journal Entry for 8/13/2024
- We mob coded, with Andy piloting, and worked together to implement our two third party API requests.
- Then we decided to practice time boxing, and work on our stretch goal of setting up task comments.
- We switch to King piloting, and mob coded together to implement creating a comment for a specific task and listing comments for a specific task.
- We did encounter a bit of a bug because we were trying to set up the list to join our tasks and comments tables. However, after discussing this with the instructor, we learned it was more restful to keep them separate (since the comments already referenced the specific tasks they are associated with). This meant we could just create two components to get each in the front end.
- Finally, we switched to me piloting the mob coding, and worked to implement the get a comment's details as well as implementing edit a comment.

## Journal Entry for 8/12/2024

- We mob coded, with me piloting and sharing my screen. Since Yazan and I had pair programmed after our last class, we showed King and Andy the completed edit task router and query.
- We worked together to created another router to edit the status of a task. At first, we created separate routers to change the status to each of the possible options, but then Andy and I worked together to refactor the code to be more concise / meet DRY.
- In doing this, we wrote an additional function to check user exceptions in order to add some validation (such as making sure that the user is connected to the task as either the assignee or assigner before being able to change anything, and then adding some other conditionals depending on the situation).
- Andy and I also worked to refactor the code, to separate out the exceptions we had written in order to have the code be more modular.
- We refactored the queries to also be just one query to change the status.
- We debugged an issue, and learned more about using Enum in order to use a Pydantic model just for the possible status options, but ended up deciding to import and use Literal instead.
- It was cool to see how we can use a patch request to change just one piece of our table!

## Journal Entry for 8/9/2024
- We mob programmed, with Yazan piloting and focused on created our list tasks. We worked together to implement the routers for list all tasks, list my tasks (tasks the user created), and list assigned tasks (tasks the user has been assigned).
- We continued mob coding, with me piloting. We ordered the results of all the list queries by due date and priority, with the closest due date and highest priority (priority=1) showing first. The due date is the primary property to order by, and then using the priority.
- I also piloted the mob programming to create the get task details router and query.
- We started mob coding (with me piloting) to create the edit task details router and query, and then Yazan and I continued pair programming after class. We were able to debug some issues that came up and got them working!
- My "aha" moment was realizing that we should created two separate paths for listing tasks for a specific user, with the assigned-tasks/mine being for tasks assigned to the user but tasks/mine being the tasks the user has created

## Journal Entry for 8/8/2024

- We mob coded, with Yazan starting off piloting by sharing his screen. We fixed an error with our authentication, and made sure that it returned either the user or None.
- we worked together to create our TaskIn, TaskOut, TaskList models (which I piloted), and then Yazan piloted the creation of the CommentIn and CommentOut models.
- I worked together with Andy (with him piloting and sharing his screen) to create our create a task router and query.
- I helped guide King through creating a list task router and function, and we ran into a bug that we worked together to fix.
- I had a realization of how the class_row works when debugging the issue, and have a better understanding how what fetchall() is returning!

## Journal Entry for 8/7/2024

- Today we mob coded, and Yazan, Andy, and I took turns leading. We worked together to create new migration files, so that we could do a customized User table that included more data. We also created tables for Tasks and Comments.

- We needed to make sure that the new User data was reflected in our User pydantic models (and our queries and routes), so we read through each to determine what needed to be adjusted.

- After making adjustments, we tested that we are able to create new users, sign in, and sign out.

- It was cool to learn how the different functions and routes/queries connected in the authorization.


## Journal Entry for 8/6/2024

- We mob coded, forking the project repo and creating issues on gitlab. We each added our journal doc to the journals directory, and practiced pushing to the repo and merging as a group.

- We also designed our database tables, and created a practice project with docker to test out the creation of the tables to make sure we knew it would work.

- I had a nice realization of how to edit models that were already built (specifically the UserIn and UserResponse models) to make sure they included the data that we wanted from the user (from our migrations). We even figured out that we could create a new model (UserLogin) for just when the user is logging in, so that they don't have to enter all of the information we wanted each time.
