import json

try:
    from .base_query import get_request, post_request
except ImportError as ie:
    from base_query import get_request, post_request


class TicketQueries(object):

    @staticmethod
    def request_all(args_query=''):
        page = 1
        while True:
            query = get_request(f'/api/v2/search.json'
                                f'?page={page}&query=type:ticket%20{args_query}')
            for ticket in query['results']:
                yield {
                    '_id': ticket['id'],
                    'created_at': ticket['created_at'],
                    'updated_at': ticket['updated_at'],
                    'requester_id': ticket['requester_id'],
                    'assignee_id': ticket['assignee_id'],
                    'status': ticket['status'],
                    'priority': ticket['priority'],
                    'subject': ticket['subject'],
                    'description': ticket['description'],
                    'type': ticket['type'],
                    'via': ticket['via']['channel'],
                    'tags': ticket['tags'],
                }
            if not query['next_page']:
                break
            page += 1

    @staticmethod
    def request_fields(*which, args_query=''):
        page = 1
        while True:
            query = get_request(f'/api/v2/search.json'
                                f'?page={page}&query=type:ticket%20{args_query}')
            for ticket in query['results']:
                yield { field: ticket[field] for field in which }
            if not query['next_page']:
                break
            page += 1

    @staticmethod
    def register(new):
        payload = json.dumps({'ticket': new})
        return post_request('/api/v2/tickets.json', payload)


def main():
    print(list(TicketQueries.request_fields()))

if __name__ == '__main__':
    main()
