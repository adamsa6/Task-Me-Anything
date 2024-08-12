from pydantic import BaseModel
from datetime import datetime, date
from typing import List


class TaskIn(BaseModel):
    title: str
    description: str
    due_date: date
    priority: int
    assignee_id: int



class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    created_on: datetime
    due_date: date
    priority: int
    status: str
    assigner_id: int
    assignee_id: int


class TaskList(BaseModel):
    tasks: List[TaskOut]

class TaskStatusOnly(BaseModel):
    status: str
