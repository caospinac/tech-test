from http import HTTPStatus

from sanic.views import HTTPMethodView
from sanic.response import json


class BaseView(HTTPMethodView):

    def __init__(self, db_engine):
        self.db_engine = db_engine

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
            # return json({})

    @staticmethod
    def not_null_data(**kw):
        return dict(
            (k, v)
            for k, v in kw.items()
            if v
        )

    async def post(self, request, arg=None):
        return self.response_status(501)

    async def get(self, request, arg=None):
        return self.response_status(501)

    async def put(self, request, arg=None):
        return self.response_status(501)

    async def patch(self, request, arg=None):
        return self.response_status(501)

    async def delete(self, request, arg=None):
        return self.response_status(501)
