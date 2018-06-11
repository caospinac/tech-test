import os
from http import HTTPStatus

from pymongo import MongoClient
from sanic.views import HTTPMethodView
from sanic.response import json


class BaseView(HTTPMethodView):

    def __init__(self):
        client = MongoClient(os.getenv('DB_HOST'), 27017)
        self.database = client.zendesk
        self.collection = None

    @staticmethod
    def response_status(code, data=None):
        try:
            status = dict(vars(HTTPStatus))['_value2member_map_'][code]
            return json({
                'status': status.phrase,
                'description': status.description,
                'code': status.value,
                'data': data
            }, status=status.value)
        except Exception as e:
            raise e

    @staticmethod
    def not_null_data(**kw):
        return dict(
            (k, v)
            for k, v in kw.items()
            if v
        )

    def post(self, request, arg=None):
        return self.response_status(501)

    def get(self, request, id=None):
        if not id:
            return self.response_status(
                200, self.collection.find()
            )
        res = self.collection.find_one({'_id': id})
        return self.response_status(200 if res else 404, res)

    def put(self, request, arg=None):
        return self.response_status(501)

    def patch(self, request, arg=None):
        return self.response_status(501)

    def delete(self, request, arg=None):
        return self.response_status(501)
    
    def options(self, request, arg=None):
        return json({})
