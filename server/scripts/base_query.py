import json

import requests as req

try:
    from .creds import email, auth_token, domain
except ImportError as ie:
    from creds import email, auth_token, domain
except:
    print('Credentials \'creds.py\' with \'email\' and \'auth_token\''
          'variables must be created.')
    exit(1)


api_url_base = domain

headers = {'Content-Type': 'application/json'}
auth = (f'{email}/token', auth_token)

def get_request(endpoint):
    url = f'{ api_url_base }{ endpoint }'
    response = req.get(url, auth=auth, headers=headers)
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    return response.status_code


def post_request(endpoint, payload):
    url = f'{ api_url_base }{ endpoint }'
    response = req.post(url, data=payload, auth=auth, headers=headers)
    return response.status_code
