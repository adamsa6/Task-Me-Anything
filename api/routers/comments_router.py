from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    user_exception,
    task_exception,
    edit_task_exception,
    check_for_exceptions,
)
from queries.comments_queries import CommentQueries
from models.comments import CommentIn, CommentOut, CommentList
from models.users import UserResponse

from utils.authentication import try_get_jwt_user_data

router = APIRouter(prefix="/api")


@router.post("/tasks/{task_id}/comments", response_model=CommentOut)
def create_comment(
    new_comment: CommentIn,
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CommentQueries = Depends(),
) -> CommentOut:
    """
        Creates a new comment when someone submits the comments form.
    """

    if user is None:
        raise user_exception

    comment = queries.create_comment(new_comment=new_comment, user_id=user.id, task_id=task_id)
    return comment


@router.get("/tasks/{task_id}/comments", response_model=CommentList)
def list_task_comments(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CommentQueries = Depends(),
) -> CommentList:
    if user is None:
        raise user_exception

    return {"comments": queries.list_all(task_id=task_id)}
