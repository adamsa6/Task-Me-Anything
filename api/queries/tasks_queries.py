"""
Database Queries for Tasks
"""

import os
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row

from models.tasks import (
    TaskIn,
    TaskOut,
    TaskList,
    TaskStatus,
)
from utils.exceptions import TaskDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class TaskQueries:

    def create_task(self, new_task: TaskIn, assigner_id: int) -> TaskOut:
        """
        Creates a new task in the database.

        Args:
            new_task (TaskIn): The details of the new task to be created.
            assigner_id (int): The ID of the user who is creating the task.

        Returns:
            TaskOut: The created task with all its details.

        Raises:
            TaskDatabaseException: If the task could not be created.
        """

        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    INSERT INTO tasks (
                        title,
                        description,
                        due_date,
                        priority,
                        assignee_id,
                        assigner_id
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s
                    )
                    RETURNING *;
                    """,
                    [
                        new_task.title,
                        new_task.description,
                        new_task.due_date,
                        new_task.priority,
                        new_task.assignee_id,
                        assigner_id,
                    ],
                )
                new_task = cur.fetchone()
                if not new_task:
                    raise TaskDatabaseException(
                        f"Could not create task with title {new_task.title}"
                    )
                return new_task

    def list_all(self) -> TaskList:
        """
        Retrieves all tasks from the database and returns them as a list.

        Returns:
            TaskList: A list of tasks retrieved from the database,
            ordered by due date and priority properties.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    ORDER BY due_date, priority;
                    """
                )
                tasks = cur.fetchall()
                return tasks

    def list_current(self) -> TaskList:
        """
        Retrieves all current tasks from the database and
            returns them as a list.

        Returns:
            TaskList: A list of tasks retrieved from the database,
            ordered by due date and priority properties.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE (status = 'In Progress' OR status = 'Active')
                    ORDER BY due_date, priority;
                    """
                )
                tasks = cur.fetchall()
                return tasks

    def list_past(self) -> TaskList:
        """
        Retrieves all past tasks from the database and returns them as a list.

        Returns:
            TaskList: A list of tasks retrieved from the database,
            ordered by due date and priority properties.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE (status = 'Completed' OR status = 'Deleted')
                    ORDER BY due_date, priority;
                    """
                )
                tasks = cur.fetchall()
                return tasks

    def list_assigned(self, assignee_id: int) -> TaskList:
        """
        Retrieve a list of tasks assigned to a specific assignee.

        Args:
            assignee_id (int): The ID of the logged in user.

        Returns:
            TaskList: A list of tasks assigned to the logged in user.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE (assignee_id = %s)
                    AND (status = 'In Progress' OR status = 'Active')
                    ORDER BY due_date, priority;
                    """,
                    [assignee_id],
                )
                tasks = cur.fetchall()
                return tasks

    def list_mine(self, assigner_id: int) -> TaskList:
        """
        Retrieve a list of tasks assigned to a specific assigner.

        Args:
            assigner_id (int): The ID of the logged in user.

        Returns:
            TaskList: A list of tasks assigned to the logged in user.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE (assigner_id = %s)
                    AND (status = 'In Progress' OR status = 'Active')
                    ORDER BY due_date, priority;
                    """,
                    [assigner_id],
                )
                tasks = cur.fetchall()
                return tasks

    def get_task(self, task_id: int) -> TaskOut:
        """
        Retrieves a task from the database based on the given task ID.

        Args:
            task_id (int): The ID of the task to retrieve.

        Returns:
            TaskOut: The retrieved task object.

        Raises:
            None
        """

        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE id = %s;
                    """,
                    [task_id],
                )
                task = cur.fetchone()
                return task

    def update_task(self, task_id: int, task_in: TaskIn) -> TaskOut:
        """
        Update a task in the database.

        Args:
            task_id (int): The ID of the task to be updated.
            task_in (TaskIn): The updated task information.

        Returns:
            TaskOut: The updated task.

        Raises:
            None
        """

        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    UPDATE tasks
                    SET title = %s
                        , description = %s
                        , due_date = %s
                        , priority = %s
                        , assignee_id = %s
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [
                        task_in.title,
                        task_in.description,
                        task_in.due_date,
                        task_in.priority,
                        task_in.assignee_id,
                        task_id,
                    ],
                )
                task = cur.fetchone()
                return task

    def change_status(self, task_id: int, status: TaskStatus) -> TaskOut:
        """
        Updates the status of a task with the given task_id.

        Args:
            task_id (int): The ID of the task to update.
            status (TaskStatus): The new status to set for the task.

        Returns:
            TaskOut: The updated task object.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    UPDATE tasks
                    SET status = %s
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [status.status, task_id],
                )
                task = cur.fetchone()
                return task
