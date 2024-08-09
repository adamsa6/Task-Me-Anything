* The date of the entry
* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

## Journal Entry for 8/8/2024

- We mob coded, with Yazan starting off piloting by sharing his screed. We fixed an error with our authentication, and made sure that it returned either the user or None.
- we worked together to create our TaskIn, TaskOut, TaskList models (which I piloted), and then Yazan piloted the creation of the CommentIn and CommentOut models.
- I worked together with Andy (with him piloting and sharing his screen) to create our create a task router and query.
- I helped guide King through creating a list task router and function, and we ran into a bug that we worked together to fix.
- I had a realization of how the class_row works when debugging the issue, and have a better understanding how what fetchall() is returning!

## Journal Entry for 8/7/2024
```
- Today we mob coded, and Yazan, Andy, and I took turns leading. We worked together to create new migration files, so that we could do a customized User table that included more data. We also created tables for Tasks and Comments.

- We needed to make sure that the new User data was reflected in our User pydantic models (and our queries and routes), so we read through each to determine what needed to be adjusted.

- After making adjustments, we tested that we are able to create new users, sign in, and sign out.

- It was cool to learn how the different functions and routes/queries connected in the authorization.
```

## Journal Entry for 8/6/2024
```
- We mob coded, forking the project repo and creating issues on gitlab. We each added our journal doc to the journals directory, and practiced pushing to the repo and merging as a group.

- We also designed our database tables, and created a practice project with docker to test out the creation of the tables to make sure we knew it would work.

- I had a nice realization of how to edit models that were already built (specifically the UserIn and UserResponse models) to make sure they included the data that we wanted from the user (from our migrations). We even figured out that we could create a new model (UserLogin) for just when the user is logging in, so that they don't have to enter all of the information we wanted each time.
```
