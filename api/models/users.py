"""
Pydantic Models for Users.
"""
from pydantic import BaseModel


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
