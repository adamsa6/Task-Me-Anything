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
    comment_queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> CommentOut:
    """
    Creates a new comment for a specific task.

    Args:
    - new_comment (CommentIn): The data for the new comment.
    - task_id (int): The ID of the task the comment belongs to.
    - user (UserResponse):
        The user making the comment. Defaults to the current authenticated user
    - comment_queries (CommentQueries):
        The instance of the CommentQueries class used to
        interact with the database.
    - task_queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database.

    Returns:
    - CommentOut: The created comment.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    """
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    check_task_exception(task)

    comment = comment_queries.create_comment(
        new_comment=new_comment, user_id=user.id, task_id=task_id
    )
    return comment


@router.get("/tasks/{task_id}/comments", response_model=CommentList)
def list_task_comments(
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    comment_queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> CommentList:
    """
    Lists all comments for a specific task.

    Args:
    - task_id (int): The ID of the task the comments belong to.
    - user (UserResponse):
        The user making the request. Defaults to the current authenticated user
    - comment_queries (CommentQueries):
        The instance of the CommentQueries class used to
        interact with the database.
    - task_queries (TaskQueries):
        The instance of the TaskQueries class
        used to interact with the database.

    Returns:
    - CommentOut:
        A dictionary containing the list of all comments
        associated with the specific task.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    """

    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    check_task_exception(task)

    return {"comments": comment_queries.list_all(task_id=task_id)}


@router.get(
    "/tasks/{task_id}/comments/{comment_id}", response_model=CommentOut
)
def get_task_comment(
    comment_id: int,
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    comment_queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> CommentOut:
    """
    Retrieves the details of a specific comment.

    Args:
    - comment_id (int): The ID of the comment to retrieve.
    - task_id (int): The ID of the task the comments belong to.
    - user (UserResponse):
        The user making the request. Defaults to the current authenticated user
    - comment_queries (CommentQueries):
        The instance of the CommentQueries class used to
        interact with the database.
    - task_queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database.

    Returns:
    - CommentOut: The details of the requested comment.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    - CommentException:
        If the comment does not belong to the specified task
        or if the comment does not exist
    """
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = comment_queries.get_comment(comment_id)
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
    comment_queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
) -> CommentOut:
    """
    Edits a specific comment.

    Args:
    - comment_id (int): The ID of the comment to retrieve.
    - task_id (int): The ID of the task the comments belong to.
    - user (UserResponse):
        The user editing the comment. Defaults to the current
        authenticated user.
    - comment_queries (CommentQueries):
        The instance of the CommentQueries class used to
        interact with the database.
    - task_queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database.

    Returns:
    - CommentOut: The details of the edited comment.

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    - CommentException:
        If the comment does not belong to the specified task
        or if the comment does not exist
    - EditCommentException:
        If the user does not have permission to edit the comment.
    """
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = comment_queries.get_comment(comment_id)
    check_comment_exceptions(task, comment)

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        comment = comment_queries.edit_comment(comment_id, comment_in)
        return comment


@router.delete("/tasks/{task_id}/comments/{comment_id}", status_code=204)
def delete_task_comment(
    comment_id: int,
    task_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    comment_queries: CommentQueries = Depends(),
    task_queries: TaskQueries = Depends(),
):
    """
    Deletes a specific comment.

    Args:
    - comment_id (int): The ID of the comment to retrieve.
    - task_id (int): The ID of the task the comments belong to.
    - user (UserResponse):
        The user deleting the comment. Defaults to the
        current authenticated user.
    - comment_queries (CommentQueries):
        The instance of the CommentQueries class used to
        interact with the database.
    - task_queries (TaskQueries):
        The instance of the TaskQueries class used to
        interact with the database.

    Returns:
    - None

    Raises:
    - UserException: If the user is not logged in.
    - TaskException: If the task does not exist.
    - CommentException:
        If the comment does not belong to the specified task
        or if the comment does not exist
    - EditCommentException:
        If the user does not have permission to delete the comment.
    """
    check_user_exceptions(user)

    task = task_queries.get_task(task_id)
    comment = comment_queries.get_comment(comment_id)
    check_comment_exceptions(task, comment)

    if user.id != comment.user_id:
        raise edit_comment_exception
    else:
        comment_queries.delete_comment(comment_id)
        return
