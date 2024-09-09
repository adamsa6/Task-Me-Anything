"""
Pydantic Models for Users.
"""

from pydantic import BaseModel
from typing import List


class UserLogin(BaseModel):
    """
    Represents a the parameters needed to sign in a user
    """

    username: str
    password: str


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
    first_name: str
    last_name: str
    email: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    email: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    email: str


class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str


class UserList(BaseModel):
    users: List[User]


class TaskUsers(BaseModel):
    assigner: User
    assignee: User
