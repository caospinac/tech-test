import json

from zenpy import Zenpy
from zenpy.lib.api_objects import User

from base_query import auth_token


creds = {
    'email' : 'carlosaospinac@gmail.com',
    'token' : auth_token,
    'subdomain': 'team3000'
}

zenpy_client = Zenpy(**creds)


def main():
    with open('scripts/test-users.json', 'r') as f:
        for user in json.loads(f.read()):
            created_user = zenpy_client.users.create(
                User(**user)
            )

if __name__ == '__main__':
    main()
