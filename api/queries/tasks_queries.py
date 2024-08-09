"""
Database Queries for Tasks
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.users import UserWithPw
from models.tasks import TaskIn, TaskOut, TaskList
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
                    SELECT * FROM tasks;
                    """
                )
                tasks = cur.fetchall()
                return tasks
