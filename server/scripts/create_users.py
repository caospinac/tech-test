import json

from zenpy import Zenpy
from zenpy.lib.api_objects import User


creds = {
    'email' : 'carlosaospinac@gmail.com',
    'token' : 'N7B56ZzmoUihImCI20eNfmkM57g9HRyxOQhf9Wxw',
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
