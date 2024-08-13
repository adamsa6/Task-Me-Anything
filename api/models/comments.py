from pydantic import BaseModel
from datetime import datetime
from typing import List


class CommentIn(BaseModel):
    comment: str


class CommentOut(BaseModel):
    id: int
    comment: str
    user_id: int
    task_id: int
    created_on: datetime

class CommentList(BaseModel):
    comments: List[CommentOut]
