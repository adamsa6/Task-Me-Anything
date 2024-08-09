from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.tasks_queries import TaskQueries

from utils.exceptions import TaskDatabaseException
from models.tasks import TaskIn, TaskOut, TaskList
from models.users import UserRequest, UserResponse

from utils.authentication import try_get_jwt_user_data


router = APIRouter(prefix="/api")


user_exception = HTTPException(
    status_code=401, detail="You must be logged in!"
)


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
