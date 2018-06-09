import json

from base_query import get_request, post_request

class TicketQueries(object):

    @staticmethod
    def request_all():
        page = 1
        while True:
            query = get_request('/api/v2/tickets.json?page=%d' % page)
            for ticket in query['tickets']:
                yield {
                    'created_at': ticket['created_at'],
                    'updated_at': ticket['updated_at'],
                    'requester_id': ticket['requester_id'],
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
    def register(new):
        payload = json.dumps({'ticket': new})
        return post_request('/api/v2/tickets.json', payload)

def main():
    print(list(TicketQueries.request_all()))

if __name__ == '__main__':
    main()
