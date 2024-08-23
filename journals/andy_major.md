## Journal Entry for 8/6/2024
- Created our respected journals

## Journal Entry for 8/7/2024
- Yazan lead mob programming for our user, task, and comment table.
- Arielle and I lead mob programming for models, queries, and auth routes.

## Journal Entry for 8/8/2024
- Yazan shared his screen for mob coding and we fixed an error with our authentication.
- I made a realizationg that our JWTUserData did not match our userresponse model so i had us change that to match and then in our try_get_jwtuserdata we had to match the expected data there as well and it worked!
- Created pydantic models for TaskIn and TaskOut as well as CommentIn and CommentOut.

## 8/9/2024
- Yazan piloted as me mob coded for our get my tasks query and route. We succesfully tested all of the features
- We created routes and queries for tasks that the user creates and tasks that are assigned to them and we were able to ORDER BY due_date and priority level
- We also created our task detail where we can select a specific task by id and are able to see the details of them

## 8/12/2024
- We finalized our update query and route as well as created our patch for our statuses.

## 8/13/2024
- We created our queries and routes for our 3rd party APIs. 1 for jokes and one for quotes.
- We have also gotten started on our comments components completing the create comments query and route as well as listing the comments for the individual tasks.

## Journal Entry for 8/14/2024
- We mob coded with Yazan piloting, implementing the delete comment functionality.
- We switched to King piloting, and he tested out the functionality that we had implemented for our comments
- I then switched to piloting, and we worked to remove the authorization that was already part of the project (in prep for using redux)
- Since we knew we were transitioning to the front end, we decided to use the time we had left to do some individual studying and get more comfortable with implementing redux

## Journal Entry for 8/19/2024
- We mob coded, starting out with Arielle piloting so that they could catch me up on what they had added while I was gone the previous day.
- I was piloting and we adjusted our code for the back end. We started by trying to create our List All Tasks component, but quickly realized that we were unable to access our assigner and assignee information, since those are integers referencing the users table. We also restructured some of our back end functions to add validation, and created a new exception.
- We shifted gears to the backend in order to add a new route that would allow use to get the user information for assigners and assignees. Then we created a hook for that endpoint, and used the hook in a sub component within our List All Tasks component. This allowed us to access the data that we needed, and it was really helpful to see how we could isolate different endpoints / hooks in order to get the data we needed.
- Even though we spent a lot of the afternoon troubleshooting that, it was helpful to go through the process.

## Journal Entry for 8/20/2024
- We mob coded, with Yazan piloting. He had figured out our issue from the day before, and was showing us the troubleshooting he had done. We still ran into a couple errors that we had to debug, but these were mostly syntax errors. and we were able to complete the List All Tasks component (for now)
- King started piloting, and we worked on creating the sign up form component. We added an endpoint for this, and implemented the functionality.
- I shifted to piloting in order to implement our signin function.

## Journal Entry for 8/21/2024
- We created multiple components to display a variety of lists. We started with arielle piloting and finished our create task component. Then moved on to me piloting and we completed our dashboard, assigned tasks, and my tasks components.

## Journal Entry for 8/21/2024
- with yazan piloting we created our editTaskForm where we get the preexisting data for the task and are able to change the data and update the task. We also have almost completed our getTaskDetail component. The editTaskForm was very tricky and gave us a lot of trouble but we found surprisingly simple fixes to our issues that took us a long time to figure out.
