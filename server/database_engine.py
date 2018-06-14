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
    
    def __greater_local_date(self, collection, date_type):
        if not date_type in ('created', 'updated'):
            raise ValueError('The date type must be \'created\' or \'updated\'')

        date_field = 'created_at' if date_type == 'created' else 'updated_at'
        try:
            return collection.find(
                {},{date_field: 1, '_id': 0}
            ).sort(date_field, -1).limit(1)[0][date_field]
        except IndexError as ie:
            return '1-1-1'
    
    def __pull(self, collection, save=False):
        
        Queries = UserQueries if collection is self.users else TicketQueries
        new_gld = self.__greater_local_date(collection, 'created')
        new_records_found = Queries.request_all(
            f'created>{new_gld}'
        )
        updated_gld = self.__greater_local_date(collection, 'updated')
        update_records_found = Queries.request_all(
            f'updated>{updated_gld}'
        )

        if not save:
            return {
                'new_count': sum(1 for _ in new_records_found),
                'update_count': sum(1 for _ in update_records_found)
            }

        new_count = 0
        for new in new_records_found:
            collection.insert_one(new)
            new_count += 1

        update_count = 0
        for update in update_records_found:
            collection.update_one({'_id': update['_id']}, {'$set': update})
            update_count += 1
        
        return { 'new_count': new_count, 'update_count': update_count }

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
    print('Users:', db.check_users())
    print('Interactions', db.check_interactions())

if __name__ == '__main__':
    main()
