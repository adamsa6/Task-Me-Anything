from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    user_exception,
    comment_exception,
    edit_comment_exception,
    task_exception,
)
from queries.comments_queries import CommentQueries
from queries.tasks_queries import TaskQueries
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

    comment = queries.create_comment(
        new_comment=new_comment, user_id=user.id, task_id=task_id
    )
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


@router.get(
    "/tasks/{task_id}/comments/{comment_id}", response_model=CommentOut
)
def get_task_comment(
    comment_id: int,
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    task_queries: TaskQueries = Depends(),
    queries: CommentQueries = Depends(),
) -> CommentOut:

    if user is None:
        raise user_exception

    task = task_queries.get_task(task_id)
    if task is None:
        raise task_exception

    comment = queries.get_comment(comment_id)
    if comment is None or comment.task_id != task_id:
        raise comment_exception

    return comment


@router.put(
    "/tasks/{task_id}/comments/{comment_id}", response_model=CommentOut
)
def edit_task_comment(
    comment_id: int,
    task_id: int,
    comment_in: CommentIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    task_queries: TaskQueries = Depends(),
    queries: CommentQueries = Depends(),
) -> CommentOut:

    if user is None:
        raise user_exception

    task = task_queries.get_task(task_id)
    if task is None:
        raise task_exception

    comment = queries.get_comment(comment_id)

    if comment is None or comment.task_id != task_id:
        raise comment_exception

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        comment = queries.edit_comment(comment_id, comment_in)
        return comment


@router.delete("/tasks/{task_id}/comments/{comment_id}", status_code=204)
def delete_task_comment(
    comment_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CommentQueries = Depends(),
):

    if user is None:
        raise user_exception

    comment = queries.get_comment(comment_id)

    if comment is None:
        raise comment_exception

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        result = queries.delete_comment(comment_id)
        return

#should we make a function for the comment exceptions? see repeated code above in get and edit comments, might even need in delete comment
