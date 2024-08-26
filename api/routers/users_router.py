from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    user_exception,
    task_exception,
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
    queries: TaskQueries = Depends(),
) -> TaskUsers:

    if user is None:
        raise user_exception

    task = queries.get_task(task_id)

    if task is None:
        raise task_exception

    assigner_id = task.assigner_id
    assignee_id = task.assignee_id
    assigner = user_queries.get_by_id(id=assigner_id)
    assignee = user_queries.get_by_id(id=assignee_id)
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
    queries: UserQueries = Depends(),
) -> UserList:

    if user is None:
        raise user_exception
    return {"users": queries.list_all()}


@router.get("/users/{user_id}", response_model=User)
def get_single_user(
    user_id: int,
    signed_in_user: UserResponse = Depends(try_get_jwt_user_data),
    queries: UserQueries = Depends(),
) -> User:

    if signed_in_user is None:
        raise user_exception

    user = queries.get_by_id(user_id)
    return user
