import json

import requests as req



auth_token = 'N7B56ZzmoUihImCI20eNfmkM57g9HRyxOQhf9Wxw'
api_url_base = 'https://team3000.zendesk.com'

headers = {'Content-Type': 'application/json'}
auth = ('carlosaospinac@gmail.com/token',
        'N7B56ZzmoUihImCI20eNfmkM57g9HRyxOQhf9Wxw')

def get_request(endpoint):
    url = f'{ api_url_base }{ endpoint }'
    response = req.get(url, auth=auth, headers=headers)
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    return response.status_code
