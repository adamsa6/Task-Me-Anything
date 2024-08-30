from fastapi.testclient import TestClient
from main import app
from queries.comments_queries import CommentQueries
from queries.tasks_queries import TaskQueries
from queries.user_queries import UserQueries
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse, UserWithPw, User, TaskUsers
from models.comments import CommentIn, CommentOut
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
    def get_by_id(self, id: int):
        if id == 1:
            return None
        return UserWithPw(
            id=id,
            username="anewhart",
            password="string",
            first_name="Aaron",
            last_name="Newhart",
            email="anewhart@email.com"
        )

    def create_user(
        self,
        username: str,
        hashed_password: str,
        first_name: str,
        last_name: str,
        email: str,
    ):
        return UserWithPw(
            username=username,
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

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
        return


def test_get_task_users():
    pass

def test_get_users():
    pass

def test_get_single_user():
    pass
