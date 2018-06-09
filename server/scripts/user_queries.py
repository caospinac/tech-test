import json

from base_query import get_request, post_request

class UserQueries(object):

    @staticmethod
    def request_all():
        page = 1
        while True:
            query = get_request('/api/v2/users.json?page=%d' % page)
            for user in query['users']:
                if user['role'] == 'end-user':
                    continue
                yield {
                    'integration_id': user['id'],
                    'first_name': ' '.join(user['name'].split()[:-1]),
                    'last_name': user['name'].split()[-1],
                    'email': user['email'],
                    'created_at': user['created_at'],
                    'role': user['role'],
                }
            if not query['next_page']:
                break
            page += 1

    @staticmethod
    def register(new):
        payload = json.dumps({'user': new})
        return post_request('/api/v2/users.json', payload)

