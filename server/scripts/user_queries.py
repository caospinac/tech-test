import json

try:
    from .base_query import get_request, post_request
except ImportError as ie:
    from base_query import get_request, post_request

class UserQueries(object):

    @staticmethod
    def request_all(args_query=''):
        page = 1
        while True:
            query = get_request(f'/api/v2/users/search.json'
                                f'?page={page}&query={args_query}')
            for user in query['users']:
                if user['role'] == 'end-user':
                    continue
                yield {
                    '_id': user['id'],
                    'created_at': user['created_at'],
                    'updated_at': user['updated_at'],
                    'integration_id': user['id'],
                    'first_name': ' '.join(user['name'].split()[:-1]),
                    'last_name': user['name'].split()[-1],
                    'email': user['email'],
                    'role': user['role'],
                }
            if not query['next_page']:
                break
            page += 1
    
    @staticmethod
    def request_fields(*which, args_query=''):
        page = 1
        while True:
            query = get_request(f'/api/v2/users/search.json'
                                f'?page={page}&query={args_query}')
            for user in query['users']:
                yield { field: user[field] for field in which }
            if not query['next_page']:
                break
            page += 1

    @staticmethod
    def register(new):
        print("payload:")
        print(new)
        payload = json.dumps({'user': new})
        return post_request('/api/v2/users.json', payload)


def main():
    print(list(UserQueries.request_all()))

if __name__ == '__main__':
    main()
