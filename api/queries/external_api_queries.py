import requests
import os

API_NINJA_KEY = os.environ.get("API_NINJA_KEY")


class GetExternalApi:

    def get_joke(self):
        """
        Retrieves a joke from an external API.

        Returns:
            str: A joke retrieved from the API.

        Raises:
            dict: An error dictionary containing the status code and
            response text if the API request fails.
        """

        url = "https://api.api-ninjas.com/v1/jokes"
        headers = {"X-Api-Key": API_NINJA_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()

        if response.status_code == requests.codes.ok:
            return data[0]["joke"]
        else:
            return {"Error": response.status_code, "Text": response.text}

    def get_quote(self):
        """
        Retrieves a random quote from an external API.

        Returns:
            dict: A dictionary containing the quote information
              if the request is successful.
                  The dictionary has the following keys:
                  - "q": The quote text.
                  - "a": The author of the quote.
                  - "h": A unique identifier for the quote.
            dict: A dictionary containing the error information
            if the request is unsuccessful.
                  The dictionary has the following keys:
                  - "Error": The HTTP status code of the response.
                  - "Text": The error message returned by the API.
        """

        url = "https://zenquotes.io/api/random"
        response = requests.get(url)
        data = response.json()

        if response.status_code == requests.codes.ok:
            return data
        else:
            return {"Error": response.status_code, "Text": response.text}
