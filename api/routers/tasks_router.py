from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    edit_task_exception,
    check_for_exceptions,
    check_user_exceptions,
    check_task_exception,
)
from queries.tasks_queries import TaskQueries
from models.tasks import (
    TaskIn,
    TaskOut,
    TaskList,
    TaskStatus,
)
from models.users import UserResponse

from utils.authentication import try_get_jwt_user_data


router = APIRouter(prefix="/api")


@router.post("/tasks")
def create_task(
    new_task: TaskIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:
    """
    Creates a new task when someone submits the task form

    Args:
    - new_task (TaskIn): The task information submitted in the task form.
    - user (UserResponse):
        The user making the request (the user data obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database

    Returns:
    - TaskOut: The created task object.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    task = queries.create_task(new_task=new_task, assigner_id=user.id)
    return task


@router.get("/tasks", response_model=TaskList)
def list_all_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskList:
    """
    Retrieves a list of all created tasks.

    Args:
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database

    Returns:
    - TaskList: A dictionary containing the list of all tasks.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"tasks": queries.list_all()}

@router.get("/tasks/current", response_model=TaskList)
def list_current_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskList:
    """
    Retrieves a list of all current tasks.

    Args:
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database

    Returns:
    - TaskList: A dictionary containing the list of all current tasks (status of "Active" or "In Progress")

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"tasks": queries.list_current()}


@router.get("/tasks/past", response_model=TaskList)
def list_past_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskList:
    """
    Retrieves a list of all past tasks.

    Args:
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database

    Returns:
    - TaskList: A dictionary containing the list of all past tasks (status of "Completed" or "Deleted")

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"tasks": queries.list_past()}


@router.get("/assigned-tasks/mine", response_model=TaskList)
def list_assigned_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskList:
    """
    Retrieves a list of all tasks assigned to the logged in user.

    Args:
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used
        to interact with the database

    Returns:
    - TaskList: A dictionary containing the list of all tasks.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"tasks": queries.list_assigned(assignee_id=user.id)}


@router.get("/tasks/mine", response_model=TaskList)
def list_my_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskList:
    """
    Retrieves a list of all tasks created by the logged in user.

    Args:
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used
        to interact with the database

    Returns:
    - TaskList: A dictionary containing the list of all tasks.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)

    return {"tasks": queries.list_mine(assigner_id=user.id)}


@router.get("/tasks/{task_id}", response_model=TaskOut)
def get_task_details(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:
    """
    Retrieves the details of a specific task.

    Args:
    - task_id (int): The ID of the task to retrieve.
    - user (UserResponse):
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used
        to interact with the database

    Returns:
    - TaskOut: The details of the requested task.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task with the given ID does not exist.
    """
    check_user_exceptions(user)

    task = queries.get_task(task_id)
    check_task_exception(task)

    return task


@router.put("/tasks/{task_id}", response_model=TaskOut)
def edit_task(
    task_id: int,
    task_in: TaskIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:
    """
    Edit a specific task.

    Args:
    - task_id (int): The ID of the task to be edited.
    - task_in (TaskIn): The updated task information.
    - user (UserResponse:
        The user making the request (the user data
        obtained from the JWT token)
    - queries (TaskQueries):
        The instance of the TaskQueries class used
        to interact with the database

    Returns:
    - TaskOut: The edited task.

    Raises:
    - edit_task_exception:
        If the user is not authorized to edit the task
        (if they did not create the task).
    - TaskNotFoundException:
        If the task with the given ID is not found / does not exist.
    """
    check_user_exceptions(user)

    task = queries.get_task(task_id)
    check_task_exception(task)

    if user.id != task.assigner_id:
        raise edit_task_exception
    else:
        task = queries.update_task(task_id, task_in)
        return task


@router.patch("/tasks/{task_id}/status", response_model=TaskOut)
def change_task_status(
    task_id: int,
    status: TaskStatus,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:
    """
    Changes the status of a task.

    Args:
    - task_id (int): The ID of the task to be updated.
    - status (TaskStatus): The new status of the task.
    - user (UserResponse):
        The user making the request. Defaults to the result of
        the try_get_jwt_user_data function.
    - queries (TaskQueries):
        The instance of the TaskQueries class used
        to interact with the database

    Returns:
    - TaskOut: The updated task.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task with the given ID does not exist.
    - EditTaskException:
        If the user does not have permission to update the task status.
    """
    check_user_exceptions(user)

    task = queries.get_task(task_id)
    check_task_exception(task)

    check_for_exceptions(user, task, status)

    task = queries.change_status(task_id, status)
    return task
