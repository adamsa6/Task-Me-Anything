from fastapi import (
    Depends,
    APIRouter,
)
from utils.exceptions import (
    edit_comment_exception,
    check_user_exceptions,
    check_comment_exceptions,
    check_task_exception,
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
    task_queries: TaskQueries = Depends(),
) -> CommentOut:
    """
    Creates a new comment when someone submits the comments form.
    """

    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    check_task_exception(task)

    comment = queries.create_comment(
        new_comment=new_comment, user_id=user.id, task_id=task_id
    )
    return comment


@router.get("/tasks/{task_id}/comments", response_model=CommentList)
def list_task_comments(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> CommentList:

    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    check_task_exception(task)

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

    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = queries.get_comment(comment_id)
    check_comment_exceptions(task, comment)

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

    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = queries.get_comment(comment_id)
    check_comment_exceptions(task, comment)

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        comment = queries.edit_comment(comment_id, comment_in)
        return comment


@router.delete("/tasks/{task_id}/comments/{comment_id}", status_code=204)
def delete_task_comment(
    comment_id: int,
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    task_queries: TaskQueries = Depends(),
    queries: CommentQueries = Depends(),
):
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = queries.get_comment(comment_id)
    check_comment_exceptions(task, comment)

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        queries.delete_comment(comment_id)
        return
