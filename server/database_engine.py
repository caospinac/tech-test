# Built-in libraries
import os

# External libraries
from pymongo import MongoClient
from pymongo.collection import Collection

# Own modules
from scripts import UserQueries, TicketQueries
''' Database feed

In this module the data of the proposed API is imported. The data is pulled
based on the dates of creation and modification registered in the database.

'''

class DataBaseEngine(object):
    ''' Database feed engine
    
    Reviews and makes updates to the database.

    Attributes:
        client (MongoClient): Mongo client
        users (Collection): Users collection
        interactions (Collection): Interacions collection
    
    '''

    def __init__(self):
        '''Initializes the connection to the database and establishes
        the collections.
        '''

        self.client = MongoClient(os.getenv('DB_HOST'), 27017)
        db = self.client.zendesk
        self.users = db.users
        self.interactions = db.interactions
    
    def __greater_local_date(self, collection: Collection, date_type: str) -> str:
        '''Gets the most current date in a collection from aspecified
        field

        Args:
            collecion: About which the query will be made.
            date_type: If it is for the `created` or `update` field.

        Returns:
            The most current date
        
        Raises:
            ValueError: If the date type it is neither `created` nor `update`
        '''

        
        if not date_type in ('created', 'updated'):
            raise ValueError('The date type must be \'created\' or \'updated\'')

        date_field: str = 'created_at' if date_type == 'created' else 'updated_at'
        try:
            return collection.find(
                {},{date_field: 1, '_id': 0}
            ).sort(date_field, -1).limit(1)[0][date_field]
        except IndexError as ie:

            # In the absence of data, the smallest possible date
            # is taken to find new records
            return '1-1-1'
    
    def __pull(self, collection: Collection, save: bool =False):
        ''' Looks for updates in the API that are not in the database

        Args:
            collecion: About which the query will be made.
            save: Indicates whether the news found will be saved

        Returns:
            Counting new records and / or modifications in the specified
            collection
        
        Raises:
            ValueError: If the date type it is neither `created` nor `update`
        
        '''
        
        # Selects que class for queries
        Queries = UserQueries if collection is self.users else TicketQueries

        new_gld: str = self.__greater_local_date(collection, 'created')
        new_records_found = Queries.request_all(
            f'created>{new_gld}'
        )

        updated_gld: str = self.__greater_local_date(collection, 'updated')
        update_records_found = Queries.request_all(
            f'updated>{updated_gld}%20created<={new_gld}'
        )

        if not save:
            return {
                'new_count': sum(1 for _ in new_records_found),
                'update_count': sum(1 for _ in update_records_found)
            }

        # Insert new found data
        new_count = 0
        for new in new_records_found:
            collection.insert_one(new)
            new_count += 1

        # Update found updated data
        update_count = 0
        for update in update_records_found:
            collection.update_one({'_id': update['_id']}, {'$set': update})
            update_count += 1
        
        return { 'new_count': new_count, 'update_count': update_count }

    def pull_users(self):
        '''Checks and updates users'''

        return self.__pull(self.users, True)
    
    def pull_interactions(self):
        '''Checks and updates interactions'''

        return self.__pull(self.interactions, True)

    def check_users(self):
        '''Checks users without register them in the database'''

        return self.__pull(self.users)
    
    def check_interactions(self):
        '''Checks interactions without register them in the database'''

        return self.__pull(self.interactions)

    @property
    def database(self):
        '''Returns the database'''

        return self.client.zendesk
    
    def __del__(self):
        '''Closes the connection of the database when finished.'''

        self.client.close()
        print('The database has been closed.')


def main():
    db = DataBaseEngine()
    print('Users:', db.check_users())
    print('Interactions', db.check_interactions())

if __name__ == '__main__':
    main()
