import json

from user_queries import UserQueries


def main():
    with open('scripts/test-users.json', 'r') as f:
        users = json.loads(f.read())
        for i, user in enumerate(users):
            print(f'Record {i + 1} of {len(users)}')
            UserQueries.register(user)
        print('Done.')

if __name__ == '__main__':
    main()
