from pydantic import BaseModel
from datetime import datetime


class CommentIn(BaseModel):
    comment: str

class CommentOut(BaseModel):
    id: int
    comment: str
    user_id: int
    task_id: int
    created_on: datetime
