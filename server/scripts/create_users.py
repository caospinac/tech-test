import json

from base_query import auth_token
from user_queries import UserQueries


def main():
    with open('scripts/test-users.json', 'r') as f:
        for user in json.loads(f.read()):
            UserQueries.register(user)
        print('Done.')

if __name__ == '__main__':
    main()
