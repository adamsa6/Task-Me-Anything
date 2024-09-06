"""
Database Queries for Comments
"""

import os
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from models.comments import CommentIn, CommentOut, CommentList
from utils.exceptions import CommentDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class CommentQueries:
    def create_comment(
        self, new_comment: CommentIn, user_id: int, task_id: int
    ) -> CommentOut:
        """
        Creates a new comment in the database.

        Args:
            new_comment (CommentIn): The new comment to be created.
            user_id (int):
                The ID of the user creating the comment (the logged in user).
            task_id (int): The ID of the task associated with the comment.

        Returns:
            CommentOut: The newly created comment.

        Raises:
            CommentDatabaseException: If the comment could not be created.
        """
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

    def list_all(self, task_id: int) -> CommentList:
        """
        Retrieve all comments for a given task ID.

        Args:
            task_id (int): The ID of the task.

        Returns:
            CommentList: A list of comments for the given task ID,
            ordered by creation date.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(CommentOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM comments
                    WHERE task_id = %s
                    ORDER BY created_on DESC;
                    """,
                    [task_id],
                )
                comments = cur.fetchall()
                return comments

    def get_comment(self, comment_id: int) -> CommentOut:
        """
        Retrieve a comment from the database based on the given comment ID.

        Args:
            comment_id (int): The ID of the comment to retrieve.

        Returns:
            CommentOut: The retrieved comment object.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(CommentOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM comments
                    WHERE id = %s;
                    """,
                    [comment_id],
                )
                comment = cur.fetchone()
                return comment

    def edit_comment(
        self, comment_id: int, comment_in: CommentIn
    ) -> CommentOut:
        """
        Edit a comment in the database.

        Args:
            comment_id (int): The ID of the comment to be edited.
            comment_in (CommentIn): The updated comment data.

        Returns:
            CommentOut: The edited comment.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(CommentOut)) as cur:
                cur.execute(
                    """
                    UPDATE comments
                    SET comment = %s
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [comment_in.comment, comment_id],
                )
                comment = cur.fetchone()
                return comment

    def delete_comment(self, comment_id: int):
        """
        Deletes a comment from the database.

        Args:
            comment_id (int): The ID of the comment to be deleted.

        Returns:
            int: The ID of the deleted comment.

        Raises:
            None
        """
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE
                    FROM comments
                    WHERE id = %s
                    RETURNING id;
                    """,
                    [comment_id],
                )
                result = cur.fetchone()
                return result
