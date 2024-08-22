import requests
import os

API_NINJA_KEY = os.environ.get("API_NINJA_KEY")


class GetExternalApi:

    def get_joke(self):

        url = "https://api.api-ninjas.com/v1/jokes"
        headers = {"X-Api-Key": API_NINJA_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()

        if response.status_code == requests.codes.ok:
            return data[0]["joke"]
        else:
            return {"Error": response.status_code, "Text": response.text}

    def get_quote(self):

        url = "https://zenquotes.io/api/random"
        response = requests.get(url)
        data = response.json()

        if response.status_code == requests.codes.ok:
            return data
        else:
            return {"Error": response.status_code, "Text": response.text}
