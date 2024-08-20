from fastapi import (
    Depends,
    APIRouter,
)
from queries.external_api_queries import GetExternalApi
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse
from utils.exceptions import user_exception


router = APIRouter(prefix="/api")


@router.get("/joke")
def get_joke(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: GetExternalApi = Depends(),
):
    if user is None:
        raise user_exception
    joke = queries.get_joke()
    return joke


@router.get("/quote")
def get_quote(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: GetExternalApi = Depends(),
):
    if user is None:
        raise user_exception
    quote = queries.get_quote()
    return quote
