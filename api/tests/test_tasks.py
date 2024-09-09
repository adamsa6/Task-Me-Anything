from fastapi.testclient import TestClient
from main import app
from queries.tasks_queries import TaskQueries
from utils.authentication import try_get_jwt_user_data
from models.tasks import TaskOut, TaskIn, TaskStatus
from models.users import UserResponse


client = TestClient(app)


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1337,
        username="aadams",
        first_name="Archie",
        last_name="Adams",
        email="a@email.com",
    )


class FakeTaskQueries:
    def create_task(self, new_task: TaskIn, assigner_id: int):
        return TaskOut(
            id=5,
            title=new_task.title,
            description=new_task.description,
            created_on="2024-08-27T22:52:45.551Z",
            due_date=new_task.due_date,
            priority=new_task.priority,
            status="Active",
            assigner_id=assigner_id,
            assignee_id=new_task.assignee_id,
        )

    def list_all(self):
        return [
            TaskOut(
                id=10,
                title="Foodies",
                description="asdf",
                created_on="2024-08-27T19:20:46.770731",
                due_date="2024-08-23",
                priority=2,
                status="Active",
                assigner_id=1,
                assignee_id=2,
            )
        ]

    def list_current(self):
        return [
            TaskOut(
                id=10,
                title="Foodies",
                description="asdf",
                created_on="2024-08-27T19:20:46.770731",
                due_date="2024-08-23",
                priority=2,
                status="Active",
                assigner_id=1,
                assignee_id=2,
            )
        ]

    def list_past(self):
        return [
            TaskOut(
                id=10,
                title="Foodies",
                description="asdf",
                created_on="2024-08-27T19:20:46.770731",
                due_date="2024-08-23",
                priority=2,
                status="Active",
                assigner_id=1,
                assignee_id=2,
            )
        ]

    def list_assigned(self, assignee_id: int):
        return [
            TaskOut(
                id=10,
                title="Foodies",
                description="asdf",
                created_on="2024-08-27T19:20:46.770731",
                due_date="2024-08-23",
                priority=2,
                status="Active",
                assigner_id=1,
                assignee_id=assignee_id,
            )
        ]

    def list_mine(self, assigner_id: int):
        return [
            TaskOut(
                id=10,
                title="Foodies",
                description="asdf",
                created_on="2024-08-27T19:20:46.770731",
                due_date="2024-08-23",
                priority=2,
                status="Active",
                assigner_id=assigner_id,
                assignee_id=1,
            )
        ]

    def get_task(self, task_id: int):
        if task_id == 1:
            return None
        return TaskOut(
            id=task_id,
            title="Foodies",
            description="asdf",
            created_on="2024-08-27T19:20:46.770731",
            due_date="2024-08-23",
            priority=2,
            status="Active",
            assigner_id=1337,
            assignee_id=2,
        )

    def update_task(self, task_id: int, task_in: TaskIn):
        if task_id == 1:
            return None
        return TaskOut(
            id=task_id,
            title=task_in.title,
            description=task_in.description,
            created_on="2024-08-27T19:20:46.770731",
            due_date=task_in.due_date,
            priority=task_in.priority,
            status="Active",
            assigner_id=1337,
            assignee_id=task_in.assignee_id,
        )

    def change_status(self, task_id: int, status: TaskStatus):
        if task_id == 1:
            return None
        return TaskOut(
            id=task_id,
            title="Foodies",
            description="asdf",
            created_on="2024-08-27T19:20:46.770731",
            due_date="2024-08-23",
            priority=2,
            status=status.status,
            assigner_id=1337,
            assignee_id=2,
        )


def test_create_task_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    body = {
        "title": "Make presentation",
        "description": "Should be 30 minutes long",
        "due_date": "2024-08-27",
        "priority": 1,
        "assignee_id": 10,
    }
    result = client.post("/api/tasks", json=body)
    assert result.status_code == 401


