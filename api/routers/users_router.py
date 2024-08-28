from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    check_user_exceptions,
    check_task_exception,
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

    check_user_exceptions(user)

    task = queries.get_task(task_id)

    check_task_exception(task)

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

    check_user_exceptions(user)

    return {"users": queries.list_all()}


@router.get("/users/{user_id}", response_model=User)
def get_single_user(
    user_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: UserQueries = Depends(),
) -> User:

    check_user_exceptions(user)

    single_user = queries.get_by_id(user_id)
    return single_user
