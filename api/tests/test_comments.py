from fastapi.testclient import TestClient
from main import app
from queries.comments_queries import CommentQueries
from queries.tasks_queries import TaskQueries
from utils.authentication import try_get_jwt_user_data
from models.tasks import TaskOut, TaskIn, TaskStatus
from models.users import UserResponse
from models.comments import CommentIn, CommentOut, CommentList
from test_tasks import FakeTaskQueries

client = TestClient(app)


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1337,
        username="aadams",
        first_name="Archie",
        last_name="Adams",
        email="a@email.com",
    )


class FakeCommentQueries:
    def create_comment(
        self, new_comment: CommentIn, user_id: int, task_id: int
    ):
        return CommentOut(
            id=1222,
            comment=new_comment.comment,
            user_id=user_id,
            task_id=task_id,
            created_on="2024-08-27T19:20:46.770731",
        )

    def list_all(self, task_id: int):
        return [
            CommentOut(
                id=1222,
                comment="comment",
                user_id=1,
                task_id=task_id,
                created_on="2024-08-27T19:20:46.770731",
            )
        ]

    def get_comment(self, comment_id: int):
        if comment_id == 1:
            return None
        return CommentOut(
            id=comment_id,
            comment="chocolate milky is the best",
            user_id=1337,
            task_id=2,
            created_on="2024-08-27T19:20:46.770731",
        )

    def edit_comment(self, comment_id: int, comment_in: CommentIn):
        if comment_id == 1:
            return None
        return CommentOut(
            id=comment_id,
            comment=comment_in.comment,
            user_id=1337,
            task_id=2,
            created_on="2024-08-27T19:20:46.770731",
        )

    # def delete_comment(self, comment_id: int):
    #     pass


def test_create_comment_401():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    body = {"comment": "test create comment"}
    result = client.post("/api/tasks/2/comments", json=body)
    assert result.status_code == 401


def test_create_comment_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"comment": "test create comment"}
    result = client.post("/api/tasks/1/comments", json=body)
    assert result.status_code == 404


def test_create_comment_200():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"comment": "test create comment"}
    result = client.post("/api/tasks/2/comments", json=body)
    assert result.status_code == 200
    data = result.json()
    assert data["comment"] == body["comment"]
    assert data["user_id"] == 1337
    assert data["task_id"] == 2


def test_list_task_comments_401():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/2/comments")
    assert result.status_code == 401


def test_list_task_comments_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/1/comments")
    assert result.status_code == 404


def test_list_task_comments_200():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/14/comments")
    assert result.status_code == 200
    data = result.json()
    assert len(data["comments"]) == 1
    assert data["comments"][0]["task_id"] == 14


def test_get_task_comment_401():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/2/comments/3")
    assert result.status_code == 401


def test_get_task_comment_task_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/1/comments/3")
    assert result.status_code == 404


def test_get_task_comment_comment_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/2/comments/1")
    assert result.status_code == 404


def test_get_task_comment_200():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/2/comments/3")
    assert result.status_code == 200
    data = result.json()
    assert data["id"] == 3
    assert data["task_id"] == 2


def test_edit_task_comment_401():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    body = {"comment": "test edit comment"}
    result = client.put("/api/tasks/2/comments/3", json=body)
    assert result.status_code == 401


def test_edit_task_comment_task_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"comment": "test edit comment"}
    result = client.put("/api/tasks/1/comments/3", json=body)
    assert result.status_code == 404


def test_edit_task_comment_comment_404():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"comment": "test edit comment"}
    result = client.put("/api/tasks/2/comments/1", json=body)
    assert result.status_code == 404


def test_edit_task_comment_200():
    app.dependency_overrides = {}
    app.dependency_overrides[CommentQueries] = FakeCommentQueries
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"comment": "test edit comment"}
    result = client.put("/api/tasks/2/comments/3", json=body)
    assert result.status_code == 200
    data = result.json()
    assert data["task_id"] == 2
    assert data["id"] == 3
    assert data["user_id"] == 1337
    assert data["comment"] == body["comment"]


# def test_delete_task_comment():
#     pass