def test_create_task_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {
        "title": "Make presentation",
        "description": "Should be 30 minutes long",
        "due_date": "2024-08-27",
        "priority": 1,
        "assignee_id": 10,
    }
    result = client.post("/api/tasks", json=body)
    assert result.status_code == 200
    data = result.json()
    assert data["title"] == body["title"]
    assert data["description"] == body["description"]
    assert data["due_date"] == body["due_date"]
    assert data["assignee_id"] == body["assignee_id"]
    assert data["status"] == "Active"
    assert data["assigner_id"] == 1337


def test_list_all_tasks_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks")
    assert result.status_code == 401

def test_list_all_tasks_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks")
    assert result.status_code == 200
    data = result.json()
    assert len(data["tasks"]) == 1
    assert data["tasks"][0]["id"] == 10


def test_list_current_tasks_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/current")
    assert result.status_code == 401


def test_list_current_tasks_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/current")
    assert result.status_code == 200
    data = result.json()
    assert len(data["tasks"]) == 1
    assert data["tasks"][0]["id"] == 10


def test_list_past_tasks_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/past")
    assert result.status_code == 401


def test_list_past_tasks_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/past")
    assert result.status_code == 200
    data = result.json()
    assert len(data["tasks"]) == 1
    assert data["tasks"][0]["id"] == 10


def test_list_assigned_tasks_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/assigned-tasks/mine")
    assert result.status_code == 401


def test_list_assigned_tasks_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/assigned-tasks/mine")
    assert result.status_code == 200
    data = result.json()
    assert len(data) == 1
    assert data["tasks"][0]["assignee_id"] == 1337


def test_list_my_tasks_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/mine")
    assert result.status_code == 401


def test_list_my_tasks_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/mine")
    assert result.status_code == 200
    data = result.json()
    assert len(data) == 1
    assert data["tasks"][0]["assigner_id"] == 1337


def test_get_task_details_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    result = client.get("/api/tasks/10")
    assert result.status_code == 401


def test_get_task_details_404():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/1")
    assert result.status_code == 404


def test_get_task_details_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    result = client.get("/api/tasks/10")
    assert result.status_code == 200
    data = result.json()
    assert data["id"] == 10


def test_edit_task_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    body = {
        "title": "Make presentation",
        "description": "Should be 30 minutes long",
        "due_date": "2024-08-27",
        "priority": 1,
        "assignee_id": 10,
    }
    result = client.put("/api/tasks/5", json=body)
    assert result.status_code == 401


def test_edit_task_404():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {
        "title": "Make presentation",
        "description": "Should be 30 minutes long",
        "due_date": "2024-08-27",
        "priority": 1,
        "assignee_id": 10,
    }
    result = client.put("/api/tasks/1", json=body)
    assert result.status_code == 404


def test_edit_task_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {
        "title": "Edit Test",
        "description": "Testing the edit task route",
        "due_date": "2024-08-27",
        "priority": 1,
        "assignee_id": 10,
    }
    result = client.put("/api/tasks/5", json=body)
    assert result.status_code == 200
    data = result.json()
    assert data["title"] == body["title"]
    assert data["description"] == body["description"]
    assert data["due_date"] == body["due_date"]
    assert data["assignee_id"] == body["assignee_id"]
    assert data["status"] == "Active"
    assert data["assigner_id"] == 1337


def test_change_task_status_401():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    body = {"status": "In Progress"}
    result = client.patch("/api/tasks/7/status", json=body)
    assert result.status_code == 401


def test_change_task_status_404():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"status": "In Progress"}
    result = client.patch("/api/tasks/1/status", json=body)
    assert result.status_code == 404


def test_change_task_status_200():
    app.dependency_overrides = {}
    app.dependency_overrides[TaskQueries] = FakeTaskQueries
    app.dependency_overrides[try_get_jwt_user_data] = (
        fake_try_get_jwt_user_data
    )
    body = {"status": "In Progress"}
    result = client.patch("/api/tasks/7/status", json=body)
    assert result.status_code == 200
    data = result.json()
    assert data["status"] == body["status"]
    assert data["assigner_id"] == 1337
