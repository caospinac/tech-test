import os
import sys

from pymongo import MongoClient

from scripts import UserQueries, TicketQueries

class DataBaseEngine(object):
    
    def __init__(self):
        self.client = MongoClient(os.getenv('DB_HOST'), 27017)
        db = self.client.zendesk
        self.users = db.users
        self.interactions = db.interactions
    
    def __pull(self, collection, save=False):
        try:
            greater_local_date = collection.find(
                {},{'created_at': 1, '_id': 0}
            ).sort('created_at', -1).limit(1)[0]['created_at']
        except IndexError as ie:
            greater_local_date = '1-1-1'
        
        Queries = UserQueries if collection is self.users else TicketQueries
        records_found = Queries.request_all(f'created>{greater_local_date}')

        if not save:
            return { 'new_count': sum(1 for _ in records_found) }

        count = 0
        for new in records_found:
            collection.insert_one(new)
            count += 1
        return { 'new_count': count }

    def pull_users(self):
        return self.__pull(self.users, True)
    
    def pull_interactions(self):
        return self.__pull(self.interactions, True)

    def check_users(self):
        return self.__pull(self.users)
    
    def check_interactions(self):
        return self.__pull(self.interactions)

    @property
    def database(self):
        return self.client.zendesk
    
    def __del__(self):
        self.client.close()
        print('The database has been closed.')


def main():
    db = DataBaseEngine()
    print('Users:', db.pull_users())
    print('Interactions', db.pull_interactions())

if __name__ == '__main__':
    main()
