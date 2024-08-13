from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    user_exception,
    task_exception,
    edit_task_exception,
    check_for_exceptions
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
    """
    if user is None:
        raise user_exception

    task = queries.create_task(new_task=new_task, assigner_id=user.id)
    return task


@router.get("/tasks", response_model=TaskList)
def list_all_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
):
    if user is None:
        raise user_exception

    return {"tasks": queries.list_all()}


@router.get("/assigned-tasks/mine", response_model=TaskList)
def list_assigned_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
):
    if user is None:
        raise user_exception

    return {"tasks": queries.list_assigned(assignee_id=user.id)}


@router.get("/tasks/mine", response_model=TaskList)
def list_my_tasks(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
):
    if user is None:
        raise user_exception

    return {"tasks": queries.list_mine(assigner_id=user.id)}


@router.get("/tasks/{task_id}", response_model=TaskOut)
def get_task_details(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:

    if user is None:
        raise user_exception

    task = queries.get_task(task_id)
    if task is None:
        raise task_exception
    return task


@router.put("/tasks/{task_id}", response_model=TaskOut)
def edit_task(
    task_id: int,
    task_in: TaskIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TaskQueries = Depends(),
) -> TaskOut:

    if user is None:
        raise user_exception

    task = queries.get_task(task_id)
    if task is None:
        raise task_exception

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

    if user is None:
        raise user_exception

    task = queries.get_task(task_id)

    if task is None:
        raise task_exception

    check_for_exceptions(user, task, status)

    task = queries.change_status(task_id, status)
    return task
