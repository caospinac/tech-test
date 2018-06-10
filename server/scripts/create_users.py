import json

from user_queries import UserQueries


def main():
    user = {
        "name": "Carlos Andrés Ospina",
        "email": "luis@company.org",
        "role": "admin"
    }
    UserQueries.register(user)
    

if __name__ == '__main__':
    main()
