from fastapi import (
    Depends,
    APIRouter,
)
from queries.external_api_queries import GetExternalApi
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse
from utils.exceptions import check_user_exceptions


router = APIRouter(prefix="/api")


@router.get("/joke")
def get_joke(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: GetExternalApi = Depends(),
):
    """
    Retrieves a joke from an external API.

    Parameters:
    - user (UserResponse):
        The user making the request (the user data obtained from the JWT token)
    - queries (GetExternalApi): An instance of the GetExternalApi class.

    Returns:
    - str: The retrieved joke.

    Raises:
    - UserException: If the user is not logged in.
    """
    check_user_exceptions(user)
    joke = queries.get_joke()
    return joke


@router.get("/quote")
def get_quote(
    queries: GetExternalApi = Depends(),
):
    """
    Retrieves a quote from an external API.

    Parameters:
    - user (UserResponse):
        The user making the request (the user data obtained from the JWT token)
    - queries (GetExternalApi): An instance of the GetExternalApi class.

    Returns:
    - str: The retrieved quote.

    Raises:
    - UserException: If the user is not logged in.
    """
    quote = queries.get_quote()
    return quote
