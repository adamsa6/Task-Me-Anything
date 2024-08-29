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

## Journal Entry for 8/22/2024
- with yazan piloting we created our editTaskForm where we get the preexisting data for the task and are able to change the data and update the task. We also have almost completed our getTaskDetail component. The editTaskForm was very tricky and gave us a lot of trouble but we found surprisingly simple fixes to our issues that took us a long time to figure out.

## Journal Entry for 8/23/2024
- We mob coded, with King piloting as we continued to work on our Task Details page. We decided that in order to add the buttons, it would be best to create a subcomponent for each button. Since each button had specific conditions on whether or not it shows up for the user (and if the user is allowed to actually update the status / task). We were able to complete the In Progress, Completed, and Deleted buttons (but still have plans to add the update button).
- Andy piloted as we mob coded in order to create the buttons. As part of the Completed buttons, we had to research how to create a modal in Bootstrap. We experiemented with how that works for awhile, before settling on how we wanted it to look and be implemented.
- Also as part of the modal, we had to implement our Get Joke Query, so that the modal would show a random joke when the task status is changed to completed.
- We also changed it to redirect to the user's dashboard once the modal is closed.
- We continued mob coding, but I started piloting for the last bit of class. Due to the limited time left, we wanted to fix some smaller things. We added navigation links from each specific task (on the list pages and the dashboard) to the page for that task.
- In doing this, we also realized a bug that existed when we changed our SQL statements earlier in the week (when filtering the lists). Our syntax was slightly wrong, so while it was still filtering for the different task statuses that we wanted, it was no longer filtering by assigner id. We fixed the syntax and confirmed that it was working!

## Journal Entry for 8/26/2024
- We mob coded with me piloting at first. We first talked about what work we still have to complete and made a checklist. Then we started by adding our edit task button to our Task detail page. This helped us find a small bug for when if the assigner and the assignee were the same user (it wouldn't display correctly).
- After some brainstorming, we decided to refactor our code and break this piece down into subcomponents (where before we had used one component, but with if statements to change what was shown). Breaking it down into more modular components made the logic a lot more straightforward, and easy to implement.
- We transitioned to implementing one of our stretch goals (of listing task comments), and we realized that we had set our character limit for this too small.
- So we decided to adjust our database table for the comments, and had to rebuild.
- From there, we worked on being able to implement listing comments for a specific task. To do so, we had to create a new endpoint on the back end that allowed us to get a specific user by their id (without returning the password). This made it so that we could display the user's first and last name on the comment they had written.
- Andy took over piloting to implement the add a comment feature. We used what we had learned last week to make this a modal that was also our comment submit form!
- It was cool to see how we could change the modal to be whatever we wanted it to be!

## Journal Entry for 8/27/2024
- We mob coded with Andy piloting in order to continue the feature we had been working on at the end of yesterday's class. Although we had implemented our "add a comment" feature to a specific task, we discussed refactoring the code to make it more modular. So we first spent some time doing this, creating a new subcomponent that was specifically for our add comment modal (on our task details page).
- We also discovered a few bugs, as we worked through this, and handled those along the way. Then we transitioned to our Edit Comment feature
- Although we had more information about modals, with a plan to make a subcomponent for this, we expected it to be a little challenging because we wanted to be able to click to edit a specific comment, and have the input tag already filled in with the original comment's content. We spent some time experimenting with this, and we were able to use useState to set the default value of the contents before then re-setting the comment with the new contents.
- As we worked on this, one of the bugs we encountered was that even though it filled with the default value, we weren't able to change it. We learned that we were accessing the comment's contents inconsistently, leading to some bugs. Once we quickly fixed those, our feature was working!
- We also implemented our Delete comment feature, which was probably one of the easier features (after creating and editing a comment), but we continued to make it more modular, while also choosing to have a modal that confirmed the user's choice to delete.
- We started implementing a search bar, which is functional, but we do have some plans to expand on the functionality if we have time. This will take a bit more discussion about our design, and exactly what we want it to be able to do before we can figure out how to implement it though.

## Journal Entry for 8/28/2024
- We fixed up a lot of loose ends in our code after doing our unit testing. I made the task detail page more modular by making our confetti feature its own component.
