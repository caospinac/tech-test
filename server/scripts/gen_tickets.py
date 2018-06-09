# built-in libraries
import random

# own modules
from base_query import get_request
from ticket_queries import TicketQueries
from user_queries import UserQueries


class DummyTicket(object):

    def __init__(self):
        self.requester_id = self._any('requester_id')
        self.assignee_id = self._any('assignee_id')
        self.status = self._any('status')
        self.priority = self._any('priority')
        self.subject = self._any('subject')
        self.description = self._any('description')
        self.type = self._any('type')
        self.via = {'channel': self._any('via')}
        self.tags = ' '.join(self._random_tags())

    def _any(self, field):
        try:
            return random.choice(self._possible_values[field])
        except IndexError as ie:
            return None
        
    def _random_tags(self):
        tags = self._possible_values['tags'].copy()
        return [
            tags.pop(random.randrange(len(tags)))
            for i in range(random.randrange(len(tags)))
        ]

    _possible_values = {
        'requester_id': [
            user['id'] for user in get_request('/api/v2/users.json')['users']
        ],
        'assignee_id': [
            user['id']
            for user in UserQueries.request_fields('id', 'role')
            if user['role'] != 'end-user'
        ],
        'status': ['new', 'open', 'pending', 'hold', 'solved', 'closed'],
        'priority': ['urgent', 'high', 'normal', 'low'],
        'subject': [
            'Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'
        ],
        'description': [
            'Description 1', 'Description 2', 'Description 3', 'Description 4',
            'Description 5'
        ],
        'type': ['problem', 'incident', 'question', 'task'],
        'via': ['web', 'mobile', 'rule', 'system'],
        'tags': ['Tag1', 'Tag2', 'Tag3','Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8'],
    }


def main():
    to_create = 5
    for i in range(to_create):
        print(f'Record {i + 1} of {to_create}')
        TicketQueries.register(vars(DummyTicket()))
    print('Done.')

if __name__ == '__main__':
    main()
