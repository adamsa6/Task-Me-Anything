from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    check_user_exceptions,
    check_task_exception,
    check_user_not_found_exception,
)
from queries.tasks_queries import TaskQueries
from queries.user_queries import UserQueries
from models.users import User, UserResponse, TaskUsers, UserList

from utils.authentication import try_get_jwt_user_data

router = APIRouter(prefix="/api")


@router.get("/tasks/{task_id}/users", response_model=TaskUsers)
def get_task_users(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    user_queries: UserQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> TaskUsers:
    """
    Retrieves the users associated with a specific task.

    Args:
    - task_id (int): The ID of the task the users belongs to.
    - user (UserResponse):
        The user making the request. Defaults to the current authenticated user
    - user_queries (UserQueries):
        The instance of the UserQueries class used to
        interact with the database
    - task_queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database

    Returns:
    - TaskUsers: a dictionary containing the assigner and assignee users
        associated with the specified task.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    - UserNotFoundException:
        If the assigner or assignee of the task does not exist.
    """
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    check_task_exception(task)

    assigner_id = task.assigner_id
    assignee_id = task.assignee_id

    assigner = user_queries.get_user_by_id(id=assigner_id)
    check_user_not_found_exception(assigner)

    assignee = user_queries.get_user_by_id(id=assignee_id)
    check_user_not_found_exception(assignee)

    assigner_out = {
        "id": assigner.id,
        "first_name": assigner.first_name,
        "last_name": assigner.last_name,
    }
    assignee_out = {
        "id": assignee.id,
        "first_name": assignee.first_name,
        "last_name": assignee.last_name,
    }
    return {"assigner": assigner_out, "assignee": assignee_out}


@router.get("/users", response_model=UserList)
def get_users(
    user: UserResponse = Depends(try_get_jwt_user_data),
    user_queries: UserQueries = Depends(),
) -> UserList:
    """
    Retrieves a list of all users.

    Args:
    - user (UserResponse):
        The user making the request. Defaults to the
        current authenticated user
    - user_queries (UserQueries):
        The instance of the UserQueries class used to
        interact with the database

    Returns:
    - UserList: A dictionary containing a list of all users.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"users": user_queries.list_all()}


@router.get("/users/{user_id}", response_model=User)
def get_single_user(
    user_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    user_queries: UserQueries = Depends(),
) -> User:
    """
    Retrieves the details of a single user.

    Args:
    - user_id (int): The ID of the user to retrieve.
    - user (UserResponse):
        The user making the request. Defaults to the
        current authenticated user.
    - user_queries (UserQueries):
        The instance of the UserQueries class used to
        interact with the database

    Returns:
    - User: The details of the requested user.

    Raises:
    - UserException: If the user is not logged in.
    - UserNotFoundException:
        If the assigner or assignee of the task does not exist.
    """
    check_user_exceptions(user)

    single_user = user_queries.get_user_by_id(user_id)

    check_user_not_found_exception(single_user)

    return single_user
