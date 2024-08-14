from fastapi import HTTPException


class UserDatabaseException(Exception):
    pass

class TaskDatabaseException(Exception):
    pass

class CommentDatabaseException(Exception):
    pass


user_exception = HTTPException(status_code=401, detail="You must be logged in!")
task_exception = HTTPException(status_code=404, detail="Task does not exist!")
edit_task_exception = HTTPException(status_code=401, detail="You do not have permission to update this task")
comment_exception = HTTPException(status_code=404, detail="Comment does not exist!")
edit_comment_exception = HTTPException(status_code=401, detail="You do not have permission to update this comment")


def check_for_exceptions(user, task, status):

    if user.id != task.assignee_id and user.id != task.assigner_id:
        raise edit_task_exception

    if task.status == "Completed" and status.status == "Deleted":
        raise edit_task_exception

    if task.status == "Deleted" and user.id != task.assigner_id:
        raise edit_task_exception

    if status.status == "Deleted" and user.id != task.assigner_id:
        raise edit_task_exception
