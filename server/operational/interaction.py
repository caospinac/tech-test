from http import HTTPStatus

from sanic.views import HTTPMethodView
from sanic.response import json

from .base_view import BaseView

class Interaction(BaseView):

    def __init__(self):
        super().__init__()
        self.collection = self.database.interactions
