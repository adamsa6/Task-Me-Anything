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

    def list_assigned(self, assignee_id: int) -> TaskList:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE assignee_id = %s
                    AND status = 'In Progress' OR status = 'active'
                    ORDER BY due_date, priority;
                    """,
                    [assignee_id],
                )
                tasks = cur.fetchall()
                return tasks

    def list_mine(self, assigner_id: int) -> TaskList:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM tasks
                    WHERE assigner_id = %s
                    AND status = 'In Progress' OR status = 'active'
                    ORDER BY due_date, priority;
                    """,
                    [assigner_id],
                )
                tasks = cur.fetchall()
                return tasks

    def get_task(self, task_id: int) -> TaskOut:
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
