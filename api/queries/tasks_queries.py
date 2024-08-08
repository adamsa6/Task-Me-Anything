"""
Database Queries for Tasks
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.users import UserWithPw
from models.tasks import TaskIn, TaskOut
from utils.exceptions import TaskDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class TaskQueries:
    
    def create_task(self, task: TaskIn) -> TaskOut:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(TaskOut)) as cur:
                cur.execute(
                    """
                    INSERT INTO tasks (
                        title,
                        description,
                        due_date,
                        priority,
                        assignee_id
                    ) VALUES (
                        %s, %s, %s, %s, %s
                    )
                    RETURNING *;
                    """,
                    [
                        task.title,
                        task.description,
                        task.due_date,
                        task.priority,
                        task.assignee_id
                    ],
                )
                task = cur.fetchone()
                if not task:
                    raise TaskDatabaseException(
                        f"Could not create task with title {task.title}"
                    )
                return task
