"""
Database Queries for Comments
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.users import UserWithPw
from models.comments import CommentIn, CommentOut, CommentList
from utils.exceptions import CommentDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)

class CommentQueries:
    def create_comment(self, new_comment: CommentIn, user_id:int, task_id:int) -> CommentOut:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(CommentOut)) as cur:
                cur.execute(
                    """
                    INSERT INTO comments (
                        comment,
                        user_id,
                        task_id
                    ) VALUES (
                        %s, %s, %s
                    )
                    RETURNING *;
                    """,

                    [
                        new_comment.comment,
                        user_id,
                        task_id,
                    ],
                )
                new_comment = cur.fetchone()
                if not new_comment:
                    raise CommentDatabaseException("Could not create comment")
                return new_comment

    def list_all(self, task_id:int) -> CommentList:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(CommentOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM comments
                    WHERE task_id = %s
                    ORDER BY created_on;
                    """,
                    [
                        task_id
                    ]
                )
                comments = cur.fetchall()
                return comments
