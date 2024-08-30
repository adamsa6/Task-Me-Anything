from fastapi.testclient import TestClient
from main import app
from queries.tasks_queries import TaskQueries
from queries.user_queries import UserQueries
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse, User
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


class FakeUserQueries:
    def list_all(self):
        return [
            User(
                id=3,
                first_name="Aaron",
                last_name="Newhart",
            )
        ]

    def get_user_by_id(self, id: int):
        if id == 1:
            return None
        return User(
            id=id,
            first_name="Aaron",
            last_name="Newhart",
        )


def test_get_task_users_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    result = client.get("/api/tasks/2/users")
    assert result.status_code == 401


def test_get_task_users_task_404():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/1/users")
    assert result.status_code == 404


def test_get_task_users_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/2/users")
    assert result.status_code == 200
    body = result.json()
    assert body["assignee"]["id"] == 2
    assert body["assigner"]["id"] == 1337


def test_get_users_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    result = client.get("/api/users")
    assert result.status_code == 401


def test_get_users_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/users")
    assert result.status_code == 200
    data = result.json()
    assert len(data["users"]) == 1


def test_get_single_user_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    result = client.get("/api/users/2")
    assert result.status_code == 401


def test_get_single_user_404():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/users/1")
    assert result.status_code == 404


def test_get_single_user_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/users/2")
    assert result.status_code == 200
    data = result.json()
    assert data["id"] == 2
